export function displayError(
  field: HTMLElement,
  alert: HTMLParagraphElement,
  message: string,
) {
  field.setAttribute("aria-invalid", "true");
  field.setAttribute("aria-describedby", "username-error");

  alert.removeAttribute("hidden");
  alert.textContent = message;
  alert.classList.add("alert");
}

export function removeDisplayError(
  field: HTMLElement,
  alert: HTMLParagraphElement,
) {
  field.removeAttribute("aria-invalid");

  alert.classList.remove("alert");
}
