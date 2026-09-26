import { put } from "../../api/apiClient";
import type { Result } from "../../utils/result";
import type { FollowProfileResponse } from "./unfollowProfile";

export async function followProfile(
  name: string,
): Promise<Result<FollowProfileResponse, Error>> {
  try {
    const response = await put<FollowProfileResponse>(
      `/social/profiles/${name}/follow`,
      undefined,
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
