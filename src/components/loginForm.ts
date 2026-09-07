// import { displayError, removeDisplayError } from "../utils/FormErrorDisplay.ts";
import { loginUser } from "../api/authService.ts";
import { ApiError } from "../errors/apiError.ts";
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
    console.log("User logged in successfully:", user);
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
