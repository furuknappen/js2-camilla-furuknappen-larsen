import type { RegisterResponse } from "../api/authService";
import type { Avatar } from "../types";
import type { Post } from "../types";
import { formatTime } from "../utils/formatTime";
import { localStorageUtil } from "../utils/storageUtils";
import { createModal } from "./modal";
import "../style/author-header.css";
import trashIcon from "../assets/trash.svg";
import editIcon from "../assets/edit.svg";
import {
  unfollowProfile,
  type FollowProfileResponse,
  type Profile,
} from "../hooks/profiles/unfollowProfile";
import { followProfile } from "../hooks/profiles/followProfile";
import { renderFollowingSection } from "./asideFollowing";
import { renderEditModal } from "./renderEditModal";

// import { getAllProfiles } from "../hooks/profiles/getAllProfiles";
// import {following } from "../pages/homePage/homePage";

// const following:string[] = []
// localStorageUtil.save("following", following)

export function createAuthorHeader(
  avatar: Avatar,
  name: string,
  created: string,
  actionBtnFunction: () => void | Promise<void>,
  post?: Post,
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

  const authorP = document.createElement("a");
  authorP.classList.add("header-author");
  authorP.textContent = name;
  authorP.href = `../profilePage/profilePage.html?name=${name}`;

  const titleFollowDiv = document.createElement("div");
  const followBtn = document.createElement("button");
  followBtn.classList.add("follow-btn")
  followBtn.textContent = "Follow";
  let isFollowing: boolean = false;

  const getfollowing: FollowProfileResponse | null =
    localStorageUtil.load("following");
  if (getfollowing && getfollowing.data) {
    const followingArray = getfollowing.data.following;

    const followedProfile = followingArray.some(
      (e: Profile) => e.name === name,
    );
    if (followedProfile) {
      isFollowing = true;
      followBtn.textContent = "Unfollow";
    }
  }
  //TODO: gjør at alle postnene fra en user updater followknappen når den trukkes på en
  followBtn.addEventListener("click", async (e) => {
    console.log("isfollowing?", isFollowing);
    e.preventDefault();

    isFollowing = !isFollowing;

    followBtn.textContent = isFollowing ? "Unfollow" : "Follow";
    console.log("isfollowing??", isFollowing);
//TODO: BK den refresher hele siden ved error
    if (isFollowing) {
      const result = await followProfile(name);
       if (result.ok) {
      return result.value
  } else {
   followBtn.after(result.error.message);
  }
    } else {
      const result = await unfollowProfile(name);
        if (result.ok) {
          return;
        } else {
    followBtn.after(result.error.message)
        }
    }
    
    const followingArray =
      localStorageUtil.load<FollowProfileResponse>("following")?.data.following;

    if (followingArray) {
      renderFollowingSection();
    }
    window.location.reload()
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

    const trashImg = document.createElement("img");
    trashImg.src = trashIcon;
    trashButton.append(trashImg);

    trashButton.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;

      if (!target?.closest(".comment-section")) {
        const heading = "Delete?";
        const message = `Do you want to delete this post? This is a permanent action`;
        const actionBtn = "Delete";
        createModal(heading, message, actionBtn, actionBtnFunction, () => {window.location.href = "../homePage/homePage.html"});
      }
    else{
        const heading = "Delete?";
        const message = `Do you want to delete this comment and all potensial replies? This is a permanent action`;
        const actionBtn = "Delete";
        createModal(
          heading,
          message,
          actionBtn,
          actionBtnFunction,
          () => {window.location.reload()}
        );
      }
    });

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    const editImg = document.createElement("img");
    editImg.src = editIcon;
    editButton.append(editImg);

    editButton?.addEventListener("click", () => {
      // e.preventDefault()
      if(post){
        renderEditModal(post);
      }
    })
    postHeader.append(editButton, trashButton);
  }

  return postHeader;
}
