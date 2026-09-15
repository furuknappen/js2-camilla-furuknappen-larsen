import { type LoginResponse } from "../../api/authService";
import { getAllPosts} from "./getPosts";
// import "../../style/cards.css";
import { createPost } from "../../components/createPost";
import {
  getSearchResult,
  type PostNoComments,
} from "../../hooks/getSearchResult";
const postsParent = document.getElementById("posts-parent") as HTMLElement;
console.log("homepage ts");
const userdata: LoginResponse = JSON.parse(
  localStorage.getItem("user") || "{}",
);
console.log(userdata);

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

// const createpostBtn = document.getElementById("create-post-btn") as HTMLAnchorElement

const postSearchField = document.getElementById(
  "post-search-field",
) as HTMLInputElement;

let noResultInfo: HTMLParagraphElement | null


postSearchField?.addEventListener("input", async () => {
  if ((postSearchField.value == "")) {
    return;
  }
  noResultInfo?.remove()
  noResultInfo = null;

  const query = postSearchField.value.trim();
  console.log("search: ", query);

  const response = await getSearchResult(query);
  
  

  if(response.data.length === 0) {
    noResultInfo = document.createElement("p")
    noResultInfo.textContent = ""
    noResultInfo.textContent = `Found no posts is containing ${query}`
    postSearchField.after(noResultInfo)
  }
  console.log(response.data);

  renderPosts(response.data);
});


console.log(postsParent);
const allPosts = await getAllPosts();

function renderPosts(posts: PostNoComments[]) {
  postsParent.innerHTML = "";
  return posts.forEach((post: PostNoComments) => {
    createPost(post, postsParent);
  });
}

renderPosts(allPosts.data);
