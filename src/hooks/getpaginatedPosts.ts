import { get } from "../api/apiClient";
import type { Meta } from "../types";
import type { Post } from "../types";
import type { Result } from "../utils/result";

type GetPaginatedPostsResponse = {
  data: Post[];
  meta: Meta;
};

export async function getAllPaginatedPosts(
  page: number = 1,
  limit: number = 10,
): Promise<Result<GetPaginatedPostsResponse, Error>> {
  try {
    const response = await get<GetPaginatedPostsResponse>(
      `/social/posts?page=${page}&limit=${limit}&_author=true&_reactions=true`,
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
