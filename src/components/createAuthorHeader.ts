import type { Avatar } from "../pages/homePage/getPosts";
import { formatTime } from "../utils/formatTime";

export function createAuthorHeader(
  avatar: Avatar,
  name: string,
  created: string,
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
  return postHeader;
}
