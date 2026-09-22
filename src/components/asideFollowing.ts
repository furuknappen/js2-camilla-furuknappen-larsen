// import type {
//   FollowProfileResponse,
//   Profile,
// } from "../hooks/profiles/follow-unfollow-profile";
import { localStorageUtil } from "../utils/storageUtils";
import "../style/aside-following.css";
import { getAllFollowingProfiles } from "../hooks/profiles/getAllProfiles";
import type { LoginResponse } from "../api/authService";
// import { getSearchUser } from "../hooks/profiles/getSearchUser";

// const followingSearchField = document.getElementById(
//   "search-following",
// ) as HTMLInputElement;

const followingContainerDesktop = document.getElementById(
  "following-container",
) as HTMLDivElement;

// let noResultInfo: HTMLParagraphElement | null;
// const followingRaw:  =FollowProfileResponse

// const followingArray  = localStorageUtil.load<FollowProfileResponse>("following")?.data.following;
// console.log("youre following: ", followingArray);

export async function renderFollowingSection() {
  const userdata: LoginResponse = JSON.parse(
    localStorage.getItem("user") || "{}",
  );
  const following = await getAllFollowingProfiles(userdata.data.name);
  localStorageUtil.save("following", following);

  if (!followingContainerDesktop) {
    return;
  }
  followingContainerDesktop.innerHTML = "";

  following.data.following.forEach((profile) => {
    const userDisplay = document.createElement("div");
    userDisplay.classList.add("user-display");
    const userName = document.createElement("p");
    userName.textContent = profile.name;

    const authorImgDiv = document.createElement("div");
    authorImgDiv.classList.add("img-div");
    const userImage = document.createElement("img") as HTMLImageElement;
    if (profile.avatar) {
      //TODO: default image wont work
      userImage.src = profile.avatar?.url;
      // ?? defaultUserImage;
      userImage.alt = profile.avatar?.alt ?? "No alt-text provided";
    }

    authorImgDiv.append(userImage);
    userDisplay.append(authorImgDiv, userName);

    moveFollowingOnResize(userDisplay);
  });
}

function moveFollowingOnResize(userDisplay: HTMLDivElement) {
  function updatePosition() {
    const followingcontainerMobile = document.getElementById(
      "following-container-mobile",
    ) as HTMLDivElement;
    const navLinks = document.querySelector(".nav-links") as HTMLUListElement


    if (window.innerWidth < 768) {
      followingcontainerMobile.append(userDisplay);
      navLinks.style.display = "none"
      followingcontainerMobile.style.display = "none";
    }else{
      followingContainerDesktop.append(userDisplay);
      followingcontainerMobile.style.display = "flex";
    }
  }

  updatePosition()
  window.addEventListener("resize", updatePosition)

}

// if (followingArray) {
//   renderFollowingSection(followingArray);
// }
renderFollowingSection();
// followingSearchField?.addEventListener("input", async () => {
//   if (followingSearchField.value == "") {
//     return;
//   }
//   noResultInfo?.remove();
//   noResultInfo = null;

//   const query = followingSearchField.value.trim();

//   const response = await getSearchUser(query);

//   if (response.data.length === 0) {
//     noResultInfo = document.createElement("p");
//     noResultInfo.textContent = "";
//     noResultInfo.textContent = `No friend with that name found`;
//     followingSearchField.after(noResultInfo);
//   }
//   console.log(response.data);
// });
