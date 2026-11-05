/**
 * Creates a costumizable modal with an actionbutton
 * @param heading
 * @param message
 * @param buttonText
 * @param actionBtnFunction
 * @param secondFunction
 */

export function createModal(
  heading: string,
  message: string,
  buttonText: string,
  actionBtnFunction: () => void | Promise<void>,
  secondFunction?: () => void,
) {
  const dialog = document.createElement("dialog");
  dialog.setAttribute("aria-labelledby", "modal-heading");
  dialog.classList.add(
    "px-8",
    "py-4",
    "justify-self-center",
    "self-center",
    "backdrop:bg-gray-400",
    "backdrop:opacity-50",
    "rounded-xl",
    "lg:py-12",
    "px-20",
  );
  dialog.id = "login-modal";

  const header = document.createElement("h3");
  header.classList.add("text-3xl");
  header.textContent = heading;
  header.id = "modal-heading";

  const text = document.createElement("p");
  text.classList.add("pt-8", "pb-12");
  text.textContent = message;

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("flex", "justify-around", "gap-8");
  buttonsDiv.setAttribute("role", "group");
  buttonsDiv.setAttribute("aria-label", "Modal actions");

  const closeBtn = document.createElement("button");
  closeBtn.id = "close-modal-btn";
  closeBtn.textContent = "Close";
  closeBtn.setAttribute("aria-label", "close modal dialog");

  const actionBtn = document.createElement("button");
  actionBtn.classList.add(
    "bg-primary",
    "rounded-lg",
    "py-2",
    "px-4",
    "text-gray-100",
    "font-semibold",
    "text-lg",
  );
  actionBtn.textContent = buttonText;

  actionBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    await actionBtnFunction();
    if (secondFunction) {
      secondFunction();
    }
    dialog.close();
  });

  buttonsDiv.append(closeBtn, actionBtn);

  dialog.append(header, text, buttonsDiv);
  document.body.append(dialog);

  dialog.showModal();

  closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
  });
}
