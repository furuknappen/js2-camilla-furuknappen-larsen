import { localStorageUtil } from "./storageUtils";

export function LogOut() {
  document.getElementById("log-out-btn")?.addEventListener("click", (e) => {
    e.preventDefault();

    localStorageUtil.remove("accessToken");
    localStorageUtil.remove("following");
    localStorageUtil.remove("justLoggedIn");
    localStorageUtil.remove("user");
    window.location.href = "/";
  });
}
