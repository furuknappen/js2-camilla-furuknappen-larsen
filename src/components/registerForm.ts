import { ApiError } from "../errors/apiError.ts";
import { registerUser } from "../api/authService.ts";
import { displayError, removeDisplayError } from "../utils/FormErrorDisplay.ts";

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}
interface RegistrationFormData {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

async function onRegisterSubmit(formData: RegistrationData): Promise<void> {
  try {
    const user = await registerUser(formData);
    console.log("User registered successfully:", user);
    //TODO:  Redirect to login page logic here...
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

const EMAIL_CRITERIA = "stud.noroff.no";
const REQUIRED_PASSWORD_LENGTH = 8;
const form = document.querySelector<HTMLFormElement>("#registration-form");

const usernameField = document.getElementById(
  "username-error",
) as HTMLParagraphElement;
const alertName = document.getElementById(
  "username-error",
) as HTMLParagraphElement;

const emailField = document.getElementById(
  "registration-email",
) as HTMLInputElement;
const alertEmail = document.getElementById(
  "email-error",
) as HTMLParagraphElement;

const passwordField = document.getElementById("password1") as HTMLInputElement;
const alertPassword = document.getElementById(
  "password-error",
) as HTMLParagraphElement;
const passwordFieldConfirm = document.getElementById(
  "password2",
) as HTMLParagraphElement;
const alertPasswordConfirm = document.getElementById(
  "password-confirm-error",
) as HTMLParagraphElement;

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  removeDisplayError(usernameField, alertName);
  removeDisplayError(
    emailField,
    alertEmail,
    "Email must be a Noroff student mail",
  );
  removeDisplayError(passwordField, alertPassword);

  const target = e.currentTarget as HTMLFormElement;
  const formData = new FormData(target);
  const data = Object.fromEntries(formData) as unknown as RegistrationFormData;

  const { username, email, password1, password2 } = data;

  console.log(data, username, email, password1, password2);

  let hasErrors = false;

  if (username == "") {
    displayError(usernameField, alertName, "Username is required");
    hasErrors = true;
  }

  if (!email.includes(EMAIL_CRITERIA)) {
    displayError(
      emailField,
      alertEmail,
      `Email must contain "${EMAIL_CRITERIA}"`,
    );
    hasErrors = true;
  }

  if (password1 !== password2) {
    displayError(
      passwordFieldConfirm,
      alertPasswordConfirm,
      "Passwords do not match",
    );
    hasErrors = true;
  }

  if (password1.length < REQUIRED_PASSWORD_LENGTH) {
    displayError(
      passwordField,
      alertPassword,
      `Passwords must be at least ${REQUIRED_PASSWORD_LENGTH} characters long`,
    );
    hasErrors = true;
  }

  if (!hasErrors) {
    // loadingStart();

    const registrationData: RegistrationData = {
      name: username,
      email: email,
      password: password1,
    };

    await onRegisterSubmit(registrationData);
  }
});
