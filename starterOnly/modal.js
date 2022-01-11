
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
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//#endregion

//#region New/Improved
/**
 * String is a integer
 * @param {string} value
 */
function isInt(value) {
  return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
}

/**
 * Check if it is a valid date
 */
function checkDate(dateString) {
  let date = new Date(dateString);
  let value = date.valueOf();
  if (value === 0) return true;
  else return !!value;
}

// Global RegExp
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


/**
 * Open the modal
 */
function launchModal() {
  modalbg.style.display = "block";
}

/**
 * Close the modal by hidding the display
 */
function closeModal() {
  modalbg.style.display = "none";
}

/**
 * Raw data from the form
   * @typedef {Object} FormDataSubmit
   * @property {HTMLInputElement} firstName
   * @property {HTMLInputElement} lastName
   * @property {HTMLInputElement} email
   * @property {HTMLInputElement} birthDate
   * @property {HTMLInputElement} quantity
   * @property {RadioNodeList} location
   * @property {HTMLInputElement} tos
   * @property {HTMLInputElement} spam
*/

/**
 * Data after cleaning
   * @typedef {Object} FormDataT
   * @property {string} firstName
   * @property {string} lastName
   * @property {string} email
   * @property {string} birthDate
   * @property {string} quantity
   * @property {string} location
   * @property {boolean} tos
   * @property {boolean} spam
*/

/**
 * Final data after validation
   * @typedef {Object} FormDataFinal
   * @property {string} firstName
   * @property {string} lastName
   * @property {string} email
   * @property {number} birthDate
   * @property {number} quantity
   * @property {string} location
   * @property {boolean} tos
   * @property {boolean} spam
*/

/**
 * Transform {@link FormDataSubmit} to {@link FormDataT}
 * @param {FormDataSubmit} data
 * @returns {FormDataT}
 */
function transformData(data) {
  return {
    firstName: data.firstName.value,
    lastName: data.lastName.value,
    email: data.email.value,
    birthDate: data.birthDate.value,
    quantity: data.quantity.value,
    tos: data.tos.checked,
    spam: data.spam.checked,
    location: data.location.value
  }
}

/** 
 * Check data validity and transform it to {@link FormDataFinal}
 * @param {FormDataSubmit} data
 */
function checkForm(data) {
  const formData = transformData(data);
  
  if (formData.firstName.trim().length < 2) {
    data.firstName.parentElement.setAttribute("data-error","Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
    data.firstName.parentElement.setAttribute("data-error-visible", "true");
    data.firstName.addEventListener("focus", (e) => { data.firstName.parentElement.setAttribute("data-error-visible", "false"); });
  }
  if (formData.lastName.trim().length < 2) {
    data.lastName.parentElement.setAttribute("data-error","Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    data.lastName.parentElement.setAttribute("data-error-visible", "true");
    data.lastName.addEventListener("focus", (e) => { data.lastName.parentElement.setAttribute("data-error-visible", "false"); });
  }
  if (regexEmail.test(formData.email) === false) {
    data.email.parentElement.setAttribute("data-error","Veuillez entrer une email valide.");
    data.email.parentElement.setAttribute("data-error-visible", "true");
    data.email.addEventListener("focus", (e) => { data.email.parentElement.setAttribute("data-error-visible", "false"); });
  }
  if (checkDate(formData.birthDate) === false || new Date(formData.birthDate) > new Date().getTime()) {
    data.birthDate.parentElement.setAttribute("data-error","Vous devez entrer votre date de naissance");
    data.birthDate.parentElement.setAttribute("data-error-visible", "true");
    data.birthDate.addEventListener("focus", (e) => { data.birthDate.parentElement.setAttribute("data-error-visible", "false"); });
  }
  if (isInt(formData.quantity) === false) {
    data.quantity.parentElement.setAttribute("data-error","Veuillez entrer un entier valide.");
    data.quantity.parentElement.setAttribute("data-error-visible", "true");
    data.quantity.addEventListener("focus", (e) => { data.quantity.parentElement.setAttribute("data-error-visible", "false"); });
  }
  if (formData.location === "") {
    data.location.item(0).parentElement.setAttribute("data-error","Vous devez choisir une option.");
    data.location.item(0).parentElement.setAttribute("data-error-visible", "true");
    data.location.forEach((node) => {
      node.addEventListener("change", (e) => { data.location.item(0).parentElement.setAttribute("data-error-visible", "false"); });
    });
  }
  if (formData.tos === false) {
    data.tos.parentElement.setAttribute("data-error","Vous devez vérifier que vous acceptez les termes et conditions.");
    data.tos.parentElement.setAttribute("data-error-visible", "true");
    data.tos.addEventListener("focus", (e) => { data.tos.parentElement.setAttribute("data-error-visible", "false"); });
  }

  return { ...formData, quantity: parseInt(formData.quantity), birthDate: new Date(formData.birthDate).getTime() };
}
//#endregion