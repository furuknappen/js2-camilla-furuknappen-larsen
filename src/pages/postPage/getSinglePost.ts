// import { get } from "../../api/apiClient";
// import { type Post } from "../homePage/getPosts";

// export interface PostResponse {
//   data: Post;
//   meta: object;
// }
// export type Author = {
//   name: string;
//   email: string;
//   bio: string;
//   avatar: {
//     url: string;
//     alt: string;
//   };
//   banner: {
//     url: string;
//     alt: string;
//   };
// };


// export type Comment = {
//     author: Author
//     body: string,
//     replyToId: null,
//     id: number,
//     postId: number,
//     owner: string,
//     created: string,
    
  
// };

// export type PostWithComentsAndAuthor = {
//   author: Author
//   body: string;
//   comments: Comments[]
//   created: string;
//   id: number;
//   media: {
//     alt: string;
//     url: string;
//   };
//   tags: [];
//   title: string;
//   updated: string;
//   _count: {
//     comments: number;
//     reactions: number;
//   };
// };


// export async function getSinglePost(id: number): Promise<PostResponse> {
//   try {
//     const response = await get<PostResponse>(
//       `/social/posts/${id}?_author=true&_comments=true&_reactions=true`,
//     );

//     if (!response) {
//       throw new Error("No response from server");
//     }
//     console.log("post collected", response);
//     // console.log(response.data.accessToken);
//     // ... do something with new user
//     return response;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error("get post error:", error.message);
//     }
//     throw error;
//   }
// }
