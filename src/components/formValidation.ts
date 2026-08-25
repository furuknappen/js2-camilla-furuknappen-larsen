type ValidationErrors = {
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
};

const NOROFF_EMAIL_DOMAIN = "stud.noroff.no";
const MIN_PASSWORD_LENGTH = 8;

export function validateRegistrationForm(
  username: string,
  email: string,
  password1: string,
  password2: string,
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!username.trim()) {
    errors.username = `Username is required`;
  }

  if (!email.includes(NOROFF_EMAIL_DOMAIN)) {
    errors.email = `Email must contain "${NOROFF_EMAIL_DOMAIN}"`;
  }

  if (password1 !== password2) {
    errors.passwordConfirm = "Passwords do not match";
  } else if (password1.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
  }
  return errors;
}
