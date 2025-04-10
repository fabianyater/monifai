export type Category = {
  id: number;
  name: string;
  emojis: string[];
};

export type CategoryRequest = Omit<Category, "emojis" | "id"> & {
  id?: number;
};
