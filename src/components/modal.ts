/**
 * Info: this function takes inn 5 parameters: heading, message, button-text, a function for the actionbutton and the functionparameters
 */
export function createModal(
  heading: string,
  message: string,
  buttonText: string,
  actionBtnFunction: () => void | Promise<void>,
  secondFunction?: () => void 
) {
  const dialog = document.createElement("dialog");
  dialog.setAttribute("aria-labelledby", "modal-heading");
  dialog.classList.add("modal", "border");
  //TODO: endre navn på modal
  dialog.id = "login-modal";

  const header = document.createElement("h3");
  header.textContent = heading;
  header.id = "modal-heading";

  const text = document.createElement("p");
  text.textContent = message;

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons-div");
  buttonsDiv.setAttribute("role", "group");
  buttonsDiv.setAttribute("aria-label", "Modal actions");

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("btn-small");
  closeBtn.id = "close-modal-btn";
  closeBtn.textContent = "Close";
  closeBtn.setAttribute("aria-label", "close modal dialog");

  const actionBtn = document.createElement("button");
  actionBtn.classList.add("btn");
  actionBtn.textContent = buttonText;

  actionBtn.addEventListener("click", async (e) => {
    e.preventDefault();
  
    await actionBtnFunction();
    if(secondFunction){
     secondFunction()
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

// export function redirectToHomepage(){
//      window.location.href = "../homePage/homePage.html";
// }