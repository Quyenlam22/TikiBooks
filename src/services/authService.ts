import instance from "./api.service";
import type { LoginPayload } from "../../type/login/LoginRequest";
import type { LoginResponse } from "../../type/login/LoginResponse";
import type { User } from "../../type/user";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await instance.post<LoginResponse>("/login", payload);
  return res.data;
};
export const getUserById = async (id: string) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token");

  const res = await instance.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;

};
export const updateUserById = async (
  id: string | number,
  updatedData: User
) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token");

  const res = await instance.put(`/users/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
