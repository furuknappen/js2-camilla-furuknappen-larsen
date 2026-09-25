import { deletePost } from "../hooks/deletePost";
import type { Post } from "../types";
import "../style/cards.css";
import { cleanUpTags } from "../utils/cleanUpTags";
import { createAuthorHeader } from "./createAuthorHeader";
import { createComment } from "./createCommentSection";

export function createPost(post: Post, postsParentContainer: HTMLElement) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post-container");

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

  const inteactionContainer = document.createElement("div");
  inteactionContainer.classList.add("interaction-container");

  const commentsAmount = document.createElement("span") as HTMLSpanElement;
  commentsAmount.classList.add("comment-ammount");

  commentsAmount.textContent = `Comments: ${post._count.comments}`;
  inteactionContainer.append(commentsAmount);
  // console.log(post.reactions)

  const tagDiv = document.createElement("div");
  tagDiv.classList.add("tagDiv");
  /// TAGS

  if (post.tags.length) {
    const tags = cleanUpTags(post.tags);
    tagDiv.append(tags);
  }

  let postHeader1: HTMLDivElement = document.createElement("div");
  if (post.author) {
    postHeader1 = createAuthorHeader(
      post.author.avatar,
      post.author.name,
      post.created,
      async () => {
        const result = await deletePost(post.id);
        if (result.ok) {
          return;
        } else {
          postContainer.before(result.error.message);
        }
      },
      post,
      undefined,
      "/js2-camilla-furuknappen-larsen/src/pages/profilePage/profilePage.html",
    );
  }
  const contentDiv = document.createElement("a") as HTMLAnchorElement;

  contentDiv.href = `/js2-camilla-furuknappen-larsen/src/pages/postPage/singlePostPage.html?id=${post.id}`;

  contentDiv.append(title, body, tagDiv, imgDiv);
  postContainer.append(postHeader1, contentDiv, inteactionContainer);
  postsParentContainer.append(postContainer);

  if (post.comments) {
    const commentsContainer = document.createElement("section");
    post.comments.forEach((comment) => {
      createComment(comment);
    });

    postsParentContainer.append(commentsContainer);
  }
}
