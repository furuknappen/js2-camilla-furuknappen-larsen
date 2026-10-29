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
      followingcontainerMobile.classList.add("hidden");
    }

    localStorageUtil.save("following", result.value);
    if (!followingContainerDesktop) {
      return;
    }
    followingContainerDesktop.innerHTML = "";

    result.value.data.following.forEach((profile) => {
      const userDisplay = document.createElement("a") as HTMLAnchorElement;
      userDisplay.classList.add("user-display", "flex", "items-center", "gap-4", "p-1", "mx-2", "border-b-1", "border-gray-300", "last:border-none"  );
      const userName = document.createElement("div");
      userName.classList.add("truncate")
      userName.textContent = profile.name;
      userDisplay.setAttribute(
        "href",
        `/js2-camilla-furuknappen-larsen/src/pages/profilePage/profilePage.html?name=${profile.name}`,
      );

      const authorImgDiv = document.createElement("div");
      authorImgDiv.classList.add("img-div");
      const userImage = document.createElement("img") as HTMLImageElement;
      userImage.classList.add("rounded-full", "h-12","object-cover", "aspect-square" )
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
    const navLinks = document.querySelector("#nav-links") as HTMLUListElement;

    if (window.innerWidth < 1025) {
      followingcontainerMobile.append(userDisplay);
      navLinks.classList.add("hidden");
      followingcontainerMobile.classList.add("hidden");
    } else {
      followingContainerDesktop.append(userDisplay);
      followingcontainerMobile.classList.add("flex");
    }
  }

  updatePosition();
  window.addEventListener("resize", updatePosition);
}

renderFollowingSection();
