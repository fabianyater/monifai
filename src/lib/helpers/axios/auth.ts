// lib/helpers/auth.ts
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../types/DecodedToken";

export const parseToken = (token: string) => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : false;
    return { decoded, isExpired };
  } catch {
    return { decoded: null, isExpired: true };
  }
};
