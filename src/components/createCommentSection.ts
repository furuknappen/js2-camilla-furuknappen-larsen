import { postComment } from "../hooks/postComment";
import type { Comment } from "../types";
import { createAuthorHeader } from "./createAuthorHeader";
import { deleteComment } from "../hooks/deleteComment";

export function createComment(comment: Comment): HTMLDivElement {
  const commentDiv = document.createElement("div") as HTMLDivElement;
  commentDiv.id = comment.id.toString();

  const commentBody = document.createElement("p");
  commentBody.classList.add("my-2", "ml-12", "lg:my-0");
  commentBody.textContent = comment.body;
  const header = createAuthorHeader(
    comment.author?.avatar,
    comment.author.name,
    comment.created,
    async () => {
      const result = await deleteComment(comment.postId, comment.id);
      if (result.ok) {
        return result.value;
      } else {
        const postParentDiv = document.getElementById(
          "post-parent",
        ) as HTMLDivElement;
        postParentDiv.textContent = result.error.message;
      }
    },
    undefined,
    undefined,
    "../profilePage/profilePage.html",
  );

  const replyBtn = document.createElement("button") as HTMLButtonElement;
  replyBtn.classList.add("text-secondary-text", "mb-3", "ml-12");
  replyBtn.textContent = "Reply";
  const replyDiv = document.createElement("div");
  if (comment.replyToId) {
    commentDiv.classList.add("ml-8");
    replyDiv.append(header, commentBody, replyBtn);
    commentDiv.append(replyDiv);
  } else {
    commentDiv.append(header, commentBody, replyBtn);
  }

  replyBtn.addEventListener("click", (event) => {
    event.preventDefault();
    replyBtn.classList.add("hidden");

    const commentForm = document.createElement("form");
    commentForm.classList.add("flex", "justify-center", "m-4");

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("text-secondary-text", "ml-2");

    cancelButton.addEventListener("click", (e) => {
      e.preventDefault();
      commentForm.remove();
      replyBtn.classList.remove("hidden");
    });

    const commentInput = document.createElement("input");
    commentInput.classList.add("input-field", "flex-1");
    commentInput.name = "comment";
    commentInput.type = "text";
    commentInput.placeholder = `Write a comment to ${comment.author.name}`;

    const submitCommentBtn = document.createElement("button");
    submitCommentBtn.textContent = "Send";
    submitCommentBtn.type = "submit";
    submitCommentBtn.classList.add(
      "px-4",
      "md:text-xl",
      "bg-primary",
      "text-light",
      "rounded-xl",
      "md:px-8",
      "py-2",
      "ml-2",
    );
    commentForm.append(commentInput, cancelButton, submitCommentBtn);

    if (comment.replyToId) {
      commentBody.after(commentForm);
    } else {
      commentBody.after(commentForm);
    }

    commentForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const target = event.currentTarget as HTMLFormElement;
      const formData = new FormData(target);
      const data = Object.fromEntries(formData) as unknown as {
        comment: string;
      };

      if (data.comment === "") return;

      await postComment(data.comment, comment.postId, comment.id);
      window.location.reload();
    });
  });

  return commentDiv;
}
