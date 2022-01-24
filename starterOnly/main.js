import { checkFormRealtime, checkForm } from "./modules/validation.js";
import { closeModal, launchModal } from "./modules/modal.js";

//#region Leagacy
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBtn = document.querySelectorAll(".modal-btn");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//#endregion


document.getElementById("btn-close-top").addEventListener("click", closeModal);
document.getElementById("btn-close-top").addEventListener("keypress", (e) => { e.key === 'Enter' && closeModal() });
document.getElementById("btn-close").addEventListener("click", closeModal);


// Add realtime validation

/**
 * @type {FormDataSubmit & HTMLFormElement} reserveForm
 */
const reserveForm = document.getElementById("reserve-form");
checkFormRealtime(reserveForm);

// Add validation on submit

reserveForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkForm(e.target);
});