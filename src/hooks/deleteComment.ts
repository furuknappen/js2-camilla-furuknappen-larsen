import { del } from "../api/apiClient";





export async function deleteComment(postId:number, commentId: number): Promise<void> {
 try {
    await del<void>(`/social/posts/${postId}/comment/${commentId}`);

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("get post error:", error.message);
    }
    throw error;
  }

}