import { getSinglePost } from "../homePage/getPosts";
import type { Post } from "../homePage/getPosts";
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

  // console.log(post)
  const postParent = document.getElementById("post-parent") as HTMLElement;
  console.log("get post contiinter", postParent);

  function displayPost(post: Post, postParent: HTMLElement) {
    createSinglePost(post, postParent);
   if(post.comments){
    console.log("has comments", post.comments)
   }
renderAuthor(post)

  }

  displayPost(post.data, postParent)


}

function renderAuthor(post: Post){
const author = post.author
console.log(author.name)
// const imgDiv = document.createElement("div")

// const image = document.getElementById("img")
// image.src = post.avatar?.url || null
//  FALLBACK_IMAGE


}
// function renderComments() {

// }