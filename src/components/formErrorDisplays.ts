type ErrorElementIds = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type InputElementIds = {
  username: string;
  email: string;
  password1: string;
  password2: string;
};

export class FormErrorDisplay {
  private errorIds: ErrorElementIds;
  private inputIds: InputElementIds;

  constructor(errorIds: ErrorElementIds, inputIds: InputElementIds) {
    this.errorIds = errorIds;
    this.inputIds = inputIds;
  }

  displayErrors(errors: Record<string, string | undefined>): void {
    this.clearAllErrors();
    Object.entries(errors).forEach(([field, message]) => {
      if (message) {
        this.displayError(field, message);
      }
    });
  }

  clearAllErrors(): void {
    Object.values(this.errorIds).forEach((id) => {
      const element = document.getElementById(id) as HTMLElement;
      if (element) {
        ((element.textContent = ""), element.classList.remove("alert"));
        element.setAttribute("hidden", "");
      }
    });

    Object.values(this.inputIds).forEach((id) => {
      const input = document.getElementById(id) as HTMLInputElement;
      if (input) {
        input.removeAttribute("aria-invalid");
      }
    });
  }

  private displayError(field: string, message: string): void {
    const errorElementId = this.errorIds[field as keyof ErrorElementIds];
    const inputElementId = this.inputIds[field as keyof InputElementIds];

    if (errorElementId) {
      const errorElement = document.getElementById(
        errorElementId,
      ) as HTMLInputElement;

      if (errorElementId) {
        const errorElement = document.getElementById(
          errorElementId,
        ) as HTMLElement;
        if (errorElement) {
          errorElement.textContent = message;
          errorElement.classList.add("alert");
          errorElement.removeAttribute("hidden");
        }
      }

      if (inputElementId) {
        const input = document.getElementById(inputElementId) as HTMLElement;
        if (input) {
          input.setAttribute("aria-invalid", "true");
          input.setAttribute("aria-describedby", errorElementId);
        }
      }
    }
  }
}
