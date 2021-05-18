function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//code add bb regex email HTML 5 specification
var emailReg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
var dateReg = new RegExp(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// code add by bb
const modalClose = document.querySelector(".close");
const errorMessage = {
  FirstLastErrMsg : "Veuillez entrer au moins 2 caractères",
  emailErrMsg : "Veuillez entrer un email valide",
  birdateErrMsg : "Veuillez entrer votre date de naissance",
  quantityErrMsg : "Veuillez rentrer un nombre entre 0 et 99"
} ;
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// code add by BB
// close modal event
modalClose.addEventListener("click", closeModal);
//close modal form
function closeModal(){
  modalbg.style.display = "none";
}
function addErrorMessage(elt, errorMessage){
  elt.parentNode.setAttribute("data-error-visible", "true");
  elt.parentNode.setAttribute("data-error", errorMessage);
}
function removeErrorMessage(elt){
  elt.parentNode.removeAttribute("data-error-visible");
  elt.parentNode.removeAttribute("data-error");
}
function FirstLastIsValid (elt){
  let isValid = true;
  if (elt.value.length <2){
    isValid = false;
  }
  return isValid;
}
function emailIsValid (elt){
  let isValid = true;
  if (!emailReg.test(elt.value)){
    isValid = false;
  }
  return isValid;
}

function birthdateIsValid (elt){
  let isValid = true;
  if (!dateReg.test(elt.value)){
    isValid = false;
  }
  return isValid;
}

function quantityIsValid (elt){
  let isValid = true;
  if (elt.value == "" ||  isNaN(elt.value)){
    isValid = false;
  }
  return isValid;
}


 function validate(frm){
  let firstValid, lastValid, emailValid, birthdateValid, quantityValid;
   for (let elt of frm){
        if(elt.id == "first"){ 
          if (!FirstLastIsValid(elt)){
          console.log(elt.value);
          addErrorMessage(elt, errorMessage.FirstLastErrMsg);
          firstValid = false;
          }else{
          firstValid = true;
          removeErrorMessage(elt);
          }
        }else if(elt.id == "last"){ 
          if (!FirstLastIsValid(elt)){
          console.log(elt.value);
          addErrorMessage(elt, errorMessage.FirstLastErrMsg);
          lastValid = false;
          }else{
          lastValid = true;
          removeErrorMessage(elt);
          }
        }else if (elt.id == "email"){
          if (!emailIsValid(elt)){
            console.log(elt.value);
            addErrorMessage(elt, errorMessage.emailErrMsg);
            emailValid = false;
            }else{
            removeErrorMessage(elt);
            emailValid = true;
            }
        }else if (elt.id == "birthdate"){
          if (!birthdateIsValid(elt)){
            console.log(elt.value);
            addErrorMessage(elt, errorMessage.birdateErrMsg);
            birthdateValid = false;
            }else{
            birthdateValid = true;
            removeErrorMessage(elt);
            }
        }else if (elt.id == "quantity"){
          if (!quantityIsValid(elt)){
            console.log(elt.value);
            addErrorMessage(elt, errorMessage.quantityErrMsg);
            quantityValid = false;
            }else{
            removeErrorMessage(elt);
            quantityValid = true;
            }
        }
   }
   if (!firstValid || !lastValid || !emailValid || !birthdateValid || !quantityValid){
       return false;
       frm.preventDefault();
       }else{
       prompt("Merci! votre demande d'inscription a bien été envoyée");
       }
 }
        


          
    //     }else if (elt.id == "email" && emailReg.test(elt.value)!= true){
    //       elt.classList.add("invalid");
    //       elt.nextElementSibling.innerHTML ="Email invalide. Exemple exemple@domaine.com"
    //       emailValid = false;
    //     }else if (elt.id == "birthdate" && dateReg.test(elt.value)!= true){
    //       elt.classList.add("invalid");
    //       elt.nextElementSibling.innerHTML ="Veuillez rentrer votre date de naissance"
    //       birthdateValid = false;
    //     }else if (elt.id == "quantity" && (elt.value == "" ||  isNaN(elt.value))){
    //       elt.classList.add("invalid");
    //       elt.nextElementSibling.innerHTML ="Veuillez selectionner une valeur numérique en 0 et 99"
    //       quantityValid = false;  
    //     }else if (elt.type == "radio" && elt.active) {

          
    //     }else if(elt.type == "checkbox" || elt.type == "submit"){

    //     }else{
    //       elt.classList.remove("invalid");
    //     }
    // }
    // if (!firstValid || !lastValid || !emailValid || !birthdateValid || !quantityValid){
    //   return false;
    //   frm.preventDefault();
    // }else{
    //   prompt("Merci! votre demande d'inscription a bien été envoyée");