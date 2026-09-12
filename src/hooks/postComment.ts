import { post } from "../api/apiClient";

type CommentRequest = {
  body: string;
  replyToId?: number;
};
type CommentResponse = {
  data: CommentData;
  meta: object;
};

type CommentData = {
  body: string;
  replyToId: null; // or replyToId number if provided in request
  id: number;
  postId: number;
  owner: string;
  created: string;
};

export async function postComment(comment: string, postId:number, replyToId?: number): Promise<CommentResponse> {
 try {
   
   const request: CommentRequest = {
    body: comment,
    replyToId: replyToId 
   }

    const response = await post<CommentResponse>(
      `/social/posts/${postId}/comment`, request
    );

    if (!response) {
      throw new Error("No response from server");
    }
    console.log("post collected", response);
    // console.log(response.data.accessToken);
    // ... do something with new user
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("get post error:", error.message);
    }
    throw error;
  }

}
