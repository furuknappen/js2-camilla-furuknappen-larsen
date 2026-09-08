import { get } from "../../api/apiClient";


//TODO: må jeg har noe mer her?
export interface PostsResponse {
  data: Post[], 
  meta: {
    isFirstPage: boolean,
    isLastPage: boolean,
    currentPage: number,
    previousPage: number | null,
    nextPage: number,
    pageCount: number,
    totalCount: number
}
}

export type Post = {
  body: string;
  created: string;
  id: number;
  media: {
    alt: string;
    url: string;
  };
  tags: [];
  title: string;
  updated: string;
  _count: {
    comments: number;
    reactions: number;
  };
};

// type LoginPayload = {
//   email: string;
//   password: string;
// };

export async function getAllPosts(): Promise<PostsResponse> {
  try {
    const response = await get<PostsResponse>("/social/posts");

    if (!response) {
      throw new Error("No response from server");
    }
    console.log("all posts collected", response);
    // console.log(response.data.accessToken);
    // ... do something with new user
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Registration error:", error.message);
    }
    throw error;
  }
}
