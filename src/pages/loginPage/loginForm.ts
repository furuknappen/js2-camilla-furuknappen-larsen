
import { loginUser, type LoginResponse } from "../../api/authService.ts";

import { localStorageUtil } from "../../utils/storageUtils.ts";

type LoginFormData = {
  email: string;
  password: string;
};

document.querySelector<HTMLFormElement>("#sign-in-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const target = e.currentTarget as HTMLFormElement;
  const formData = new FormData(target);
  const data = Object.fromEntries(formData) as unknown as LoginFormData;

    const result = await loginUser({
      email: data.email,
      password: data.password
    });
    if (result.ok) {
      addUserInfoLocalStorage(result.value);
        window.location.href = "../../../index.html";
    } else {
      const errorP = document.getElementById("error-request") as HTMLParagraphElement
      errorP.textContent = result.error.message;
    }

});

function addUserInfoLocalStorage(user: LoginResponse): void {
  const exsistingStorage = localStorageUtil.load<LoginResponse>("user") || {};

  const storage = { ...exsistingStorage, ...user };

  localStorageUtil.save("user", storage);
  localStorageUtil.save("accessToken", user.data.accessToken);
}
