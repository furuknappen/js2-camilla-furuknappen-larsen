import { put } from "../../api/apiClient";
import type { Result } from "../../utils/result";

export type FollowProfileResponse = {
  data: {
    followers: Profile[];
    following: Profile[];
  };
};

export type Profile = {
  name: string;
  email: string;
  bio: string;
  banner: {
    url: string;
    alt: string;
  };
  avatar: {
    url: string;
    alt: string;
  };
};

export async function unfollowProfile(
  name: string,
): Promise<Result<FollowProfileResponse, Error>> {
  try {
    const response = await put<FollowProfileResponse>(
      `/social/profiles/${name}/unfollow`,
      undefined,
    );

    if (!response) {
      return {
        ok: false,
        error: new Error("No response from the API was recieved"),
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
