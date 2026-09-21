import { put } from "../api/apiClient";
import type { Post } from "./getAllPosts";
// import type { PostsResponse } from "../getAllPosts";

export type UpdateRequest = {
  title: string;
  body: string;
  tags: string[];
  media: {
    url: string;
    alt: string;
  };
};


type UpdateResponse = {
  data: Post[],
  meta: object
}



export async function putUpdatePost(id: number, updateRequest: UpdateRequest): Promise<UpdateResponse> {
  try {
    const response = await put<UpdateResponse>(`/social/posts/${id}`, updateRequest);

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