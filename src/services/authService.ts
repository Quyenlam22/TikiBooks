import instance from "./api.service";
import type { LoginPayload } from "../../type/login/LoginRequest";
import type { LoginResponse } from "../../type/login/LoginResponse";
import type { User } from "../../type/user";
import axios from "axios";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await instance.post<LoginResponse>("/login", payload);
  return res.data;
};
export const getUserById = async (id: number) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token");

  const res = await instance.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;

};
type RegisterPayload = Omit<User, "id"> & { password: string };

export const createUser = async (newUser: RegisterPayload) => {
  try {
    // json-server-auth: đăng ký qua /register (KHÔNG cần Authorization)
    const res = await instance.post("/register", newUser);
    // json-server-auth trả { accessToken, user }
    return (res.data?.user ?? res.data) as User;
  } catch (e: unknown) {
    // Nếu không dùng json-server-auth (404) thì fallback POST /users
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      const token = localStorage.getItem("access_token");
      const res = await instance.post("/users", newUser, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data as User;
    }
    throw e;
  }
};

export const deleteUserById = async (id: string | number) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token");

  const res = await instance.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getUsers = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token");

  const res = await instance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const updateUserById = async (
  id: string | number,
  updatedData: Partial<User>
) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token");

  const res = await instance.patch(`/users/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

