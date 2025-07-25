import { axiosConfig } from "../../lib/helpers/axios/axiosConfig";
import { ApiResponse } from "../../lib/types/ApiResponse";
import { Category } from "../../lib/types/Category";
import { UpdateCategoryDefaultEmojiRequest } from "./../../lib/types/Category";

export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosConfig.get<ApiResponse<Category[]>>(
    `/categories/`
  );

  return response.data.data;
};

export const createCategory = async (
  newCategory: Partial<Category>
): Promise<Category> => {
  const response = await axiosConfig.post<ApiResponse<Category>>(
    `/categories/`,
    newCategory
  );

  return response.data.data;
};

export const updateCategoryDefaultEmoji = async (
  request: UpdateCategoryDefaultEmojiRequest
): Promise<Category> => {
  const response = await axiosConfig.patch<ApiResponse<Category>>(
    "/categories/",
    request
  );

  return response.data.data;
};
