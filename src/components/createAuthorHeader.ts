import type { RegisterResponse } from "../api/authService";
import { deletePost } from "../hooks/deletePost";
import type { Avatar } from "../pages/homePage/getPosts";
import { formatTime } from "../utils/formatTime";
import { localStorageUtil } from "../utils/storageUtils";
import { createModal } from "./modal";
import "../style/author-header.css"
import trashIcon from "../assets/trash.svg"

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

  const createdTime = formatTime(created);
  const createdTimeSpan = document.createElement("span");
  createdTimeSpan.classList.add("time");
  createdTimeSpan.textContent = createdTime;

  postHeaderTextDiv.append(authorP, createdTimeSpan);

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
    trashButton.classList.add("trash-btn")


    const optionsImg = document.createElement("img");
    optionsImg.src = trashIcon
    trashButton.append(optionsImg);

    // hamburgermenu.textContent = ;


    trashButton.addEventListener("click", (e) => {
      e.preventDefault();
      const heading = "Delete?";
      const message = `Do you want to delete this post? This is a permanent action`;
      const actionBtn = "Delete";
      createModal(heading, message, actionBtn, deletePost, id);
     
    });
    //help bk - problem with it not working
    postHeader.append(trashButton);
  }

  // hamburgermenu.setAttribute("aria-label", "Toggle post options");
  // hamburgermenu.setAttribute("aria-expanded", "false");
  // hamburgermenu.setAttribute("aria-controls", "main-nav-mob");

  //   const isExpanded = hamburgermenu.getAttribute("aria-expanded") === "true";
  //   hamburgermenu.setAttribute("aria-expanded", !isExpanded);
  //   navMenu.hidden = isExpanded;

  //   if (isExpanded) {
  //   hamburgerMenuNav.setAttribute("hidden", "");
  // } else {
  //   hamburgerMenuNav.removeAttribute("hidden");
  //   }

  return postHeader;
}
