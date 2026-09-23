import { del } from "../api/apiClient";
import type { Result } from "../utils/result";





export async function deletePost(id:number): Promise<Result<void, Error>> {
 try {
    await del<void>(`/social/posts/${id}`);

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