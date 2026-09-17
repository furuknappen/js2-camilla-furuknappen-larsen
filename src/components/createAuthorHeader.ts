import type { RegisterResponse } from "../api/authService";
import { deletePost } from "../hooks/deletePost";
import type { Avatar } from "../hooks/getAllPosts";
import { formatTime } from "../utils/formatTime";
import { localStorageUtil } from "../utils/storageUtils";
import { createModal } from "./modal";
import "../style/author-header.css";
import trashIcon from "../assets/trash.svg";
import {
  followProfile,
  unfollowProfile,
  type FollowProfileResponse,
  type Profile,
} from "../hooks/profiles/follow-unfollow-profile";
// import { getAllProfiles } from "../hooks/profiles/getAllProfiles";
// import {following } from "../pages/homePage/homePage";

// const following:string[] = []
// localStorageUtil.save("following", following)
// console.log(localStorageUtil.load("following"))

export function createAuthorHeader(
  avatar: Avatar,
  name: string,
  created: string,
  id?: number,
  updated?: string,
): HTMLDivElement {
  const postHeader = document.createElement("div");
  postHeader.classList.add("post-header");

  const authorImgDiv = document.createElement("div");
  authorImgDiv.classList.add("avatar");
  const userImage = document.createElement("img") as HTMLImageElement;
  if (avatar) {
    //TODO: default image wont work
    userImage.src = avatar?.url;
    // ?? defaultUserImage;
    userImage.alt = avatar?.alt ?? "No alt-text provided";
  }
  authorImgDiv.append(userImage);

  const postHeaderTextDiv = document.createElement("div");
  postHeaderTextDiv.classList.add("post-header-text");

  const authorP = document.createElement("p");
  authorP.classList.add("header-author");
  authorP.textContent = name;
  const titleFollowDiv = document.createElement("div");
  const followBtn = document.createElement("button");
  followBtn.textContent = "Follow";
  let isFollowing: boolean = false;


  const getfollowing: FollowProfileResponse | null = localStorageUtil.load("following");
  if (getfollowing) {
    const followingArray = getfollowing.data.following;

    const followedProfile = followingArray.some(
      (e: Profile) => e.name === name,
    );
    if (followedProfile) {
      isFollowing = true;
      followBtn.textContent = "Unfollow";
    }
  }

  followBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    await followProfile(name);
    isFollowing = !isFollowing;
    followBtn.textContent = isFollowing ? "Unfollow" : "Follow";

    if (isFollowing) {
      await unfollowProfile(name);
    }
  });

  const createdTime = formatTime(created);
  const createdTimeSpan = document.createElement("span");
  createdTimeSpan.classList.add("time");
  createdTimeSpan.textContent = createdTime;
  titleFollowDiv.append(authorP, followBtn);
  postHeaderTextDiv.append(titleFollowDiv, createdTimeSpan);

  if (updated && updated !== created) {
    const editedTime = formatTime(updated);
    const updatedTimeSpan = document.createElement("span");
    updatedTimeSpan.classList.add("time");
    updatedTimeSpan.textContent = `Updated: ${editedTime}`;
    postHeaderTextDiv.append(updatedTimeSpan);
  }

  postHeader.append(authorImgDiv, postHeaderTextDiv);

  const user: RegisterResponse | null = localStorageUtil.load("user");

  if (user?.data.name == name) {
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");

    const optionsImg = document.createElement("img");
    optionsImg.src = trashIcon;
    trashButton.append(optionsImg);

    trashButton?.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLElement;
      if (!target?.closest(".comment-section")) {
        e.preventDefault();

        const heading = "Delete?";
        const message = `Do you want to delete this post? This is a permanent action`;
        const actionBtn = "Delete";
        createModal(heading, message, actionBtn, deletePost, id);
        // window.location.href = "../homePage/homePage.html";
        // redirectToHomepage()
      }
    });

    const commentSection = document.querySelector(".comment-section");
    commentSection?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const trashBtn = target.closest(".trash-btn");
      if (trashBtn) {
        const heading = "Delete?";
        const message = `Do you want to delete this comment and all potensial replies? This is a permanent action`;
        const actionBtn = "Delete";
        createModal(
          heading,
          message,
          actionBtn,
          deletePost,
          id,
          redirectToHomepage,
        );
        // redirectToHomepage()
      }
    });

    postHeader.append(trashButton);
  }

  return postHeader;
}

export function redirectToHomepage() {
  window.location.href = "../homePage/homePage.html";
}
