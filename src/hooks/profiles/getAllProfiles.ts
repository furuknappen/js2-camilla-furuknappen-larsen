import { get } from "../../api/apiClient";
import type { Result } from "../../utils/result";
import type { FollowProfileResponse } from "./unfollowProfile";

export async function getAllProfiles(): Promise<
  Result<FollowProfileResponse, Error>
> {
  try {
    const response = await get<FollowProfileResponse>(`/social/profiles`);

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
