import type { Post } from "../homePage/getPosts";
// import "../style/cards.css";
import "./singlePost.css";
import { createAuthorHeader } from "../../components/createAuthorHeader";
import { createComment } from "../../components/createCommentSection";
import { postComment } from "../../hooks/postComment";

/// SINGLE POST
export function createSinglePost(
  post: Post,
  postsParentContainer: HTMLElement,
) {
  const postContainer = document.createElement("a");
  postContainer.classList.add("post-container");
  postContainer.href = `../postPage/postPage.html?id=${post.id}`;

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
  const tagDiv = document.createElement("div");
  tagDiv.classList.add("tagDiv");
  /// TAGS
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
      post.updated,
    );
  }
  postContainer.append(postHeader1, title, body, tagDiv, imgDiv);
  postsParentContainer.append(postContainer);

  // const commentInputSection = document.createElement("div")
  const commentForm = document.createElement("form");
  const commentInput = document.createElement("input");
  commentInput.name = "comment";
  commentInput.type = "text";

  const submitCommentBtn = document.createElement("button");
  submitCommentBtn.textContent = "Send";
  submitCommentBtn.type = "submit";

  commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const target = event.currentTarget as HTMLFormElement;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData) as unknown as { comment: string };

    if (data.comment == "") return;

    const response = await postComment(data.comment, post.id);
    window.location.reload();
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
        if(parentComment) {
           parentComment.append(commentDiv);
        }

      

      }
      else{
  commentsContainer.append(commentDiv);
      }

    
    });

   
  }
}
