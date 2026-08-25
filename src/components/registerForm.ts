import { ApiError } from "../errors/apiError";
import { registerUser } from "../api/authService";
import { validateRegistrationForm } from "./formValidation";
import { FormErrorDisplay } from "./formErrorDisplays";

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

const errorDisplay = new FormErrorDisplay(
  {
    username: "username-error",
    email: "email-error",
    password: "password-error",
    passwordConfirm: "password-confirm-error",
  },
  {
    username: "username",
    email: "registration-email",
    password1: "password1",
    password2: "password2",
  },
);

const registrationForm = document.getElementById(
  "registration-form",
) as HTMLFormElement;

if (registrationForm) {
  registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    //getting the elements
    const nameInput = (
      document.getElementById("username") as HTMLInputElement
    ).value.trim();
    const emailInput = (
      document.getElementById("registration-email") as HTMLInputElement
    ).value.trim();
    const password1Input = (
      document.getElementById("password1") as HTMLInputElement
    ).value.trim();
    const password2Input = (
      document.getElementById("password2") as HTMLInputElement
    ).value.trim();

    const errors = validateRegistrationForm(
      nameInput,
      emailInput,
      password1Input,
      password2Input,
    );
    errorDisplay.displayErrors(errors);

    if (Object.keys(errors).length === 0) {
      const registrationData: RegistrationData = {
        name: nameInput,
        email: emailInput,
        password: password1Input,
      };

      try {
        await registerUser(registrationData);
        alert("registration Successful! Redirecting to login...");
      } catch (error: unknown) {
        if (error instanceof ApiError) {
          alert(`Registration falied: ${error.message}`);
        } else if (error instanceof Error) {
          alert(`An unexpected error occured: ${error.message}`);
        }
      }
    }
  });
}
