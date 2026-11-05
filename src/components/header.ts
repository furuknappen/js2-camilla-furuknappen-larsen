
import { localStorageUtil } from "../utils/storageUtils";
const root = document.documentElement
const sunIcon = document.getElementById("sun-icon")
const moonIcon = document.getElementById("moon-icon")

const hamburger = document.querySelector("#hamburger");
const navLinks = document.querySelector("#nav-links") as HTMLUListElement;
const followingMobile = document.querySelector(
  "#following-container-mobile",
) as HTMLDivElement;

hamburger?.addEventListener("click", () => {
  navLinks?.classList.toggle("hidden");
  followingMobile?.classList.toggle("hidden");
});



function applyTheme(theme: "dark" | "light"){
  root.classList.toggle("dark", theme === "dark");

  sunIcon?.classList.toggle("hidden", theme !== "dark")
  moonIcon?.classList.toggle("hidden", theme == "dark")

}


const savedTheme = localStorageUtil.load<"dark" | "light">("theme")
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
applyTheme(savedTheme ?? (systemDark ? "dark" : "light"))

const themeBtn = document.querySelector("#theme-btn")
themeBtn?.addEventListener("click", ()=> {
  console.log("click")
const next = root.classList.contains("dark") ? "light" : "dark";
applyTheme(next)
localStorageUtil.save("theme", next)
})


