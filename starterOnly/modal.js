
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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//#endregion

//#region JSDoc Type

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
 * Check if the input can tigger the error
 * @callback validatorCallback
 * @param {string} text Input text
 * @returns {boolean}
 */

//#endregion

//#region Utilitary functions
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
function isValidDate(dateString) {
  let date = new Date(dateString);
  let value = date.valueOf();
  if (value === 0) return true;
  return !!value;
}

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
 * Function that check if email is valid
 * @param {string} email
 */
function isEmail(email) {
  // Global RegExp for email validation
  const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(email);
}

//#endregion

//#region Modal Management

/**
 * Show the validation success message
 */
function showValidationMessage() {
  document.getElementById("modal-body").setAttribute("data-show", "false");
  document.getElementById("validation-body").setAttribute("data-show", "true");
}

/**
 * Show the form
 */
function showForm() {
  document.getElementById("modal-body").setAttribute("data-show", "true");
  document.getElementById("validation-body").setAttribute("data-show", "false");
}

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
  showForm();
}

//#endregion

//#region Form Validation

// Define Error messages

const errorMessageFirstName = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
const errorMessageLastName = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const errorMessageEmail = "Veuillez entrer une adresse email valide.";
const errorMessageBirthDate = "Veuillez entrer une date valide.";
const errorMessageQuantity = "Veuillez entrer un nombre entier valide.";
const errorMessageLocation = "Veuillez sélectionner une option.";
const errorMessageTos = "Veuillez cocher la case pour accepter les conditions d'utilisation.";

/**
 * Validator for the names field
 * @param {string} value 
 * @returns {boolean}
 */
function validateNameField(value) {
  return value.trim().length > 2;
}

/**
 * Validator for the email field
 * @param {string} value 
 * @returns {boolean}
 */
function validateEmailField(value) {
  return isEmail(value);
}

/**
 * Validator for the birthdate field
 * @param {string} value 
 * @returns {boolean}
 */
function validateDateField(value) {
  return isValidDate(value) || new Date(value) > new Date().getTime();
}

/**
 * Validator for the quantity field
 * @param {string} value 
 * @returns {boolean}
 */
function validateQuantityField(value) {
  return isInt(value);
}


/**
 * Show the validation error
 * @param {HTMLInputElement} inputElement Input element
 * @param {string} errorMessage Message to display
 * @param {boolean} [hide=true] Hide error on change
 */
function showError(inputElement, errorMessage, hide = true) {
  inputElement.parentElement.setAttribute("data-error", errorMessage);
  inputElement.parentElement.setAttribute("data-error-visible", "true");
  hide && hideError(inputElement);
}
/**
 * Hide the validation error
 * @param {HTMLInputElement} inputElement Input element
 */
function hideError(inputElement) {
  inputElement.addEventListener("focus", (e) => {
    inputElement.parentElement.setAttribute("data-error-visible", "false");
  });
}

/** 
 * Check data validity and transform it to {@link FormDataFinal}
 * @param {FormDataSubmit} data
 */
function checkForm(data) {
  const formData = transformData(data);
  let isValid = true;

  if (!validateNameField(formData.firstName)) {
    showError(data.firstName, errorMessageFirstName);
    isValid = false;
  }
  if (!validateNameField(formData.lastName)) {
    showError(data.lastName, errorMessageLastName);
    isValid = false;
  }
  if (!validateEmailField(formData.email)) {
    showError(data.email, errorMessageEmail);
    isValid = false;
  }
  if (!validateDateField(formData.birthDate)) {
    showError(data.birthDate, errorMessageBirthDate);
    isValid = false;
  }
  if (!validateQuantityField(formData.quantity)) {
    showError(data.quantity, errorMessageQuantity);
    isValid = false;
  }
  if (formData.location === "") {
    showError(data.location.item(0), errorMessageLocation, false);
    data.location.forEach((node) => {
      node.addEventListener("change", (e) => {
        data.location.item(0).parentElement.setAttribute("data-error-visible", "false");
      });
    });
    isValid = false;
  }
  if (!formData.tos) {
    showError(data.tos, errorMessageTos, false);
    data.tos.addEventListener("change", (e) => {
      data.tos.parentElement.setAttribute("data-error-visible", "false");
    });
    isValid = false;
  }

  if (isValid) {
    showValidationMessage()
  }

  console.log({ ...formData, quantity: parseInt(formData.quantity), birthDate: new Date(formData.birthDate).getTime() });
}

/**
 * Add realtime validation to the input elements
 * @param {HTMLInputElement} inputElement Input element
 * @param {validatorCallback} validator Callback to validate the input
 * @param {string} errorMessage Error message to display
 */
function addRealtimeValidation(inputElement, validator, errorMessage) {
  inputElement.addEventListener("keyup", (e) => {
    if (!validator(e.target.value)) {
      showError(e.target, errorMessage, false);
    } else {
      e.target.parentElement.setAttribute("data-error-visible", "false");
    }
  });
}

// Add realtime validation


/**
 * @type {FormDataSubmit & HTMLFormElement} reserveForm
 */
const reserveForm = document.getElementById("reserve-form");
addRealtimeValidation(reserveForm.firstName, validateNameField, errorMessageFirstName);
addRealtimeValidation(reserveForm.lastName, validateNameField, errorMessageLastName);
addRealtimeValidation(reserveForm.email, validateEmailField, errorMessageEmail);
addRealtimeValidation(reserveForm.birthDate, validateDateField, errorMessageBirthDate);
addRealtimeValidation(reserveForm.quantity, validateQuantityField, errorMessageQuantity);

// Add validation on submit

reserveForm.addEventListener("submit", (e) => { e.preventDefault(); checkForm(e.target); });
//#endregion