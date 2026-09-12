import type { Post } from "../homePage/getPosts";
// import "../style/cards.css";
import "./singlePost.css"
import { createAuthorHeader } from "../../components/createAuthorHeader";
import { createCommentSection } from "../../components/createCommentSection";

/// SINGLE POST
export function createSinglePost(post: Post, postsParentContainer: HTMLElement) {
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
      post.updated,
    );
  }
  postContainer.append(postHeader1, title, body, tagDiv, imgDiv);
  postsParentContainer.append(postContainer);

  if (post.comments) {
    const commentsContainer = document.createElement("section");
    createCommentSection(post.comments, commentsContainer);
    postsParentContainer.append(commentsContainer);
  }
}

