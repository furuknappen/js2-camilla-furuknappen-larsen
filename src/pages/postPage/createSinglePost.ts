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
  postContainer.classList.add("post-container",
    "block", "mb-6", "mt-6", "bg-white", "border-b", "border-gray-300",
    
    "md:pt-4", "md:mt-24", "md:border", "md:rounded-xl");

  const title = document.createElement("h2");
  title.classList.add("mx-6", "mb-2", "text-xl", "md:mx-8" )
  title.textContent = post.title;

  const body = document.createElement("p");
  body.classList.add("mx-6", "mb-2", "pb-4", "md:mx-8"  );
  body.textContent = post.body;
  const imgDiv = document.createElement("div") as HTMLDivElement;
  imgDiv.classList.add("imgDiv");

  const image = document.createElement("img") as HTMLImageElement;
  image.classList.add("w-full", "flex")

  if (post.media?.url) {
    image.src = post.media?.url ?? null;
    image.alt = post.media?.alt ?? "No alt-text provided";
  }

  imgDiv.append(image);
  const tagDiv = document.createElement("div");
  tagDiv.classList.add("tagDiv", "mx-6", "m-4", "text-gray-500");

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
  commentForm.classList.add("comment-form","bg-transparent", "mb-4", "flex", "mx-4", "gap-2", "text-black-900");
  const commentInput = document.createElement("input");
  commentInput.classList.add("input-field", "flex", "flex-1", "pl-4" )
  commentInput.name = "comment";
  commentInput.type = "text";
  commentInput.placeholder = "Comment on this post...";

  const submitCommentBtn = document.createElement("button");
  submitCommentBtn.classList.add("bg-fuchsia-500", "rounded-lg", "px-3", "text-gray-100")
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
        parentWithChildrenDiv.classList.add("parent-children-div", "border-b", "border-gray-400", "mb-4", "pb-2");

        parentWithChildrenDiv.append(commentDiv);

        commentsContainer.append(parentWithChildrenDiv);
      }
    });
  }
}
