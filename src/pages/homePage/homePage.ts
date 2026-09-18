import { type LoginResponse } from "../../api/authService";
import { getAllPosts, type Post} from "../../hooks/getAllPosts";
// import "../../style/cards.css";
import { createPost } from "../../components/createPost";
import {
  getSearchResult,
} from "../../hooks/getSearchResult";
import { getAllFollowingProfiles } from "../../hooks/profiles/getAllProfiles";
import { localStorageUtil } from "../../utils/storageUtils";

const userdata: LoginResponse = JSON.parse(
  localStorage.getItem("user") || "{}",
);
console.log(userdata);

const following = await getAllFollowingProfiles(userdata.data.name)
localStorageUtil.save("following", following)



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

let noResultInfo: HTMLParagraphElement | null


postSearchField?.addEventListener("input", async () => {
  if ((postSearchField.value == "")) {
    return;
  }
  noResultInfo?.remove()
  noResultInfo = null;

  const query = postSearchField.value.trim();


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


const allPosts = await getAllPosts();

function renderPosts(posts: Post[]) {
  postsParent.innerHTML = "";
  posts.forEach((post: Post) => {
    createPost(post, postsParent );
  });
}

renderPosts(allPosts.data );
