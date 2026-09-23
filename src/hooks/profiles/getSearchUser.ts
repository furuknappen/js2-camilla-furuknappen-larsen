
import { get } from "../../api/apiClient";
import type { Result } from "../../utils/result";
import type { Profile } from "./unfollowProfile";
//TODO: not in use

type SearchResponse ={
  data: Profile,
  meta: object

}

export async function getSearchUser(query: string): Promise<Result<SearchResponse, Error>> {
  try {
    const response = await get<SearchResponse>(`/social/profiles/search?q=${encodeURIComponent(query)}&_author=true&_reactions=true`);

 if (!response) {
      return {
        ok: false,
        error: new Error("No response was recieved from API"),
      };
    }

    return { ok: true, value: response };
  } catch (error: unknown) {
    return{
      ok: false,
      error: error as Error
    }
  }
}