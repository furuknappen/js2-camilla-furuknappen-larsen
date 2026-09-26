import { get } from "../api/apiClient";
import type { Result } from "../utils/result";
import type { Post } from "../types";

export type SinglePostResponse = {
  data: Post;
  meta: object;
};

export async function getSinglePost(
  id: number,
): Promise<Result<SinglePostResponse, Error>> {
  try {
    const response = await get<SinglePostResponse>(
      `/social/posts/${id}?_author=true&_comments=true&_reactions=true`,
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
