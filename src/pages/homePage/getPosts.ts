import { get } from "../../api/apiClient";


//TODO: må jeg har noe mer her?
export interface AllPosts {
  data: string[]
}


// type LoginPayload = {
//   email: string;
//   password: string;
// };

export async function getAllPosts(): Promise<AllPosts> {
  try {
    const response = await get<AllPosts>("/social/posts");

    if (!response) {
      throw new Error("No response from server");
    }
    console.log("all posts collected", response);
    // console.log(response.data.accessToken);
    // ... do something with new user
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Registration error:", error.message);
    }
    throw error;
  }
}
