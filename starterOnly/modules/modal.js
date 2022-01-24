
//#region Modal Management

const modalbg = document.querySelector(".bground");

/**
 * Show the validation success message
 */
export function showValidationMessage() {
  document.getElementById("modal-body").setAttribute("data-show", "false");
  document.getElementById("validation-body").setAttribute("data-show", "true");
}

/**
 * Show the form
 */
export function showForm() {
  document.getElementById("modal-body").setAttribute("data-show", "true");
  document.getElementById("validation-body").setAttribute("data-show", "false");
}

/**
 * Open the modal
 */
export function launchModal() {
  modalbg.style.display = "block";
  showForm();
}

/**
 * Close the modal by hidding the display
 */
export function closeModal() {
  modalbg.style.display = "none";
  showForm();
}

//#endregion

