import { get } from "../../api/apiClient";
// import type { Author, Comment } from "../postPage/getSinglePost";


//TODO: må jeg har noe mer her?
export type PostsResponse = {
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

export type SinglePostResponse= {
  data: Post;
  meta: object;
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
  reactions: Reaction[],
  tags: [];
  title: string;
  updated: string;
  _count: {
    comments: number;
    reactions: number;
  };
};

export type Reaction = {
  count: number
  reactors: string[]
  symbol: string
}

export type Author = {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar,
  banner: {
    url: string;
    alt: string;
  };
};

export type Avatar = {
    url: string;
    alt: string;
}

export type Comment = {
    author: Author
    body: string,
    replyToId: null,
    id: number,
    postId: number,
    owner: string,
    created: string,
    
  
};
// type LoginPayload = {
//   email: string;
//   password: string;
// };

export async function getAllPosts(): Promise<PostsResponse> {
  try {
    const response = await get<PostsResponse>("/social/posts?_author=true&_reactions=true");

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


export async function getSinglePost(id: number): Promise<SinglePostResponse> {
  try {
    const response = await get<SinglePostResponse>(
      `/social/posts/${id}?_author=true&_comments=true&_reactions=true`,
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

