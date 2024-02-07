export function checkInitialSpace(value) {
    if (/^\s/.test(value)) {
      return true;
    } else {
      return false;
    }
  }
  
  export function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== "" && email.match(emailFormat)) {
      return true;
    }
  
    return false;
  }

  export const validateName =["0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","*","+","=","{","}","[","]","<",">","?"];

  export const validateNumber =["e","E",".","-","+"];