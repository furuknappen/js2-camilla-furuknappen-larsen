import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/js2-camilla-furuknappen-larsen/",
  build: {
    rolldownOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "index.html"),
        createPost: path.resolve(
          import.meta.dirname,
          "src/pages/createPostPage/createpost.html",
        ),
        singlePost: path.resolve(
          import.meta.dirname,
          "src/pages/postPage/singlePostPage.html",
        ),
        profilePage: path.resolve(
          import.meta.dirname,
          "src/pages/profilePage/profilePage.html",
        ),
        login: path.resolve(import.meta.dirname, "src/pages/loginPage/login.html"),
        register: path.resolve(
          import.meta.dirname,
          "src/pages/registerPage/registerPage.html",
        ),
      },
    },
  },
});
