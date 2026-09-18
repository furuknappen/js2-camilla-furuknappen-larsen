import { postnewPost, type PostRequest } from "../../hooks/postPost";
console.log("create new post");

const newPostForm = document.getElementById(
  "create-new-post-form",
) as HTMLFormElement;

// const formBtn = document.getElementById("new-post-submit-btn") as HTMLButtonElement

newPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = document.getElementById("title-input") as HTMLInputElement;
  const titleValue = titleInput.value;
  const bodyInput = document.getElementById(
    "body-input",
  ) as HTMLTextAreaElement;
  const bodyValue = bodyInput.value;
  const tagInput = document.getElementById("tag-input") as HTMLInputElement;
  const tagValue = tagInput.value
  // tagInput.value.join(' ');
console.log("tagvalue: " , tagValue)
//  const hashtagArray = tagValue.trim().split(/\s+/).filter(tag => tag.length > 0).map(tag => `#${tag.replace(/^#+/, '')}`).join(' ');

  const imgInput = document.getElementById("img-input") as HTMLInputElement;
  const imgValue = imgInput.value;
  const altTextInput = document.getElementById(
    "alt-text-input",
  ) as HTMLInputElement;
  const altTextValue = altTextInput.value;

  const NewPostRequest: PostRequest = {
    title: titleValue,
    body: bodyValue, 
    tags: [tagValue], 
    media: {
      url: imgValue,
      alt: altTextValue,
    },
  };

  postnewPost(NewPostRequest);

  // window.location.href = "../homepage/homepage.html";
});
