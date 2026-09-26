import type { Post } from "../../types";
import "./singlePost.css";
import { createAuthorHeader } from "../../components/createAuthorHeader";
import { createComment } from "../../components/createCommentSection";
import { postComment } from "../../hooks/postComment";
import { deletePost } from "../../hooks/deletePost";

export function createSinglePost(
  post: Post,
  postsParentContainer: HTMLElement,
) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post-container");

  const title = document.createElement("h2");
  title.textContent = post.title;

  const body = document.createElement("p");
  body.classList.add("body");
  body.textContent = post.body;
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
  commentForm.classList.add("comment-form");
  const commentInput = document.createElement("input");
  commentInput.name = "comment";
  commentInput.type = "text";
  commentInput.placeholder = "Comment on this post...";

  const submitCommentBtn = document.createElement("button");
  submitCommentBtn.textContent = "Send";
  submitCommentBtn.type = "submit";

  commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const target = event.currentTarget as HTMLFormElement;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData) as unknown as { comment: string };

    if (data.comment == "") return;

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
    commentsContainer.classList.add("comment-section");
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
        parentWithChildrenDiv.classList.add("parent-children-div");

        parentWithChildrenDiv.append(commentDiv);

        commentsContainer.append(parentWithChildrenDiv);
      }
    });
  }
}
