function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//code add bb regex email
var emailReg = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);
var dateReg = new RegExp(/^[1-9]\/[1-9]\/[1-9]/);

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// code add by bb
const modalClose = document.querySelector(".close");

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


 function validate(frm){
   for (let elt of frm){
        if((elt.id == "first" || elt.id == "last") && elt.value.length < 2){
          console.log(elt.value);
          console.log('nombre de caractère < 2'),
          frm.preventDefault();
          return false;
        }else if (elt.id == "email" && !elt.value.test(mailReg)){
          console.log('formulaire valide');
          return true;
        }else if (elt.id == "birthdate" && !elt.value.test(dateReg))
    }
 }