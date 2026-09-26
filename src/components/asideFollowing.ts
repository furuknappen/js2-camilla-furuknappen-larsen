import { localStorageUtil } from "../utils/storageUtils";
import "../style/aside-following.css";
import { getAllFollowingProfiles } from "../hooks/profiles/getAllFollowingProfiles";
import type { LoginResponse } from "../api/authService";

const followingContainerDesktop = document.getElementById(
  "following-container",
) as HTMLDivElement;

export async function renderFollowingSection() {
  const userdata: LoginResponse = JSON.parse(
    localStorage.getItem("user") || "{}",
  );
  const result = await getAllFollowingProfiles(userdata.data.name);
  if (result.ok) {
    if (result.value.data.following.length == 0) {
      const followingcontainerMobile = document.getElementById(
        "following-container-mobile",
      ) as HTMLDivElement;
      followingcontainerMobile.style.display = "none";
    }

    localStorageUtil.save("following", result.value);
    if (!followingContainerDesktop) {
      return;
    }
    followingContainerDesktop.innerHTML = "";

    result.value.data.following.forEach((profile) => {
      const userDisplay = document.createElement("a") as HTMLAnchorElement;
      userDisplay.classList.add("user-display");
      const userName = document.createElement("div");
      userName.textContent = profile.name;
      userDisplay.setAttribute(
        "href",
        `/js2-camilla-furuknappen-larsen/src/pages/profilePage/profilePage.html?name=${profile.name}`,
      );

      const authorImgDiv = document.createElement("div");
      authorImgDiv.classList.add("img-div");
      const userImage = document.createElement("img") as HTMLImageElement;
      if (profile.avatar) {
        userImage.src = profile.avatar?.url;
        userImage.alt = profile.avatar?.alt ?? "No alt-text provided";
      }

      authorImgDiv.append(userImage);
      userDisplay.append(authorImgDiv, userName);

      moveFollowingOnResize(userDisplay);
    });
  } else {
    followingContainerDesktop.textContent = result.error.message;
  }
}

function moveFollowingOnResize(userDisplay: HTMLAnchorElement) {
  function updatePosition() {
    const followingcontainerMobile = document.getElementById(
      "following-container-mobile",
    ) as HTMLDivElement;
    const navLinks = document.querySelector(".nav-links") as HTMLUListElement;

    if (window.innerWidth < 1025) {
      followingcontainerMobile.append(userDisplay);
      navLinks.style.display = "none";
      followingcontainerMobile.style.display = "none";
    } else {
      followingContainerDesktop.append(userDisplay);
      followingcontainerMobile.style.display = "flex";
    }
  }

  updatePosition();
  window.addEventListener("resize", updatePosition);
}

renderFollowingSection();
