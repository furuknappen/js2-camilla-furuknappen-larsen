import { postComment } from "../hooks/postComment";
import type { Comment } from "../types";
import { createAuthorHeader } from "./createAuthorHeader";
import "../style/comment-section.css";
import { deleteComment } from "../hooks/deleteComment";

export function createComment(comment: Comment): HTMLDivElement {
  const commentDiv = document.createElement("div") as HTMLDivElement;
  commentDiv.id = comment.id.toString();
  // commentDiv.classList.add("comment-div");
  // commentDiv.classList.add("comment-directly-on-post");
  const commentBody = document.createElement("p");
  commentBody.classList.add("comment-body");
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
        //TODO: BK hvor kan jeg henge denne?
        // .textContent = result.error.message;
      }
    },
    undefined,
    undefined,
    "../profilePage/profilePage.html"
  );


  const replyBtn = document.createElement("button") as HTMLButtonElement;
  replyBtn.classList.add("reply-btn");
  replyBtn.textContent = "Reply";
  const replyDiv = document.createElement("div");
  replyDiv.classList.add("reply-comment");
  if (comment.replyToId) {
    commentDiv.classList.add("reply-div");
  
    replyDiv.append(header, commentBody, replyBtn);
    commentDiv.append(replyDiv);
  } else {
    commentDiv.append(header, commentBody, replyBtn);
  }

  replyBtn.addEventListener("click", (event) => {
    event.preventDefault();
    replyBtn.style.display = "none";

    const commentForm = document.createElement("form");
    commentForm.classList.add("commentform");
    const commentInput = document.createElement("input");
    commentInput.name = "comment";
    commentInput.type = "text";
    commentInput.placeholder = `write a comment to ${comment.author.name}`;

    const submitCommentBtn = document.createElement("button");
    submitCommentBtn.textContent = "Send";
    submitCommentBtn.type = "submit";

    commentForm.append(commentInput, submitCommentBtn);

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

      if (data.comment == "") return;

      await postComment(data.comment, comment.postId, comment.id);
      window.location.reload();
    });
  });

  return commentDiv;
}
