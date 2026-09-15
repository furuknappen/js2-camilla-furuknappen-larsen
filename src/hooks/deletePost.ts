import { del } from "../api/apiClient";





export function deletePost(id:number) {
 try {
   
    const response =  del(`/social/posts/${id}`);

    if (!response) {
      throw new Error("No response from server");
    }
    console.log("post collected", response);
return response
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("get post error:", error.message);
    }
    throw error;
  }

}