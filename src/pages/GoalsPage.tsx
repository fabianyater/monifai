import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import CircularProgress from "../components/atoms/CircularProgress";
import { MaiButton } from "../components/atoms/MaiButton";
import { CreateGoalModal } from "../components/molecules/CreateGoalModal";
import { formatAmount } from "../lib/helpers/formatAmount";
import { formatDate } from "../lib/helpers/formatDate";
import { useGoals } from "../services/goals/queries";
import { useNavigate } from "react-router";

export const GoalsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { queryFn, queryKey } = useGoals();
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn,
  });
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return toast.error("Something went wrong");

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <div className="flex gap-2 items-start flex-col">
          <h2 className="font-semibold text-3xl tracking-tight">Metas</h2>
          <span className="text-gray-300 text-sm">
            {data ? "Total de metas: " + data.length : "0 metas"}
          </span>
        </div>
        <MaiButton
          icon="pi pi-plus"
          label="Añadir meta"
          size="small"
          className="border border-gray-400 text-gray-200 hover:bg-gray-200 hover:text-black transition-colors duration-200"
          onClick={() => setIsDialogOpen(true)}
        />
      </div>
      {data && data.length > 0 ? (
        <div className="flex flex-wrap items-start gap-4">
          {data?.map((goal) => {
            const paidAmount = data ? goal.amount - goal.balance : 0;
            const progress = data
              ? Math.min((paidAmount / goal.amount) * 100, 100)
              : 0;

            return (
              <div
                key={goal.id}
                className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-600 hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
                onClick={() => navigate(`/goals/${goal.id}`)}
              >
                <div className="flex gap-4 items-center">
                  <div className="relative w-12 h-12 rounded-full bg-neutral-500 flex items-center justify-center">
                    <div
                      className="absolute inset-0 rounded-full border-2"
                      style={{
                        background: `conic-gradient(#3B82F6 ${progress}%, transparent ${progress}% 100%)`,
                        clipPath: "circle(50% at 50% 50%)",
                      }}
                    />
                    <div className="z-10">
                      <span className="text-2xl font-semibold ">
                        {goal.emoji}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">
                      {goal.name}{" "}
                      <span className="text-sm font-normal text-gray-400">
                        ({formatAmount(goal.amount)})
                      </span>
                    </span>
                    <span className="text-sm text-gray-300">
                      {formatDate(goal.dueDate)}
                    </span>
                  </div>
                </div>
                <CircularProgress progress={progress} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-24">
          <div className="text-6xl mb-4">📂</div>
          <h2 className="text-lg font-semibold">Sin metas</h2>
          <p className="text-gray-500">
            Intenta añadir una meta haciendo clic en el botón de arriba.
          </p>
        </div>
      )}
      <CreateGoalModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};
