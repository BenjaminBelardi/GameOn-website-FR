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
const formData = document.querySelectorAll("input");
const radio = document.querySelectorAll("[type='radio']");
const modalPopup = document.querySelector(".popup-form-valid");
const modalPopupBtn = document.querySelector(".button-confirm");
const modalClose = document.querySelector(".close");
// Variables
let radioCheck = [];
// object selection error messages and validation fonction by name or type input form element.
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
    errorMsg: "Veuillez accepter les conditions d'utilisations",
    fct: "CheckboxIsValid"
  }
};
// strore the validity off all input form elements tested
let validations = {
  first: false,
  last: false,
  email: false,
  birthdate: false,
  quantity: false,
  radio: false,
  checkbox: false,
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
  if (elt.value === "" || isNaN(elt.value)) {
    isValid = false;
  }else if (elt.value == 0){
    radio.forEach((status) => status.checked = false,status.disabled = false);
    radioCheck = [];
    removeErrorMessage(formData[5]);
  }else if (elt.value > 0 && !radioCheck.includes(true)){
    addErrorMessage( formData[5], validationTypes[formData[5].type].errorMsg) ;
  }
  return isValid;
}
function RadioIsValid(elt) {
  radioCheck.push(elt.checked);
  if ((radioCheck.includes(true) && formData[4].value > 0)) {
    return true;
  }else if ((radioCheck.includes(true) && formData[4].value == 0)){
    addErrorMessage( formData[4], validationTypes[formData[4].id].errorMsg)
    return true;
  }else if ( !radioCheck.includes(true) && formData[4].value == 0){
    return true;
  }
  return false;
}
function CheckboxIsValid(elt) {
  if (elt.id === "checkbox1") {
    return elt.checked === true;
  }
}
// add event "input" for all input form elements
formData.forEach((input) => input.addEventListener("input", ValidModal));
// test the validity of input elements
function ValidModal(e){
  const element = e.target;
    if (element.type === "radio" || element.type === "checkbox" && element.id !== "checkbox2") {
      if (!window[validationTypes[element.type].fct](element)) {
        addErrorMessage(element, validationTypes[element.type].errorMsg);
        validations[element.type] = false;
      } else {
        validations[element.type] = true;
        removeErrorMessage(element);
      }
    }
    if (element.type !== "radio" && element.type !== "checkbox" && element.type !== "submit") {
      if (!window[validationTypes[element.id].fct](element)){
        addErrorMessage(element, validationTypes[element.id].errorMsg);
        validations[element.id] = false;
      } else {
        validations[element.id] = true;
        removeErrorMessage(element);
      }
    }
}
// test the validity of all input elements at submition
function ValidModalSubmition(e){
  radioCheck = [];
  for (let element of formData) {
    if (element.type === "radio" || element.type === "checkbox" && element.id !== "checkbox2") {
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
}
document.querySelector("form").addEventListener("submit", validate);
// form validation
function validate(event) {
  event.preventDefault()
  ValidModalSubmition(event);
  //check if all form input are valid
  let noErrors = Object.keys(validations).every(function (k) {
    return validations[k] === true;
  });
  if (noErrors) {
    confirmModal();
  }
}