import { post } from "../api/apiClient";

export type PostRequest = {
  title: string; // Required
  body?: string; // Optional
  tags?: [string]; // Optional
  media?: {
    url: string;
    alt: string;
  }; // Optional
};


type PostResponse = {
  data: PostData,
  meta: object
}


type PostData ={
    id: number,
    title: string,
    body: string,
    tags: [string],
    media: {
      url: string,
      alt: string
    },
    created: string,
    updated: string,
    _count: {
      comments: number,
      reactions: number
    }
}

export async function postnewPost(body: object): Promise<PostResponse> {
 try {
   
    const response = await post<PostResponse>(
      `/social/posts`, body
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