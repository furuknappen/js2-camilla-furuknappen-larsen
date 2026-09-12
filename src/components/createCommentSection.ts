import type { Comment } from "../pages/homePage/getPosts";
import { createAuthorHeader } from "./createAuthorHeader";

export function createCommentSection(
  comments: Comment[],
  commentsContainer: HTMLElement,
) {
  comments.forEach((comment) => {
    const commentDiv = document.createElement("div") as HTMLDivElement;
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
    commentDiv.append(header, commentBody);

    // console.log("has comments to create", comment.body);
    commentsContainer.append(commentDiv);
  });

  //?
  return commentsContainer;
}
