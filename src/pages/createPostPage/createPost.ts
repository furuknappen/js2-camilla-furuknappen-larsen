import { postnewPost, type PostRequest } from "../../hooks/postPost";
import { localStorageUtil } from "../../utils/storageUtils";

const accessToken = localStorageUtil.load("accessToken");

if (!accessToken) {
  window.location.href =
    "/js2-camilla-furuknappen-larsen/src/pages/loginPage/login.html";
}

const newPostForm = document.getElementById(
  "create-new-post-form",
) as HTMLFormElement;

newPostForm.addEventListener("submit", async (e) => {
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

  const resultSearch = await postnewPost(newPostRequest);
  if (resultSearch.ok) {
    window.location.href = "/js2-camilla-furuknappen-larsen/";
  } else {
    const errorDiv = document.getElementById(
      "new-post-error-div",
    ) as HTMLDivElement;
    errorDiv.textContent = resultSearch.error.message;
  }
});
