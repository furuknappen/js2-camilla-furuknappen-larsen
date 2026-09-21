import { get } from "../api/apiClient";
import type { Profile } from "./follow-unfollow-profile";



// export type PostNoComments = {
//   author: Author
//   body: string;
//   created: string;
//   id: number;
//   media: {
//     alt: string;
//     url: string;
//   };
//   reactions: Reaction[],
//   tags: [];
//   title: string;
//   updated: string;
//   _count: {
//     comments: number;
//     reactions: number;
//   };
// };


type SearchResponse ={
  data: Profile,
  meta: object

}

export async function getSearchUser(query: string): Promise<SearchResponse> {
  try {
    const response = await get<SearchResponse>(`/social/profiles/search?q=${encodeURIComponent(query)}&_author=true&_reactions=true`);

    if (!response) {
      throw new Error("No response from server");
    }
    // console.log("User registered successfully:", response);
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