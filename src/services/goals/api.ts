import { axiosConfig } from "../../lib/helpers/axios/axiosConfig";
import { ApiResponse } from "../../lib/types/ApiResponse";
import {
  GoalRequest,
  GoalResponse,
  GoalTransactionRequest,
  GoalTransactionsResponse,
} from "../../lib/types/Goal";

export const createGoal = async (goal: GoalRequest): Promise<GoalResponse> => {
  const response = await axiosConfig.post("/goals/", goal);

  return response.data.data;
};

export const getGoals = async (): Promise<GoalResponse[]> => {
  const response = await axiosConfig.get<ApiResponse<GoalResponse[]>>(
    "/goals/"
  );

  return response.data.data;
};

export const getGoal = async (goalId: number): Promise<GoalResponse> => {
  const response = await axiosConfig.get<ApiResponse<GoalResponse>>(
    `/goals/${goalId}`
  );

  return response.data.data;
};

export const makeDeposit = async (
  goalDepositRequest: GoalTransactionRequest
): Promise<void> => {
  const response = await axiosConfig.post("/goals/deposit", goalDepositRequest);

  return response.data;
};

export const makeWithdraw = async (
  goalWithdrawRequest: GoalTransactionRequest
): Promise<void> => {
  const response = await axiosConfig.post(
    "/goals/withdraw",
    goalWithdrawRequest
  );

  return response.data;
};

export const getGoalTransactions = async (
  goalId: number
): Promise<GoalTransactionsResponse[]> => {
  const response = await axiosConfig.get<
    ApiResponse<GoalTransactionsResponse[]>
  >(`/goals/${goalId}/transactions`);

  return response.data.data;
};
