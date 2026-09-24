// import { getAllPosts, type Meta } from "../hooks/getAllPosts";
import type { Meta } from "../types";
import { getAllPaginatedPosts } from "../hooks/getpaginatedPosts";
import { renderPosts } from "../pages/homePage/homePage";

const prevBtn = document.getElementById("prev-btn") as HTMLButtonElement

const nextBtn = document.getElementById("next-btn") as HTMLButtonElement

let currentPage = 1;
const POSTS_PER_PAGE = 30;

export async function loadPage(page: number): Promise <void> {

    const result = await getAllPaginatedPosts(page, POSTS_PER_PAGE);

  if (result.ok) {

  currentPage = result.value.meta.currentPage;
    renderPosts(result.value.data);
    updatePaginationBtns(result.value.meta);

  } else {
 const container =document.getElementById("posts-parent") as HTMLDivElement
    container.textContent = result.error.message;
  }
}

function updatePaginationBtns(meta: Meta) {
  prevBtn.disabled = !meta.previousPage;
  nextBtn.disabled = !meta.nextPage;
}

prevBtn?.addEventListener("click", () => {
  if(!prevBtn.disabled){
    loadPage(currentPage - 1)
    window.scrollTo({ top: 0, behavior: 'smooth'});
  }
})

nextBtn?.addEventListener("click", () => {
  if(!nextBtn.disabled){
    loadPage(currentPage + 1)
    window.scrollTo({ top: 0, behavior: 'smooth'});
  }
})

loadPage(1)