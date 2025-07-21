import { axiosConfig } from "../../lib/helpers/axios/axiosConfig";
import { ApiResponse } from "../../lib/types/ApiResponse";
import {
  LoanPaymentRequest,
  LoanRequest,
  LoanResponse,
  TotalLoanBalanceResponse,
} from "../../lib/types/Loan";

export const createLoan = async (loan: LoanRequest): Promise<void> => {
  const response = await axiosConfig.post("/loans/", loan);

  return response.data.data;
};

export const getLoans = async (): Promise<LoanResponse[]> => {
  const response = await axiosConfig.get<ApiResponse<LoanResponse[]>>(
    "/loans/"
  );

  return response.data.data;
};

export const getLoan = async (loanId: number): Promise<LoanResponse> => {
  const response = await axiosConfig.get<ApiResponse<LoanResponse>>(
    `/loans/${loanId}`
  );

  return response.data.data;
};

export const makePayment = async (
  loanPaymentRequest: LoanPaymentRequest
): Promise<ApiResponse<void>> => {
  const response = await axiosConfig.post<ApiResponse<void>>(
    "/loans/payment",
    loanPaymentRequest
  );

  return response.data;
};

export const getTotalLoanBalance =
  async (): Promise<TotalLoanBalanceResponse> => {
    const response = await axiosConfig.get<
      ApiResponse<TotalLoanBalanceResponse>
    >(`/loans/total-loaned`);

    return response.data.data;
  };
