import { postComment } from "../hooks/postComment";
import type { Comment } from "../pages/homePage/getPosts";
import { createAuthorHeader } from "./createAuthorHeader";
//BK commenten appender feil
export function createComment(
  comment: Comment,
): HTMLDivElement {
  const commentDiv = document.createElement("div") as HTMLDivElement;
  commentDiv.id = comment.id.toString()
  commentDiv.classList.add("comment-div");

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
  replyBtn.textContent = "Reply";
const replyDiv = document.createElement("div")
  if (comment.replyToId) {
    commentDiv.classList.add("reply-comment")
      
    replyDiv.append(header, commentBody, replyBtn);

    commentDiv.append(replyDiv)
  }

else{
  commentDiv.append(header, commentBody, replyBtn);
  }




  replyBtn.addEventListener("click", (event) => {
    event.preventDefault();
    replyBtn.style.display = "none";

    const commentForm = document.createElement("form");
    const commentInput = document.createElement("input");
    commentInput.name = "comment";
    commentInput.type = "text";

    const submitCommentBtn = document.createElement("button");
    submitCommentBtn.textContent = "Send";
    submitCommentBtn.type = "submit";

    commentForm.append(commentInput, submitCommentBtn);

    if(comment.replyToId){

      replyDiv.append(commentForm)
      commentDiv.append(replyDiv)
    }
 else{
     commentDiv.append(commentForm);
 }
 

    commentForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const target = event.currentTarget as HTMLFormElement;
      const formData = new FormData(target);
      const data = Object.fromEntries(formData) as unknown as {
        comment: string;
      };

      if (data.comment == "") return;

      const response = await postComment(data.comment,comment.postId, comment.id);
      window.location.reload();

    });
  });

  return commentDiv;
}
