import { get } from "../api/apiClient";
import type { Post } from "../types";
import type { Result } from "../utils/result";

type SearchResponse = {
  data: Post[];
  meta: object;
};

export async function getSearchResult(
  query: string,
): Promise<Result<SearchResponse, Error>> {
  try {
    const response = await get<SearchResponse>(
      `/social/posts/search?q=${encodeURIComponent(query)}&_author=true&_reactions=true`,
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
