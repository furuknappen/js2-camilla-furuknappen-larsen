import type { RegisterResponse } from "../../api/authService";
import { createPost } from "../../components/createPost";
import type { Post } from "../../types";
import { getProfilePosts } from "../../hooks/profiles/getProfilePosts";
import { localStorageUtil } from "../../utils/storageUtils";
import { getOneProfile } from "../../hooks/profiles/getOneProfile";

async function renderProfilepage() {
  const urlParams = new URLSearchParams(window.location.search);
  let profileName = urlParams.get("name");

  if (profileName === null) {
    const user: RegisterResponse | null = localStorageUtil.load("user");
    // console.log("user", user.data.name)
    if (user) {
      profileName = user.data.name;
    } else {
      return;
    }
  }

  const profilePostsContainer = document.getElementById(
    "profile-posts-container",
  ) as HTMLDivElement;

  const profileImgDiv = document.getElementById(
    "profile-img",
  ) as HTMLDivElement;

  const result = await getOneProfile(profileName);
  if (result.ok) {
    console.log("input", result.value.data);
    const profile = result.value.data;

    const bannerContainer = document.getElementById(
      "banner-container",
    ) as HTMLDivElement;

    const bannerImg = document.createElement("img") as HTMLImageElement;
    if (profile.banner) {
      bannerImg.src = profile.banner?.url;

      bannerImg.alt = profile.banner?.alt ?? "No alt-text provided";
    }

    bannerContainer.append(bannerImg);

    profileImgDiv.classList.add("profile-img-div");
    const userImage = document.createElement("img") as HTMLImageElement;

    if (profile.avatar) {
      userImage.src = profile.avatar?.url;

      userImage.alt = profile.avatar?.alt ?? "No alt-text provided";
    }
    profileImgDiv.append(userImage);

    const profileNameElement = document.getElementById(
      "profile-name",
    ) as HTMLHeadingElement;
    profileNameElement.classList.add("profile-name");
    profileNameElement.textContent = profile.name;

    // const postParent = document.getElementById("post-parent") as HTMLElement;
    const infoDiv = document.getElementById(
      "info-profile-div",
    ) as HTMLParagraphElement;
    const resultPost = await getProfilePosts(profileName);
    if (resultPost.ok) {
      if (resultPost.value.data.length == 0) {
        infoDiv.style.marginTop = "2rem";
        infoDiv.textContent = "This profile has no posts yet";
      }

      displayProfilePosts(resultPost.value.data, profilePostsContainer);
      function displayProfilePosts(posts: Post[], postsParent: HTMLElement) {
        postsParent.innerHTML = "";
        posts.forEach((post: Post) => {
          createPost(post, postsParent);
        });
      }
    } else {
      console.log("error1");
      infoDiv.textContent = resultPost.error.message;
    }
  } else {
    console.log("error2");
    profilePostsContainer.textContent = result.error.message;
  }
}

renderProfilepage();
