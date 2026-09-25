import { getSinglePost } from "../../hooks/getSinglePost";
// import type { Post } from "../../hooks/getAllPosts";
import { createSinglePost } from "./createSinglePost";
// import { type PostWithComentsAndAuthor } from "./getSinglePost";
console.log("Post Page");

const urlParams = new URLSearchParams(window.location.search);
const postIdRaw = urlParams.get("id");

const postId = Number(postIdRaw);
const postParent = document.getElementById("post-parent") as HTMLElement;


const invalidNumber = Number.isNaN(postId);
if (!postIdRaw || invalidNumber) {
postParent.textContent = `Could not find post with ID ${postIdRaw}`
}

if (postIdRaw && !invalidNumber) {
  const result = await getSinglePost(postId);

  if (result.ok) {
    createSinglePost(result.value.data, postParent);
  } else {
    postParent.textContent = result.error.message;
  }
}


const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links") as HTMLUListElement;
const followingMobile = document.querySelector(
  "#following-container-mobile",
) as HTMLDivElement;
// const followingMob = document.querySelector("#following-container-mob") as HTMLDivElement
hamburger?.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "none" ? "flex" : "none";
  followingMobile.style.display =
    followingMobile.style.display === "none" ? "flex" : "none";
});

const profilePageLink = document.getElementById("profile-page-link");
profilePageLink?.setAttribute(
  "href",
  "../profilePage/profilePage.html",
);