import { post } from "../api/apiClient.ts";
import type { Result } from "../utils/result.ts";

export type RegisterResponse = {
  data: RegisterData;
  meta: object;
};
export type RegisterData = {
  name: string;
  email: string;
  bio: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser(
  data: RegisterPayload,
): Promise<Result<RegisterResponse, Error>> {
  try {
    const response = await post<RegisterResponse>("/auth/register", data);

    if (!response) {
      return {
        ok: false,
        error: new Error("No response was recieved"),
      };
    }

    return { ok: true, value: response };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error as Error,
    };
  }
}

// ..................................

export interface LoginResponse {
  data: {
    name: string;
    email: string;
    bio: string;
    avatar: {
      url: string;
      alt: string;
    };
    banner: {
      url: string;
      alt: string;
    };
    accessToken: string;
    venueManager: boolean;
  };
  meta: object;
}

type LoginPayload = {
  email: string;
  password: string;
};

export async function loginUser(
  data: LoginPayload,
): Promise<Result<LoginResponse, Error>> {
  try {
    const response = await post<LoginResponse>("/auth/login", data);

    if (!response) {
      return {
        ok: false,
        error: new Error("No response was recieved"),
      };
    }

    return { ok: true, value: response };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error as Error,
    };
  }
}
