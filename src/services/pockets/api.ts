import { axiosConfig } from "../../lib/helpers/axios/axiosConfig";
import { ApiResponse } from "../../lib/types/ApiResponse";
import {
  Pocket,
  PocketBalanceSummary,
  PocketRequest,
  PocketResponse,
  PocketTransferRequest,
  TotalBalanceResponse,
} from "../../lib/types/Pocket";

export const getPockets = async (): Promise<Pocket[]> => {
  const response = await axiosConfig.get<ApiResponse<Pocket[]>>("/pockets/");

  return response.data.data;
};

export const getPocketBalance = async (
  pocketId: number,
  startDate: Date
): Promise<PocketBalanceSummary> => {
  const response = await axiosConfig.get<ApiResponse<PocketBalanceSummary>>(
    `/pockets/${pocketId}/balance`,
    {
      params: {
        startDate: startDate.toISOString().split("T")[0],
      },
    }
  );

  return response.data.data;
};

export const getTotalBalance = async (): Promise<TotalBalanceResponse> => {
  const response = await axiosConfig.get<ApiResponse<TotalBalanceResponse>>(
    `/pockets/balance`
  );

  return response.data.data;
};

export const createPocket = async (
  pocket: PocketRequest
): Promise<PocketResponse> => {
  const response = await axiosConfig.post<ApiResponse<PocketResponse>>(
    "/pockets/",
    pocket
  );

  return response.data.data;
};

export const updatePocket = async ({
  pocketId,
  pocket,
}: {
  pocketId: number;
  pocket: PocketRequest;
}): Promise<void> => {
  const response = await axiosConfig.put<ApiResponse<void>>(
    `/pockets/${pocketId}`,
    pocket
  );

  return response.data.data;
};

export const transferBetweenPockets = async (
  pocketTransferRequest: PocketTransferRequest
): Promise<void> => {
  const response = await axiosConfig.post<ApiResponse<void>>(
    "/pockets/transfer",
    pocketTransferRequest
  );

  return response.data.data;
};
