import { createPost } from "../../components/createPost";
import { getSearchResult } from "../../hooks/getSearchResult";
import { scrollToPosition, startScrollTracking } from "../../utils/scroll";
import { getAllPaginatedPosts } from "../../hooks/getpaginatedPosts";
import type { Post } from "../../types";
import { localStorageUtil } from "../../utils/storageUtils";
import { logOut } from "../../utils/logOut";

startScrollTracking();

const accessToken = localStorageUtil.load("accessToken");

if (!accessToken) {
  window.location.href =
    "/js2-camilla-furuknappen-larsen/src/pages/loginPage/login.html";
}

const postsParent = document.getElementById("posts-parent") as HTMLElement;

const postSearchField = document.getElementById(
  "post-search-field",
) as HTMLInputElement;
const searchErrorDiv = document.getElementById(
      "search-error-div",
    ) as HTMLDivElement;

postSearchField?.addEventListener("input", async () => {
  if (postSearchField.value === "") {
    return;
  }   
  searchErrorDiv.textContent=""

  const query = postSearchField.value.trim();

  const resultSearch = await getSearchResult(query);
  if (resultSearch.ok) {
    if (resultSearch.value.data.length === 0) {
      searchErrorDiv.textContent = "";
      searchErrorDiv.textContent = `Found no posts is containing ${query}`;
      postSearchField.after(searchErrorDiv);

      if(postSearchField.value.length === 0 ){
      searchErrorDiv.textContent = ""
      }
    }

    renderPosts(resultSearch.value.data);
  } else {
    const searchErrorDiv = document.getElementById(
      "search-error-div",
    ) as HTMLDivElement;
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
  scrollToPosition();
}


const profilePageLink = document.getElementById("profile-page-link");
profilePageLink?.setAttribute(
  "href",
  "/js2-camilla-furuknappen-larsen/src/pages/profilePage/profilePage.html",
);

logOut();
