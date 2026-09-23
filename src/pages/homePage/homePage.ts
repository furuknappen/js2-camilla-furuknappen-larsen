import { type LoginResponse } from "../../api/authService";
// import { getAllPosts, type Post } from "../../hooks/getAllPosts";
// import "../../style/cards.css";
import { createPost } from "../../components/createPost";
// import "../style/cards.css";
import { getSearchResult } from "../../hooks/getSearchResult";
import { scrollToPosition, startScrollTracking } from "../../utils/scroll";
import { getAllPaginatedPosts } from "../../hooks/getpaginatedPosts";
import type { Post } from "../../types";
// import { getAllFollowingProfiles } from "../../hooks/profiles/getAllProfiles";
// import { localStorageUtil } from "../../utils/storageUtils";
startScrollTracking()
const userdata: LoginResponse = JSON.parse(
  localStorage.getItem("user") || "{}",
);
console.log(userdata);

// const following = await getAllFollowingProfiles(userdata.data.name)
// localStorageUtil.save("following", following)

const isLoggedIn: object = JSON.parse(
  sessionStorage.getItem("justLoggedIn") || "{}",
);
console.log(isLoggedIn);

const accessToken: object = JSON.parse(
  localStorage.getItem("accessToken") || "{}",
);
console.log("accessToken ", accessToken);

//mulighens false istedenfor !
if (!isLoggedIn) {
  window.location.href = "../login.html";
}

const postsParent = document.getElementById("posts-parent") as HTMLElement;
// const createpostBtn = document.getElementById("create-post-btn") as HTMLAnchorElement

console.log("homepage ts");
const postSearchField = document.getElementById(
  "post-search-field",
) as HTMLInputElement;

let noResultInfo: HTMLParagraphElement | null;

postSearchField?.addEventListener("input", async () => {
  if (postSearchField.value == "") {
    return;
  }
  noResultInfo?.remove();
  noResultInfo = null;

  const query = postSearchField.value.trim();

  const resultSearch = await getSearchResult(query);
  if (resultSearch.ok) {
 if (resultSearch.value.data.length === 0) {
    noResultInfo = document.createElement("p");
    noResultInfo.textContent = "";
    noResultInfo.textContent = `Found no posts is containing ${query}`;
    postSearchField.after(noResultInfo);
  }
  console.log(resultSearch.value.data);
  renderPosts(resultSearch.value.data);
  } else {
  const searchErrorDiv = document.getElementById("search-error-div") as HTMLDivElement
  searchErrorDiv.textContent = resultSearch.error.message;
  }
  
});

const result = await getAllPaginatedPosts();
  if (result.ok) {


 renderPosts(result.value.data);
  } else {
  postsParent.textContent = result.error.message;
  }



export function renderPosts(posts: Post[]) {
  postsParent.innerHTML = "";
  posts.forEach((post: Post) => {
    createPost(post, postsParent);
  });
  scrollToPosition()
}



const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-links") as HTMLUListElement
const followingMobile = document.querySelector("#following-container-mobile") as HTMLDivElement
// const followingMob = document.querySelector("#following-container-mob") as HTMLDivElement
hamburger?.addEventListener("click", ( ) => {
  navLinks.style.display = navLinks.style.display === "none" ? "flex" : "none"
  followingMobile.style.display = followingMobile.style.display === "none" ? "flex" : "none"
})

const profilePageLink = document.getElementById("profile-page-link")
profilePageLink?.setAttribute("href", "../profilePage/profilepage.html")

