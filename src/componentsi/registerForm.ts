import { ApiError } from "../errors/apiError";
import { registerUser } from "../api/authService";

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

let userInfo;

async function onRegisterSubmit(formData: RegistrationData): Promise<void> {
 
  try {
    const user = await registerUser(formData);
    // console.log('User registered successfully:', user);
    // Redirect to login page logic here...
    
  } catch (error: unknown) {
    // Check if the error is an instance of our custom ApiError
    if (error instanceof ApiError) {
      if (error.status === 409) {
        alert('This email or username is already registered. Please try logging in.');
      } else {
        alert(`Registration failed: ${error.message}`);
      }
    } else if (error instanceof Error) {
      // Fallback for general errors
      alert(`An unexpected error occurred: ${error.message}`);
    }
  }
}

const registrationForm = document.getElementById("registration-form") as HTMLFormElement;

if (registrationForm) {
  registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault()
   //getting the elements
    const nameInput = (document.getElementById("username") as HTMLInputElement).value;
    const emailInput = (document.getElementById("registration-email") as HTMLInputElement).value;
    const alertEmail = document.getElementById("email-error") as HTMLElement;
    const password1Input = (document.getElementById("password1") as HTMLInputElement).value;
    const password2Input = (document.getElementById("password2") as HTMLInputElement).value;
    let uniquePassword = "";
    const alertPassword = document.getElementById("password-error") as HTMLElement;
    const alertPasswordConfirm = document.getElementById(
      "password-confirm-error"
    ) as HTMLElement;


    const emailCriteria = "stud.noroff.no";
    const alertName = document.getElementById("username-error") as HTMLElement;
    const usernameField = document.getElementById("username") as HTMLInputElement;
    if (nameInput == "") {
      usernameField.setAttribute("aria-invalid", "true");
      usernameField.setAttribute("aria-describedby", "username-error");

      alertName.textContent = "Username is required";
      alertName.removeAttribute("hidden");
      alertName.classList.add("alert");
    } else {
      usernameField.removeAttribute("aria-invalid");
      alertName.classList.remove("alert");
    }

    if (!emailInput.includes(emailCriteria)) {
      alertEmail.textContent = 'Email must contain "stud.noroff.no"';
      alertEmail.classList.add("alert");
    } else {
      alertEmail.textContent = "Email must be a Noroff student mail";
      alertEmail.classList.remove("alert");
    }

    if (password1Input === password2Input) {
      if (password1Input.length < 8) {
        alertPassword.textContent =
          "Passwords must be at least 8 characters long";
        alertPassword.classList.add("alert");
        alertPasswordConfirm.classList.remove("alert");
      } else {
        uniquePassword = password1Input;
        alertPassword.classList.remove("alert");
        alertPasswordConfirm.classList.remove("alert");
      }
    } else {
      alertPasswordConfirm.textContent = "Passwords do not match";
      alertPassword.classList.remove("alert");
      alertPasswordConfirm.classList.add("alert");
    }
// let registrationSuccess = false;

    if (uniquePassword && emailInput.includes(emailCriteria)) {
      // loadingStart();
      const registrationData: RegistrationData = {
        name: nameInput,
        email: emailInput,
        password: uniquePassword,
      };
 
      userInfo = await onRegisterSubmit(registrationData);
      // if (userInfo && userInfo.data) {
      //   registrationSuccess = true;
      // }
    }
  })}