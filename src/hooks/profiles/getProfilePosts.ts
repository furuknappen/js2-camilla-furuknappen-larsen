import { get } from "../../api/apiClient";
import type { Result } from "../../utils/result";
import type { PostsResponse } from "../getAllPosts";

export async function getProfilePosts(
  name: string,
): Promise<Result<PostsResponse, Error>> {
  try {
    const response = await get<PostsResponse>(
      `/social/profiles/${name}/posts?_author=true&_reactions=true`,
    );

    if (!response) {
      return {
        ok: false,
        error: new Error("No response was recieved"),
      };
    }

    return { ok: true, value: response };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error as Error,
    };
  }
}
