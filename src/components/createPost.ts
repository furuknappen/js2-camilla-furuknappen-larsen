import type { Post } from "../pages/homePage/getPosts";
import "../style/cards.css";
import { createAuthorHeader } from "./createAuthorHeader";
import { createComment } from "./createCommentSection";


export function createPost(post: Post, postsParentContainer: HTMLElement) {
  const postContainer = document.createElement("a");
  postContainer.classList.add("post-container");
  postContainer.href = `../postPage/postPage.html?id=${post.id}`;

  const title = document.createElement("h2");
  title.textContent = post.title;

  const body = document.createElement("p");
  body.classList.add("body");
  body.textContent = post.body;
  // console.log(post.id, post._count.comments);
  const imgDiv = document.createElement("div") as HTMLDivElement;
  imgDiv.classList.add("imgDiv");

  const image = document.createElement("img") as HTMLImageElement;

  if (post.media?.url) {
    image.src = post.media?.url ?? null;
    image.alt = post.media?.alt ?? "No alt-text provided";
  }

  imgDiv.append(image);

  const inteactionContainer = document.createElement("div")
  inteactionContainer.classList.add("interaction-container")


 const commentsAmount= document.createElement("span") as HTMLSpanElement;
 commentsAmount.classList.add("comment-ammount")
  
  commentsAmount.textContent = `Comments: ${post._count.comments}`
inteactionContainer.append(commentsAmount)
  // console.log(post.reactions)

  const tagDiv = document.createElement("div");
  tagDiv.classList.add("tagDiv");
  /// TAGS
  if (post.tags.length) {
    const tags = post.tags;
    tags.forEach((tag) => {
      const tagPill = document.createElement("span");
      tagPill.textContent = `#${tag} `;
      tagDiv.append(tagPill);
    });

  }

  let postHeader1: HTMLDivElement = document.createElement("div");

  if (post.author) {
    postHeader1 = createAuthorHeader(
      post.author.avatar,
      post.author.name,
      post.created,
      // post.updated,
    );
  }
  postContainer.append(postHeader1, title, body, tagDiv, imgDiv, inteactionContainer);
  postsParentContainer.append(postContainer);

  if (post.comments) {
    const commentsContainer = document.createElement("section");
    createComment(post.comments, commentsContainer);
    postsParentContainer.append(commentsContainer);
  }
}


