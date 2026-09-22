import { createPost } from "../../components/createPost";
import type { Post, PostsResponse } from "../../hooks/getAllPosts";
import type { PostRequest } from "../../hooks/postPost";
import type { FollowProfileResponse, Profile } from "../../hooks/profiles/follow-unfollow-profile";
import { getProfilePosts } from "../../hooks/profiles/getProfilePosts";
import { localStorageUtil } from "../../utils/storageUtils";
// import "../../style/cards.css";

//TODO BK HELP - red lines, 
async function renderProfilepage() {
  const urlParams = new URLSearchParams(window.location.search);
  let profileName = urlParams.get("name");

  if (profileName === null) {
    const user: Profile | null = localStorageUtil.load("user");
    // console.log("user", user.data.name)
    if (user) {
      profileName = user.data.name;
    }
  }

  const profilePostResponse = await getProfilePosts(profileName);
  // console.log(profilePost)
  const profile = profilePostResponse.data[0].author;
  console.log(profile);

  const profileImgDiv = document.getElementById(
    "profile-img",
  ) as HTMLDivElement;

  profileImgDiv.classList.add("profile-img-div");
  const userImage = document.createElement("img") as HTMLImageElement;
  if (profile.avatar) {
    //TODO: default image wont work
    userImage.src = profile.avatar?.url;
    // ?? defaultUserImage;
    userImage.alt = profile.avatar?.alt ?? "No alt-text provided";
  }
  profileImgDiv.append(userImage);

  const profileNameElement = document.getElementById(
    "profile-name",
  ) as HTMLHeadingElement;
  profileNameElement.classList.add("profile-name");
  profileNameElement.textContent = profile.name;

  const profilePostsContainer = document.getElementById(
    "profile-posts-container",
  ) as HTMLDivElement;

  // const postParent = document.getElementById("post-parent") as HTMLElement;

  function displayProfilePosts(posts: Post[], postsParent: HTMLElement) {
    postsParent.innerHTML = "";
    posts.forEach((post: Post) => {
      createPost(post, postsParent);
    });
  }
  displayProfilePosts(profilePostResponse.data, profilePostsContainer);
}

renderProfilepage();
