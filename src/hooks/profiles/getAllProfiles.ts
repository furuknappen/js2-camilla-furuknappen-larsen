import { get } from "../../api/apiClient";
import type { FollowProfileResponse } from "./follow-unfollow-profile";





export async function getAllProfiles(): Promise<FollowProfileResponse> {
  try {
    
    const response = await get<FollowProfileResponse>(`/social/profiles`);

    if (!response) {
      throw new Error("No response from server");
    }
    console.log("added followers, current following", response);
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

export async function getAllFollowingProfiles(name:string): Promise<FollowProfileResponse> {
  try {
    
    const response = await get<FollowProfileResponse>(`/social/profiles/${name}?_following=true`);

    if (!response) {
      throw new Error("No response from server");
    }
    console.log("added followers, current following", response);
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