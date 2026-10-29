export function displayError(
  field: HTMLElement,
  alert: HTMLParagraphElement,
  message: string,
) {
  field.setAttribute("aria-invalid", "true");
  field.setAttribute("aria-describedby", "username-error");

  alert.removeAttribute("hidden");
  alert.textContent = message;
  alert.classList.add(
    "text-red-500",
    "p-2",
    "ml-2",
    "justify-center",
    "bg-red-200",
    "rounded-xl",
    "font-sm",
  );
}

export function removeDisplayError(
  field: HTMLElement,
  alert: HTMLParagraphElement,
) {
  field.removeAttribute("aria-invalid");

  alert.classList.remove(
    "alert",
    "text-red-500",
    "p-2",
    "ml-2",
    "justify-center",
    "bg-red-200",
    "rounded-xl",
    "font-sm",
  );
}
