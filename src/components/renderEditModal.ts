import type { Post } from "../types";
import { putUpdatePost, type UpdateRequest } from "../hooks/getUpdatePost";
// import "../style/edit-dialog.css";

export function renderEditModal(post: Post) {
  const editDialog = document.createElement("dialog");
  editDialog.classList.add(
    "flex",
    "flex-col",
    "p-8",
    "border-2",
    "border-line-light", "dark:border-line-dark",
    "rounded-lg",
    "m-4",
    "w-full",
    "md:mx-auto",
    "md:my-auto",
    "md:w-120",
  );
  const dialogTitle = document.createElement("h1");
  dialogTitle.classList.add("text-3xl");

  const updateForm = document.createElement("form");
  updateForm.classList.add("flex", "flex-col", "gap-2");

  const labelTitle = document.createElement("label");
  labelTitle.classList.add("pt-8", "ml-2", "font-semibold");
  labelTitle.setAttribute("for", "post-title");
  labelTitle.textContent = "Title";

  const postTitle = document.createElement("input");
  postTitle.classList.add("input-field");
  postTitle.value = post.title;
  postTitle.id = "post-title";
  const labelBody = document.createElement("label");
  labelBody.classList.add("pt-8", "ml-2", "font-semibold");
  labelBody.setAttribute("for", "post-body");
  labelBody.textContent = "Content";
  const postBody = document.createElement("textarea");
  postBody.value = post.body;
  postBody.id = "post-body";
  postBody.classList.add("input-field");
  const labelTags = document.createElement("label");
  labelTags.classList.add("pt-8", "ml-2", "font-semibold");
  labelTags.setAttribute("for", "post-tags");
  labelTags.textContent = "Tags";
  const postTags = document.createElement("input");
  postTags.classList.add("input-field");
  postTags.value = post.tags.join(" ");

  const labelImg = document.createElement("label");
  labelImg.classList.add("pt-8", "ml-2", "font-semibold");
  labelImg.setAttribute("for", "post-url");
  labelImg.textContent = "Url for image";

  const postImgUrl = document.createElement("input");
  postImgUrl.classList.add("input-field");
  postImgUrl.id = "post-url";

  const labelAlt = document.createElement("label");
  labelAlt.classList.add("pt-8", "ml-2", "font-semibold");
  labelAlt.setAttribute("for", "post-alt");
  labelAlt.textContent = "Describe the image";

  const postImgAlt = document.createElement("input");
  postImgAlt.classList.add("input-field");
  postImgAlt.id = "post-alt";

  if (post.media?.url) {
    postImgUrl.value = post.media.url;
    postImgAlt.value = post.media.alt;
  }

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add(
    "flex",
    "gap-16",
    "justify-center",
    "items-center",
    "mt-8",
  );

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add("text-gray-700", "text-lg");
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Update";
  submitBtn.classList.add(
    "text-lg",
    "px-4",
    "md:text-xl",
    "bg-primary",
    "text-light",
    "rounded-xl",
    "md:px-8",
    "py-2",
    "ml-8",
  );
  dialogTitle.textContent = "Update your post";
  document.querySelector("main")?.append(editDialog);
  buttonDiv.append(cancelBtn, submitBtn);
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
    buttonDiv,
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
