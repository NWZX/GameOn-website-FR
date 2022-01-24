import { isEmail, isInt, isValidDate } from "./utility.js";
import { showValidationMessage } from "./modal.js";

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
 * Validation for text input elements
 * @param {HTMLInputElement} inputElement Input element
 * @param {validatorCallback} validator Callback to validate the input
 * @param {string} errorMessage Error message to display
 */
function textInputValidation(inputElement, validator, errorMessage) {
    if (!validator(inputElement.value)) {
      showError(inputElement, errorMessage);
      return false;
    }
  return true;
}

/**
 * Validation for radio input elements
 * @param {RadioNodeList} inputElement Input element
 * @param {string} errorMessage Error message to display
 */
function radioInputValidation(inputElement, errorMessage) {
  if (inputElement.value === "") {
    showError(inputElement.item(0), errorMessage, false);
    inputElement.forEach((node) => {
      node.addEventListener("change", (e) => {
        inputElement.item(0).parentElement.setAttribute("data-error-visible", "false");
      });
    });
    return false;
  }
  return true;
}

/**
 * Validation for checkbox input elements
 * @param {HTMLInputElement} inputElement Input element
 * @param {string} errorMessage Error message to display
 */
function checkboxInputValidation(inputElement, errorMessage) {
    if (!inputElement.checked) {
      showError(inputElement, errorMessage, false);
      inputElement.addEventListener("change", (e) => {
        inputElement.parentElement.setAttribute("data-error-visible", "false");
      });
      return false;
    }
  return true;
}


/**
 * Add realtime validation to the input elements
 * @param {HTMLInputElement} inputElement Input element
 * @param {validatorCallback} validator Callback to validate the input
 * @param {string} errorMessage Error message to display
 */
function textInputRealtimeValidation(inputElement, validator, errorMessage) {
  inputElement.addEventListener("keyup", (e) => {
    if (!validator(e.target.value)) {
      showError(e.target, errorMessage, false);
    } else {
      e.target.parentElement.setAttribute("data-error-visible", "false");
    }
  });
}

/** 
 * Check data validity and transform it to {@link FormDataFinal}
 * @param {FormDataSubmit} data
 */
export function checkForm(data) {
  let isValid = true;
  
  isValid = isValid && textInputValidation(data.firstName, validateNameField, errorMessageFirstName);
  isValid = isValid && textInputValidation(data.lastName, validateNameField, errorMessageLastName);
  isValid = isValid && textInputValidation(data.email, validateEmailField, errorMessageEmail);
  isValid = isValid && textInputValidation(data.birthDate, validateDateField, errorMessageBirthDate);
  isValid = isValid && textInputValidation(data.quantity, validateQuantityField, errorMessageQuantity);
  isValid = isValid && radioInputValidation(data.location, errorMessageLocation);
  isValid = isValid && checkboxInputValidation(data.tos, errorMessageTos);
  
  isValid && showValidationMessage()
  
  
  const formData = transformData(data);
  console.log({ ...formData, quantity: parseInt(formData.quantity), birthDate: new Date(formData.birthDate).getTime() });
}

/**
 * Check data validity (but only visualy)
 * @param {FormDataSubmit & HTMLFormElement} reserveForm 
 */
export function checkFormRealtime(reserveForm) {
  textInputRealtimeValidation(reserveForm.firstName, validateNameField, errorMessageFirstName);
  textInputRealtimeValidation(reserveForm.lastName, validateNameField, errorMessageLastName);
  textInputRealtimeValidation(reserveForm.email, validateEmailField, errorMessageEmail);
  textInputRealtimeValidation(reserveForm.birthDate, validateDateField, errorMessageBirthDate);
  textInputRealtimeValidation(reserveForm.quantity, validateQuantityField, errorMessageQuantity);
}
//#endregion