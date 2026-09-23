import { post } from "../api/apiClient";
import type { Post } from "../types";
import type { Result } from "../utils/result";

export type PostRequest = {
  title: string; // Required
  body?: string; // Optional
  tags?: string[]; // Optional
  media?: {
    url: string;
    alt: string;
  }; // Optional
};

type PostResponse = {
  data: Post;
  meta: object;
};

export async function postnewPost(
  body: object,
): Promise<Result<PostResponse, Error>> {
  try {
    const response = await post<PostResponse>(`/social/posts`, body);

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
