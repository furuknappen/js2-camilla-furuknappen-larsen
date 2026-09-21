import type { Post } from "../hooks/getAllPosts";
import "../style/cards.css";
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

  // post.tags

  if (post.tags.length) {
    const tags = post.tags as string[];
    const tagPill = document.createElement("span");
    tags.forEach((tag) => {
      if (tag.includes(" ")) {
        const splitTags = tag.split(/\s+/).filter((t) => t.length > 0);
        splitTags.forEach((singleTag) => {
          const cleanTag = `#${singleTag.replace(/^#+/, " ")}`;
          tagPill.append(cleanTag + " ");
        });
      } else {
        const cleanTag = `#${tag.replace(/^#+/, " ")}`;
        tagPill.append(cleanTag + " ");
      }
    });
    tagDiv.append(tagPill);
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
  const contentDiv = document.createElement("a") as HTMLAnchorElement;

  contentDiv.href = `../postPage/singlePostPage.html?id=${post.id}`;

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
