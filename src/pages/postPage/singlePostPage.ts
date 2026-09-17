import { getSinglePost } from "../../hooks/getSinglePost";
import type { Post } from "../../hooks/getAllPosts";
import { createSinglePost } from "./createSinglePost";
// import { type PostWithComentsAndAuthor } from "./getSinglePost";
console.log("Post Page");

const urlParams = new URLSearchParams(window.location.search);
const postIdRaw = urlParams.get("id");

const postId = Number(postIdRaw);

const invalidNumber = Number.isNaN(postId);
if (!postIdRaw || invalidNumber) {
  // print message later
  console.log("put in code the error");
}

if (postIdRaw && !invalidNumber ) {
  const post = await getSinglePost(postId);

  const postParent = document.getElementById("post-parent") as HTMLElement;


  function displayPost(post: Post, postParent: HTMLElement) {
    createSinglePost(post, postParent);
  }
  displayPost(post.data, postParent)
}
