import { get } from "../api/apiClient";
import type { Post } from "../types";
import type { Result } from "../utils/result";

export type PostsResponse = {
  data: Post[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number;
    pageCount: number;
    totalCount: number;
  };
};

export async function getAllPosts(): Promise<Result<PostsResponse, Error>> {
  try {
    const response = await get<PostsResponse>(
      "/social/posts?_author=true&_reactions=true",
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
