import { put } from "../../api/apiClient"


export type FollowProfileResponse = {
  data: {
    followers: Profile[],
    following: Profile[]
  }
}



export type Profile = {
   name: string,
        email: string,
        bio: string,
        banner: {
          url: string,
          alt: string
        },
        avatar: {
          url: string,
          alt: string
        }
}


export async function unfollowProfile(name: string): Promise<FollowProfileResponse> {
  try {
    
    const response = await put<FollowProfileResponse>(`/social/profiles/${name}/unfollow`, undefined);

    if (!response) {
      throw new Error("No response from server");
    }
    console.log("unfollowed user", response);
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




export async function followProfile(name: string): Promise<FollowProfileResponse> {
  try {

    const response = await put<FollowProfileResponse>(`/social/profiles/${name}/follow`, undefined);

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

