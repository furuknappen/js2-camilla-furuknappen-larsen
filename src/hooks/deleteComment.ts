import { del } from "../api/apiClient";
import type { Result } from "../utils/result";





export async function deleteComment(postId:number, commentId: number): Promise<Result<void, Error>> {
 try {
    await del<void>(`/social/posts/${postId}/comment/${commentId}`);
    
    return{
        ok: true,
        value: undefined
      };
  } catch (error: unknown) {
     return {
      ok: false,
      error: error as Error,
    };
  }

}