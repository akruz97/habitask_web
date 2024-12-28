export interface AuthResponse<T = null> {
    status: boolean;
    msg: string;
    data: T;
  }

export interface ApiResponse<T = null> {
    status: boolean;
    msg: string;
    data: T;
}

export interface LoginResponse {
    profile_completed: boolean | null;
    token: string;
    loginMode: string;
    role: string;
}

export interface AuthUserData {
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: string
}

export interface LoginData {
    email: string;
    password: string;
}

export interface ChangePasswordData {
    email: string;
    code: string;
    password: string;
}

export interface RegisterData {
    name: string;
    lastname: string;
    email: string;
    password: string;
    accept_terms: boolean;
    role: string;
}
