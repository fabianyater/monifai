import { getGoal, getGoals, getGoalTransactions } from "./api";
import { goalKeys } from "./keys";

export const useGoals = () => {
  return {
    queryKey: ["goals"],
    queryFn: async () => {
      const response = await getGoals();

      return response;
    },
  };
};

export const useGoal = (goalId: number) => {
  return {
    queryKey: [goalKeys.goal, goalId],
    queryFn: async () => {
      const response = await getGoal(goalId);

      return response;
    },
    enabled: !!goalId,
  };
};

export const useGoalTransactions = (goalId: number) => {
  return {
    queryKey: [goalKeys.goal, goalId, "transactions"],
    queryFn: async () => {
      const response = await getGoalTransactions(goalId);

      return response;
    },
    enabled: !!goalId,
  };
};
