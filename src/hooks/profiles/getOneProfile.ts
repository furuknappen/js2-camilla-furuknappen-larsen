import { get } from "../../api/apiClient";
import type { Author } from "../../types";
import type { Result } from "../../utils/result";

type GetOneProfileResponse = {
  data: Author;
  meta: object;
};

export async function getOneProfile(
  name: string,
): Promise<Result<GetOneProfileResponse, Error>> {
  try {
    const response = await get<GetOneProfileResponse>(
      `/social/profiles/${name}`,
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
