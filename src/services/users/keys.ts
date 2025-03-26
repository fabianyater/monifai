export const userKeys = {
  allUsers: ["users"] as const,
  user: (id: number) => ["users", id] as const,
};