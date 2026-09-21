import { get } from "../../api/apiClient";
import type { PostsResponse } from "../getAllPosts";




export async function getProfilePosts(name: string): Promise<PostsResponse> {
  try {
    const response = await get<PostsResponse>(`/social/profiles/${name}/posts?_author=true&_reactions=true`);

    if (!response) {
      throw new Error("No response from server");
    }
    console.log("all posts from profile collected", response);
    // console.log(response.data.accessToken);
    // ... do something with new user
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Fetch error:", error.message);
    }
    throw error;
  }
}