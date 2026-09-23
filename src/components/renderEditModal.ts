import type { Post } from "../types";
import { putUpdatePost, type UpdateRequest } from "../hooks/getUpdatePost";

// import { createSinglePost } from "../pages/postPage/createSinglePost";
import "../style/edit-dialog.css";

export function renderEditModal(post: Post) {
  console.log(post);
  const editDialog = document.createElement("dialog");
  editDialog.classList.add("edit-dialog");
  const dialogTitle = document.createElement("h1");

  const updateForm = document.createElement("form");
  updateForm.classList.add("update-form");
  const postTitle = document.createElement("input");
  postTitle.value = post.title;
  const postBody = document.createElement("textarea");
  postBody.value = post.body;

  const postTags = document.createElement("input");
  postTags.value = post.tags.join(" ");
  const postImgUrl = document.createElement("input");
  const postImgAlt = document.createElement("input");
  //  const img= document.createElement("imput") as HTMLImageElement
  if (post.media?.url) {
    // img.src = post.media?.url ?? null;
    // img.alt = post.media?.alt ?? "No alt-text provided";

    postImgUrl.value = post.media.url || "";
    postImgAlt.value = post.media.alt;
  }

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Update";
  dialogTitle.textContent = "this is the modal";
  document.querySelector("main")?.append(editDialog);

  updateForm.append(
    postTitle,
    postBody,
    postImgUrl,
    postImgAlt,
    postTags,
    submitBtn,
  );

  editDialog.append(dialogTitle, updateForm);
  editDialog.showModal();

  updateForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(postTitle.value);

    const updateRequest: UpdateRequest = {
      title: postTitle.value,
      body: postBody.value,
      tags: postTags.value.split(" "),
      media: {
        url: postImgUrl.value,
        alt: postImgAlt.value,
      },
    };

    const result = await putUpdatePost(post.id, updateRequest);

    if (result.ok) {
      //TODO: BK is this correct? how to check if ts displayed correctly? han den hente et element som blir laget på en annen side eller må den være i html? *.*
      return result.value;
    } else {
      // const errorDiv = document.querySelector(".post-header") as HTMLDivElement;
      // errorDiv.append(result.error.message);
    }
    editDialog.close();
    window.location.reload();
  });
}
