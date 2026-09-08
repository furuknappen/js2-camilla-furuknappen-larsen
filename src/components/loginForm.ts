// import { displayError, removeDisplayError } from "../utils/FormErrorDisplay.ts";
import { loginUser, type LoginResponse } from "../api/authService.ts";
import { ApiError } from "../errors/apiError.ts";
import {localStorageUtil, } from "../utils/storageUtils.ts"
// import { LoginResponse } from "../api/authService.ts";
// import { displayError, removeDisplayError } from "../utils/FormErrorDisplay.ts";



console.log("test login");

type LoginData = {
  email: string;
  password: string;
};

type LoginFormData = {
  email: string;
  password: string;
};

async function onLoginSubmit(formdata: LoginData): Promise<void> {
  try {
    const user = await loginUser(formdata);
    // debugger
    //  console.log("accestoken after await: ", user.data.accessToken)
    console.log("User logged in successfully:", user);
    addUserInfoLocalStorage(user)
   
    window.location.href = "../pages/homePage/homePage.html"
  } catch (error: unknown) {
    // Check if the error is an instance of our custom ApiError
    if (error instanceof ApiError) {
      if (error.status === 409) {
        alert(
          "This email or username is already registered. Please try logging in.",
        );
      } else {
        alert(`Registration failed: ${error.message}`);
      }
    } else if (error instanceof Error) {
      // Fallback for general errors
      alert(`An unexpected error occurred: ${error.message}`);
    }
  }
}

const form = document.querySelector<HTMLFormElement>("#sign-in-form");
// const alertLogin = document.querySelector(
//   "error-request",
// ) as HTMLParagraphElement;

// const emailField = document.getElementById("login-email") as HTMLInputElement;

// const passwordField = document.getElementById(
//   "login-password",
// ) as HTMLInputElement;

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const target = e.currentTarget as HTMLFormElement;
  const formData = new FormData(target);
  const data = Object.fromEntries(formData) as unknown as LoginFormData;

  const { email, password } = data;

  // if(!email || email == "") {
  //   displayError(emailField, alertLogin, "Please enter your email")
  // }

  // if(!password || email == " ") {
  //   displayError(passwordField, alertLogin, "Please enter your password")

  // }

  //fortsett her
  await onLoginSubmit({ email, password });
});


function addUserInfoLocalStorage(user: LoginResponse ): void {
  const exsistingStorage = localStorageUtil.load<LoginResponse>("user") || {}
 
const storage = {...exsistingStorage, ...user}

localStorageUtil.save("user", storage)
// justLoggedIn ble brukt for å lage toast notification
localStorageUtil.save("justLoggedIn", "true")
localStorageUtil.save("accessToken", user.data.accessToken)

}