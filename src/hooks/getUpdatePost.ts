import { put } from "../api/apiClient";
import type { Post } from "../types";
import type { Result } from "../utils/result";
// import type { PostsResponse } from "../getAllPosts";

export type UpdateRequest = {
  title: string;
  body: string;
  tags: string[];
  media: {
    url: string;
    alt: string;
  } | null;
};

type UpdateResponse = {
  data: Post[];
  meta: object;
};

export async function putUpdatePost(
  id: number,
  updateRequest: UpdateRequest,
): Promise<Result<UpdateResponse, Error>> {
  try {
    const response = await put<UpdateResponse>(
      `/social/posts/${id}`,
      updateRequest,
    );

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
