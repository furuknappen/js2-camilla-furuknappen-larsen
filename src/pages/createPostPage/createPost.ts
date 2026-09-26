import { postnewPost, type PostRequest } from "../../hooks/postPost";

const newPostForm = document.getElementById(
  "create-new-post-form",
) as HTMLFormElement;

newPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = document.getElementById("title-input") as HTMLInputElement;
  const titleValue = titleInput.value;
  const bodyInput = document.getElementById(
    "body-input",
  ) as HTMLTextAreaElement;
  const bodyValue = bodyInput.value;
  const tagInput = document.getElementById("tag-input") as HTMLInputElement;
  const tagValue = tagInput.value;

  const imgInput = document.getElementById("img-input") as HTMLInputElement;
  const imgValue = imgInput.value;
  const altTextInput = document.getElementById(
    "alt-text-input",
  ) as HTMLInputElement;
  const altTextValue = altTextInput.value;

  const newPostRequest: PostRequest = {
    title: titleValue,
    body: bodyValue,
    tags: [tagValue],
  };

  if (imgValue.trim()) {
    newPostRequest.media = {
      url: imgValue,
      alt: altTextValue,
    };
  }

  postnewPost(newPostRequest);

  window.location.href = "/js2-camilla-furuknappen-larsen/";
});
