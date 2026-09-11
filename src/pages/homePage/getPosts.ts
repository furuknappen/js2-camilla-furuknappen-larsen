import { get } from "../../api/apiClient";
import type { Author, Comment } from "../postPage/getSinglePost";


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
  author: Author
  body: string;
  comments: Comment[]
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
    const response = await get<PostsResponse>("/social/posts?_author=true&_comments=true&_reactions=true");

    if (!response) {
      throw new Error("No response from server");
    }
    console.log("all posts collected", response);
    // console.log(response.data.accessToken);
    // ... do something with new user
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Fetch error:", error.message);
    }
    throw error;
  }
}
