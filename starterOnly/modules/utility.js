//#region Utilitary functions
/**
 * String is a integer
 * @param {string} value
 */
export function isInt(value) {
  return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
}

/**
 * Check if it is a valid date
 */
export function isValidDate(dateString) {
  let date = new Date(dateString);
  let value = date.valueOf();
  if (value === 0) return true;
  return !!value;
}

/**
 * Function that check if email is valid
 * @param {string} email
 */
export function isEmail(email) {
  // Global RegExp for email validation
  const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(email);
}

//#endregion