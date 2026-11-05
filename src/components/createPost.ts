import { deletePost } from "../hooks/deletePost";
import type { Post } from "../types";
// import "../style/cards.css";
import { cleanUpTags } from "../utils/cleanUpTags";
import { createAuthorHeader } from "./createAuthorHeader";
import { createComment } from "./createCommentSection";

/**
 * Creates a post, used on multiple pages
 * @param post
 * @param postsParentContainer
 */
export function createPost(post: Post, postsParentContainer: HTMLElement) {
  const postContainer = document.createElement("div");
  postContainer.classList.add(
    "container",
    "block",
    "mb-2",
    "bg-background", "dark:bg-background-dark",
    "border-t-1",
    "border-line-light", "dark:border-line-dark",
    "text-dark-text", "dark:text-light-text",
    "pt-4",
    "md:pt-4",
    "md:rounded-xl",
    "md:border",
    "md:border-line-light", "dark:border-line-dark",
    "lg:max-w-150",
    "2xl:max-w-200",
  );

  const title = document.createElement("h2");
  title.textContent = post.title;
  title.classList.add(
    "mx-6",
    "text-lg",
    "font-semibold",
    "mb-2",
    "font-arial",
    "tracking-wide",
  
  );

  const body = document.createElement("p");
  body.classList.add(
    "body",
    "mx-6",
    "pb-1",
    "wrap-break-word",
    "font-arial",
    "tracking-wide",
  
  );
  body.textContent = post.body;

  const imgDiv = document.createElement("div") as HTMLDivElement;
  imgDiv.classList.add("mt-3");

  const image = document.createElement("img") as HTMLImageElement;
  image.classList.add("w-full", "flex");

  if (post.media?.url) {
    image.src = post.media?.url ?? null;
    image.alt = post.media?.alt ?? "No alt-text provided";
  }

  imgDiv.append(image);

  const inteactionContainer = document.createElement("div");
  inteactionContainer.classList.add("flex", "justify-end", "mx-6");

  const commentsAmount = document.createElement("span") as HTMLSpanElement;
  commentsAmount.classList.add(
    "text-secondary-text",
    "px-4",
    "py-2",
    "md:mb-2",
  );

  commentsAmount.textContent = `Comments: ${post._count.comments}`;
  inteactionContainer.append(commentsAmount);

  const tagDiv = document.createElement("div");
  tagDiv.classList.add("mx-6", "mt-2", "text-secondary-text");

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
