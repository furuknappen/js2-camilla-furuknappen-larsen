import { post,  } from "../api/apiClient.ts";
import type { Result } from "../utils/result.ts";

// {
//   "data": {
//       "name": "camillalsa",
//       "email": "czsdjdfbajsd@stud.noroff.no",
//       "bio": null,
//       "avatar": {
//           "url": "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
//           "alt": "A blurry multi-colored rainbow background"
//       },
//       "banner": {
//           "url": "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
//           "alt": "A blurry multi-colored rainbow background"
//       }
//   },
//   "meta": {}
// }
export type RegisterResponse = {
  data: RegisterData
  meta: object
}
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
}

//TODO: BK denne filen er litt teit, se hva du tenker, burde den splittes og flyttes til hooks?

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
    return{
      ok: false,
      error: error as Error
    }
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

export async function loginUser(data: LoginPayload): Promise<Result<LoginResponse, Error>> {
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
    return{
      ok: false,
      error: error as Error
    }
  }
}
