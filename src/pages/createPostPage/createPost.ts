import { postnewPost, type PostRequest } from "../../hooks/postPost"
console.log("create new post")

const newPostForm = document.getElementById("create-new-post-form") as HTMLFormElement

// const formBtn = document.getElementById("new-post-submit-btn") as HTMLButtonElement

newPostForm.addEventListener("submit",(e) => {
e.preventDefault()
const titleInput = document.getElementById("title-input") as HTMLInputElement
const titleValue= titleInput.value
const bodyInput = document.getElementById("body-input") as HTMLTextAreaElement
const bodyValue = bodyInput.value
const tagInput = document.getElementById("tag-input") as HTMLInputElement
const tagValue = tagInput.value
const tagsArray = tagValue.split(" ")


const tagsHashtags = tagsArray.map(tag => "#"+tag)
console.log(tagsHashtags)
  

const NewPostRequest: PostRequest = {
   title: titleValue,
  body: bodyValue, // Optional
  tags: [tagValue], // Optional
  // media: {
  //   url: string,
  //   alt: string,
  // }; // Optional 
}

 postnewPost(NewPostRequest)


  window.location.href = "../homepage/homepage.html"
})