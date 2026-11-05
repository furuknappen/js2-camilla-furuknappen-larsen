import type { Post } from "../../types";
import { createAuthorHeader } from "../../components/createAuthorHeader";
import { createComment } from "../../components/createCommentSection";
import { postComment } from "../../hooks/postComment";
import { deletePost } from "../../hooks/deletePost";
import { cleanUpTags } from "../../utils/cleanUpTags";

export function createSinglePost(
  post: Post,
  postsParentContainer: HTMLElement,
) {
  const postContainer = document.createElement("div");
  postContainer.classList.add(
    "block",
    "mb-6",
    "mt-6",
    "bg-background", "dark:bg-background-dark",
    "border-b",
    "border-line-light", "dark:border-line-dark",

    "md:pt-4",
    "md:mt-24",
    "md:border",
    "md:rounded-xl",
  );

  const title = document.createElement("h2");
  title.classList.add(
    "mx-6",
    "mb-2",
    "text-lg",
    "font-semibold",
    "md:mx-8",
    "font-arial",
    "tracking-wide"
  );
  title.textContent = post.title;

  const body = document.createElement("p");
  body.classList.add(
    "mx-6",
    "mb-2",
    "pb-4",
    "md:mx-8",
    "font-arial",
    "tracking-wide"
  );
  body.textContent = post.body;
  const imgDiv = document.createElement("div") as HTMLDivElement;

  const image = document.createElement("img") as HTMLImageElement;
  image.classList.add("w-full", "flex");

  if (post.media?.url) {
    image.src = post.media?.url ?? null;
    image.alt = post.media?.alt ?? "No alt-text provided";
  }

  imgDiv.append(image);
  const tagDiv = document.createElement("div");
  tagDiv.classList.add("mx-6", "m-4", "text-secondary-text");

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
          postContainer.append(result.error.message);
        }
      },
      post,
      post.updated,
      "../profilePage/profilePage.html",
    );
  }

  postContainer.append(postHeader1, title, body, tagDiv, imgDiv);
  postsParentContainer.append(postContainer);

  const commentForm = document.createElement("form");
  commentForm.classList.add(
    "bg-transparent",
    "mb-4",
    "flex",
    "mx-4",
    "gap-2",
    "text-black-900",
  );
  const commentInput = document.createElement("input");
  commentInput.classList.add("input-field", "flex", "flex-1", "pl-4");
  commentInput.name = "comment";
  commentInput.type = "text";
  commentInput.placeholder = "Comment on this post...";

  const submitCommentBtn = document.createElement("button");
  submitCommentBtn.classList.add(
    "bg-primary",
    "rounded-lg",
    "px-3",
    "text-gray-100",
  );
  submitCommentBtn.textContent = "Send";
  submitCommentBtn.type = "submit";

  commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const target = event.currentTarget as HTMLFormElement;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData) as unknown as { comment: string };

    if (data.comment === "") return;

    const result = await postComment(data.comment, post.id);

    if (result.ok) {
      window.location.reload();
    } else {
      commentForm.append(result.error.message);
    }
  });

  commentForm.append(commentInput, submitCommentBtn);
  postsParentContainer.append(commentForm);

  if (post.comments) {
    const commentsContainer = document.createElement("section");
    postsParentContainer.append(commentsContainer);
    post.comments.forEach((comment) => {
      const commentDiv = createComment(comment);

      if (comment.replyToId) {
        const parentComment = document.getElementById(comment.replyToId);
        if (parentComment) {
          parentComment.append(commentDiv);
        }
      } else {
        const parentWithChildrenDiv = document.createElement("div");
        parentWithChildrenDiv.classList.add(
          "border-b",
          "border-line-light", "dark:border-line-dark",
          "mb-4",
          "pb-2",
        );

        parentWithChildrenDiv.append(commentDiv);

        commentsContainer.append(parentWithChildrenDiv);
      }
    });
  }
}
