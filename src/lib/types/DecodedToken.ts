export type DecodedToken = {
  userId: string;
  exp?: number;
  [key: string]: unknown;
};
