import { get } from "../api/apiClient";
import type { Post } from "./getAllPosts";

export type SinglePostResponse= {
  data: Post;
  meta: object;
}

export async function getSinglePost(id: number): Promise<SinglePostResponse> {
  try {
    const response = await get<SinglePostResponse>(
      `/social/posts/${id}?_author=true&_comments=true&_reactions=true`
    );

    if (!response) {
      throw new Error("No response from server");
    }
    console.log("post collected", response);
    // console.log(response.data.accessToken);
    // ... do something with new user
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("get post error:", error.message);
    }
    throw error;
  }
}
