import { createPost } from "../../components/createPost";
import type { Post } from "../../hooks/getAllPosts";
import { getProfilePosts } from "../../hooks/profiles/getProfilePosts";
// import "../../style/cards.css";




async function renderProfilepage(){

const urlParams = new URLSearchParams(window.location.search);
const profileName = urlParams.get("name");


if(profileName === null)
  {return}


  const profilePostResponse = await getProfilePosts(profileName);
  // console.log(profilePost) 
   const profile = profilePostResponse.data[0].author
  console.log(profile) 

const profileImgDiv = document.getElementById("profile-img") as HTMLDivElement

profileImgDiv.classList.add("profile-img-div")
 const userImage = document.createElement("img") as HTMLImageElement;
  if (profile.avatar) {
    //TODO: default image wont work
    userImage.src = profile.avatar?.url;
    // ?? defaultUserImage;
    userImage.alt = profile.avatar?.alt ?? "No alt-text provided";
  }
  profileImgDiv.append(userImage);

const profileNameElement = document.getElementById("profile-name") as HTMLHeadingElement
profileNameElement.classList.add("profile-name")
profileNameElement.textContent=profile.name


const profilePostsContainer = document.getElementById("profile-posts-container") as HTMLDivElement


  // const postParent = document.getElementById("post-parent") as HTMLElement;


  function displayProfilePosts(posts: Post[], postsParent: HTMLElement) {
      postsParent.innerHTML = "";
      posts.forEach((post: Post) => {
        createPost(post, postsParent );
      });
  }
  displayProfilePosts(profilePostResponse.data, profilePostsContainer)

}

renderProfilepage()