function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
//Regex email HTML 5 specification and date.
const emailReg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const dateReg = new RegExp(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const modalPopup = document.querySelector(".popup-form-valid");
const modalPopupBtn = document.querySelector(".button-confirm");
const modalClose = document.querySelector(".close");
// Variables
let radioCheck = [];
const validationTypes = {
  first: {
    errorMsg: "Veuillez entrer au moins 2 caractères",
    fct: "FirstLastIsValid"
  },
  last: {
    errorMsg: "Veuillez entrer au moins 2 caractères",
    fct: "FirstLastIsValid"
  },
  email: {
    errorMsg: "Veuillez entrer un email valide",
    fct: "EmailIsValid"
  },
  birthdate: {
    errorMsg: "Veuillez entrer votre date de naissance",
    fct: "BirthdateIsValid"
  },
  quantity: {
    errorMsg: "Veuillez rentrer un nombre entre 0 et 99",
    fct: "QuantityIsValid"
  },
  radio: {
    errorMsg: "Veuillez selectionner une ville",
    fct: "RadioIsValid"
  },
  checkbox: {
    errorMsg: "Veuillez accepté les conditions d'utilisations",
    fct: "CheckboxIsValid"
  }
};
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal event
modalClose.addEventListener("click", closeModal);
modalPopupBtn.addEventListener("click", closeConfirmModalPopUp);
//close modal form
function closeModal() {
  modalbg.style.display = "none";
}
//close confirm modal popup
function closeConfirmModalPopUp() {
  modalPopup.style.display = "none";
}
//confirm modal popup
function confirmModal() {
  closeModal();
  modalPopup.style.display = "block";
}
// activated the css attribute to displayed the error message
function addErrorMessage(elt, errorMessage) {
  elt.parentNode.setAttribute("data-error-visible", "true");
  elt.parentNode.setAttribute("data-error", errorMessage);
}
// removed the css attribute to hidden the error message
function removeErrorMessage(elt) {
  elt.parentNode.removeAttribute("data-error-visible");
  elt.parentNode.removeAttribute("data-error");
}
// validation function to check the validity of input uder data 
function FirstLastIsValid(elt) {
  let isValid = true;
  if (elt.value.length < 2) {
    isValid = false;
  }
  return isValid;
}
function EmailIsValid(elt) {
  let isValid = true;
  if (!emailReg.test(elt.value)) {
    isValid = false;
  }
  return isValid;
}
function BirthdateIsValid(elt) {
  let isValid = true;
  if (!dateReg.test(elt.value)) {
    isValid = false;
  }
  return isValid;
}
function QuantityIsValid(elt) {
  let isValid = true;
  if (elt.value == "" || isNaN(elt.value)) {
    isValid = false;
  }
  return isValid;
}
function RadioIsValid(elt) {
  radioCheck.push(elt.checked);
  if (radioCheck.length == 6) {
    return radioCheck.includes(true);
  }
  return true;
}
function CheckboxIsValid(elt) {
  if (elt.id == "checkbox1") {
    return elt.checked === true;
  }
}
// form validation
function validate(myForm) {
  // strore the validity off all form elements tested in the object
  let validations = {
    first: true,
    last: true,
    email: true,
    birthdate: true,
    quantity: true,
    radio: true,
    checkbox: true,
  }
  for (let element of myForm) {
    if (element.type == "radio" || element.type == "checkbox" && element.id !== "checkbox2") {
      if (!window[validationTypes[element.type].fct](element)) {
        addErrorMessage(element, validationTypes[element.type].errorMsg);
        validations[element.type] = false;
      } else {
        validations[element.type] = true;
        removeErrorMessage(element);
      }
    }
    if (element.type !== "radio" && element.type !== "checkbox" && element.type !== "submit") {
      if (!window[validationTypes[element.id].fct](element)) {
        addErrorMessage(element, validationTypes[element.id].errorMsg);
        validations[element.id] = false;
      } else {
        validations[element.id] = true;
        removeErrorMessage(element);
      }
    }
  }
  //check if all form input are valid
  let noErrors = Object.keys(validations).every(function (k) {
    return validations[k] === true;
  });
  if (noErrors) {
    confirmModal();
    return false;
  } else {
    return false;
  }
}