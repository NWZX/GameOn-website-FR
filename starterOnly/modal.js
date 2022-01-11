
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
    alert("First Name is too short");
    return null;
  }
  if (formData.lastName.trim().length < 2) {
    alert("Last Name is too short");
    return null;
  }
  if (regexEmail.test(formData.email) === false) {
    alert("Email is not valid");
    return null;
  }
  if (checkDate(formData.birthDate) === false || new Date(formData.birthDate) > new Date().getTime()) {
    alert("Birth Date is not valid");
    return null;
  }
  if (isInt(formData.quantity) === false) {
    alert("Number of tournament is not valid");
    return null;
  }
  if (formData.location === "") {
    alert("Location is not valid");
    return null;
  }
  if (formData.tos === false) {
    alert("You must agree to the terms of service");
    return null;
  }

  return { ...formData, quantity: parseInt(formData.quantity), birthDate: new Date(formData.birthDate).getTime() };
}
//#endregion