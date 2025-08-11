export interface LoginResponse {
  accessToken: string;
  user: {
    email: string;
    confirmPassword: string;
    role: string;
    id: number;
  };
}