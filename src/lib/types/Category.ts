export type Category = {
  id: number;
  name: string;
  emojis: string[];
  defaultEmoji?: string;
};

export type CategoryRequest = Omit<Category, "emojis" | "id"> & {
  id?: number;
};

export type UpdateCategoryDefaultEmojiRequest = {
  categoryName: string;
  newEmoji: string;
};