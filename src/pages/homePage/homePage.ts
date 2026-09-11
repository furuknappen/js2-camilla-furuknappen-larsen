import { type LoginResponse } from "../../api/authService";
import { getAllPosts, type Post } from "./getPosts";
// import "../../style/cards.css";
import { createPost } from "../../components/createPost"

console.log("homepage ts");
;

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

const postsParent = document.getElementById("posts-parent") as HTMLElement;
console.log(postsParent);
const allPosts = await getAllPosts();


function renderPosts(posts: Post[]) {
  return posts.forEach((post: Post) => {
    createPost(post, postsParent);
  });
}

renderPosts(allPosts.data);

