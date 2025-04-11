import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useCategories } from "../../services/categories/queries";
import { CategoryPill } from "../atoms/CategoryPill";

type CategoryPillsWrapperProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export const CategoryPillsWrapper = ({
  selectedCategory,
  setSelectedCategory,
}: CategoryPillsWrapperProps) => {
  const { queryFn, queryKey } = useCategories();
  const { data: categories } = useQuery({ queryKey, queryFn });

  if (!categories) return null;

  const handleClick = (categoryName: string) => {
    setSelectedCategory(categoryName === selectedCategory ? "" : categoryName);
  };

  const visibleCategories = selectedCategory
    ? categories.filter((category) => category.name === selectedCategory)
    : categories;

  return (
    <motion.div
      layout
      className="flex flex-row overflow-x-auto gap-2 no-scrollbar py-1"
    >
      <AnimatePresence initial={false}>
        {visibleCategories.map((category) => (
          <motion.div
            key={category.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <CategoryPill
              category={category}
              selected={category.name === selectedCategory}
              onClick={() => handleClick(category.name)}
              hasSelection={selectedCategory !== ""}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
