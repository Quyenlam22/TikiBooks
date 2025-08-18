export interface User {
    fullName?: string;
    email?: string;
    address?: string;
    gender?: "male" | "female" | "other";
    birthDay?: string;
    nickName?: string;
    phone?: string;
    id?: number;
    role?: string;
    password: string;
}
