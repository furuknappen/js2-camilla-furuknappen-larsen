import { post,  } from "../api/apiClient.ts";

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

interface RegisterResponse {
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
type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser(
  data: RegisterPayload,
): Promise<RegisterResponse> {
  try {
    const response = await post<RegisterResponse>("/auth/register", data);

    if (!response) {
      throw new Error("No response from server");
    }
    // console.log("User registered successfully:", response);
    // ... do something with new post
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Registration error:", error.message);
    }
    throw error;
  }
}

// ..................................

interface LoginResponse {
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

export async function loginUser(data: LoginPayload): Promise<LoginResponse> {
  try {
    const response = await post<LoginResponse>("/auth/login", data);

    if (!response) {
      throw new Error("No response from server");
    }
    console.log("User registered successfully:", response);
    console.log(response.data.accessToken);
    // ... do something with new post
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Registration error:", error.message);
    }
    throw error;
  }
}
