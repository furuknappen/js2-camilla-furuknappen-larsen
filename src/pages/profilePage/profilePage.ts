import type { RegisterResponse } from "../../api/authService";
import { createPost } from "../../components/createPost";
import type { Post } from "../../types";
import { getProfilePosts } from "../../hooks/profiles/getProfilePosts";
import { localStorageUtil } from "../../utils/storageUtils";
import { getOneProfile } from "../../hooks/profiles/getOneProfile";
import { logOut } from "../../utils/logOut";

const accessToken = localStorageUtil.load("accessToken");

if (!accessToken) {
  window.location.href =
    "/js2-camilla-furuknappen-larsen/src/pages/loginPage/login.html";
}

async function renderProfilepage() {
  const urlParams = new URLSearchParams(window.location.search);
  let profileName = urlParams.get("name");

  if (profileName === null) {
    const user: RegisterResponse | null = localStorageUtil.load("user");
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
    const profile = result.value.data;

    const bannerContainer = document.getElementById(
      "banner-container",
    ) as HTMLDivElement;

    const bannerImg = document.createElement("img") as HTMLImageElement;
    bannerImg.classList.add("w-full", "md:h-72", "md:rounded-xl");
    if (profile.banner) {
      bannerImg.src = profile.banner?.url;

      bannerImg.alt = profile.banner?.alt ?? "No alt-text provided";
    }

    bannerContainer.append(bannerImg);

    const userImage = document.createElement("img") as HTMLImageElement;
    userImage.classList.add(
      "w-20",
      "aspect-square",
      "object-cover",
      "border-5",
      "border-background-light", "dark:border-background-dark",
      "rounded-full",
      "lg:w-28",
    );
    if (profile.avatar) {
      userImage.src = profile.avatar?.url;

      userImage.alt = profile.avatar?.alt ?? "No alt-text provided";
    }
    profileImgDiv.append(userImage);

    const profileNameElement = document.getElementById(
      "profile-name",
    ) as HTMLHeadingElement;
    profileNameElement.textContent = profile.name;

    const infoDiv = document.getElementById(
      "info-profile-div",
    ) as HTMLParagraphElement;
    const resultPost = await getProfilePosts(profileName);
    if (resultPost.ok) {
      if (resultPost.value.data.length === 0) {
        infoDiv.classList.add("mt-8");
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
      infoDiv.textContent = resultPost.error.message;
    }
  } else {
    profilePostsContainer.textContent = result.error.message;
  }
}


renderProfilepage();
logOut();
