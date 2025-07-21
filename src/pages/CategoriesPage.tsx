import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Ripple } from "primereact/ripple";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { MaiButton } from "../components/atoms/MaiButton";
import { CreateCategoryModal } from "../components/molecules/CreateCategoryModal";
import { updateCategoryDefaultEmoji } from "../services/categories/api";
import { useCategories } from "../services/categories/queries";

const emojiVariants = {
  enter: (direction: "left" | "right") => ({
    opacity: 0,
    x: direction === "left" ? 30 : -30,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: "left" | "right") => ({
    opacity: 0,
    x: direction === "left" ? -30 : 30,
  }),
};

export const CategoriesPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [emojiIndices, setEmojiIndices] = useState<{ [key: string]: number }>(
    {}
  );
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right">(
    "left"
  );

  const { queryKey, queryFn } = useCategories();
  const { data } = useQuery({ queryKey, queryFn });

  const timeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const queryClient = useQueryClient();

  const { mutate: updateDefaultEmoji } = useMutation({
    mutationKey: ["updateCategoryDefaultEmoji"],
    mutationFn: updateCategoryDefaultEmoji,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey, refetchType: "active" });
      toast.success("Emoji actualizado");
    },
    onError: () => {
      toast.error("Error al actualizar emoji");
    },
  });

  useEffect(() => {
    if (data) {
      const initialIndices: { [key: string]: number } = {};
      data.forEach((category) => {
        const index = category.emojis.indexOf(category.defaultEmoji ?? "");
        initialIndices[category.id] = index !== -1 ? index : 0;
      });
      setEmojiIndices(initialIndices);
    }
  }, [data]);

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-semibold text-4xl tracking-tight">Categorías</h1>
        <MaiButton
          icon="pi pi-plus"
          label="Nueva"
          size="small"
          className="border border-gray-400 text-gray-200 hover:bg-gray-200 hover:text-black transition-colors duration-200"
          onClick={() => setIsDialogOpen(true)}
        />
      </div>

      {data && data.length > 0 ? (
        <div className="flex flex-wrap items-start gap-4">
          {data.map((category) => {
            const currentEmojiIndex = emojiIndices[category.id] ?? 0;
            const currentEmoji = category.emojis[currentEmojiIndex];

            return (
              <div
                key={category.id}
                className="flex flex-col items-center gap-3 group cursor-pointer"
                title="Desliza para cambiar el emoji"
              >
                <div className="w-24 h-24 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition-colors duration-300 relative overflow-hidden flex items-center justify-center shadow-md">
                  <Ripple />
                  <motion.div
                    className="w-full h-full flex items-center justify-center"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => {
                      const offsetX = info.offset.x;
                      const velocityX = info.velocity.x;
                      const total = category.emojis.length;
                      const current = emojiIndices[category.id] || 0;

                      let next = current;
                      let direction: "left" | "right" = "left";

                      if (offsetX < -30 || velocityX < -500) {
                        next = (current + 1) % total;
                        direction = "left";
                      } else if (offsetX > 30 || velocityX > 500) {
                        next = (current - 1 + total) % total;
                        direction = "right";
                      }

                      if (next !== current) {
                        setSwipeDirection(direction);
                        setEmojiIndices((prev) => ({
                          ...prev,
                          [category.id]: next,
                        }));

                        // Limpiar timeout anterior
                        clearTimeout(timeoutRef.current[category.id]);

                        // Programar actualización si se mantiene ese emoji
                        timeoutRef.current[category.id] = setTimeout(() => {
                          const selectedEmoji = category.emojis[next];
                          if (selectedEmoji !== category.defaultEmoji) {
                            updateDefaultEmoji({
                              categoryName: category.name,
                              newEmoji: selectedEmoji,
                            });
                          }
                        }, 2000);
                      }
                    }}
                  >
                    <AnimatePresence mode="wait" custom={swipeDirection}>
                      <motion.div
                        key={`${category.id}-${currentEmojiIndex}`}
                        className="text-5xl"
                        variants={emojiVariants}
                        custom={swipeDirection}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.25 }}
                      >
                        {currentEmoji}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                  <div className="flex gap-1 mt-2 absolute bottom-2">
                    {category.emojis.map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i === currentEmojiIndex ? "bg-white" : "bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm font-semibold text-center text-gray-300 break-words w-full">
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-24">
          <div className="text-6xl mb-4">📂</div>
          <h2 className="text-lg font-semibold">
            No hay categorías disponibles
          </h2>
          <p className="text-gray-500">
            Intenta añadir una categoría nueva haciendo clic en el botón de
            arriba.
          </p>
        </div>
      )}

      {isDialogOpen && (
        <CreateCategoryModal
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </div>
  );
};
