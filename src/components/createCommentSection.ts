import { postComment } from "../hooks/postComment";
import type { Comment } from "../pages/homePage/getPosts";
import { createAuthorHeader } from "./createAuthorHeader";
import "../style/comment-section.css"

//BK commenten appender feil
export function createComment(comment: Comment): HTMLDivElement {
  const commentDiv = document.createElement("div") as HTMLDivElement;
  commentDiv.id = comment.id.toString();
  // commentDiv.classList.add("comment-div");
        // commentDiv.classList.add("comment-directly-on-post");
  const commentBody = document.createElement("p");
  commentBody.classList.add("comment-body");
  commentBody.textContent = comment.body;
  const header = createAuthorHeader(
    comment.author.avatar,
    comment.author.name,
    comment.created,
  );
  // comment.author, commentDiv, authorCommentP
  // commentDiv.append(authorImgCommentDiv);
  const replyBtn = document.createElement("button") as HTMLButtonElement;
  replyBtn.classList.add("reply-btn")
  replyBtn.textContent = "Reply";
  const replyDiv = document.createElement("div"); 
  replyDiv.classList.add("reply-comment") 
  if (comment.replyToId) {
    commentDiv.classList.add("reply-div");


    // commentDiv.append(header, commentBody, replyBtn);
// const thread = document.createElement("div")
// thread.classList.add("thread")
    replyDiv.append(header, commentBody, replyBtn);

    commentDiv.append(replyDiv);
  } else {
    commentDiv.append(header, commentBody, replyBtn);
  }

  replyBtn.addEventListener("click", (event) => {
    event.preventDefault();
    replyBtn.style.display = "none";

    const commentForm = document.createElement("form");
    commentForm.classList.add("comment-form")
    const commentInput = document.createElement("input");
    commentInput.name = "comment";
    commentInput.type = "text";
    commentInput.placeholder = `write a comment to ${comment.author.name}`

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

        await postComment(
        data.comment,
        comment.postId,
        comment.id,
      );
      window.location.reload();
    });
  });

  return commentDiv;
}
