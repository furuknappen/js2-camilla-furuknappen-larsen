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

  const labelTitle = document.createElement("label");
  labelTitle.setAttribute("for", "post-title");
  labelTitle.textContent = "Title";

  const postTitle = document.createElement("input");
  postTitle.value = post.title;
  postTitle.id = "post-title";
  const labelBody = document.createElement("label");
  labelBody.setAttribute("for", "post-body");
  labelBody.textContent = "Content";
  const postBody = document.createElement("textarea");
  postBody.value = post.body;
  postBody.id = "post-body";
  postBody.classList.add("post-body");

  const labelTags = document.createElement("label");
  labelTags.setAttribute("for", "post-tags");
  labelTags.textContent = "Tags";
  const postTags = document.createElement("input");
  postTags.value = post.tags.join(" ");

  const labelImg = document.createElement("label");
  labelImg.setAttribute("for", "post-url");
  labelImg.textContent = "Url for image";

  const postImgUrl = document.createElement("input");
  postImgUrl.id = "post-url";

  const labelAlt = document.createElement("label");
  labelAlt.setAttribute("for", "post-alt");
  labelAlt.textContent = "Describe the image";

  const postImgAlt = document.createElement("input");
  postImgAlt.id = "post-alt";

  if (post.media?.url) {
    postImgUrl.value = post.media.url;
    postImgAlt.value = post.media.alt;
  }

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add("cancel-btn");
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Update";
  submitBtn.classList.add("submit-button");
  dialogTitle.textContent = "Update your post";
  document.querySelector("main")?.append(editDialog);

  updateForm.append(
    labelTitle,
    postTitle,
    labelBody,
    postBody,
    labelImg,
    postImgUrl,
    labelAlt,
    postImgAlt,
    labelTags,
    postTags,
    cancelBtn,
    submitBtn,
  );

  editDialog.append(dialogTitle, updateForm);
  editDialog.showModal();

  updateForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const updateRequest: UpdateRequest = {
      title: postTitle.value,
      body: postBody.value,
      tags: postTags.value.split(" "),
      media: postImgUrl.value.trim()
        ? {
            url: postImgUrl.value.trim(),
            alt: postImgAlt.value.trim(),
          }
        : null,
    };

    const result = await putUpdatePost(post.id, updateRequest);

    if (result.ok) {
      window.location.reload();
      editDialog.close();
    } else {
      const errorDiv = document.querySelector("#post-parent") as HTMLDivElement;
      errorDiv.append(result.error.message);
      editDialog.close();
    }
  });

  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    editDialog.close();
  });
}
