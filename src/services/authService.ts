import instance from "./api.service";
import type { LoginPayload } from "../../type/login/LoginRequest";
import type { LoginResponse } from "../../type/login/LoginResponse";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await instance.post<LoginResponse>("/login", payload);
  return res.data;
};