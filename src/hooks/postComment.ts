import { post } from "../api/apiClient";
import type { Comment } from "../types";
import type { Result } from "../utils/result";

type CommentRequest = {
  body: string;
  replyToId?: number;
};
type CommentResponse = {
  data: Comment;
  meta: object;
};

export async function postComment(
  comment: string,
  postId: number,
  replyToId?: number,
): Promise<Result<CommentResponse, Error>> {
  try {
    const request: CommentRequest = {
      body: comment,
      replyToId: replyToId,
    };

    const response = await post<CommentResponse>(
      `/social/posts/${postId}/comment`,
      request,
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
