// Function to show error message
export const showError = (inputElement, message) => {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '0.9em';
    errorMessage.innerText = message;
  
    inputElement.parentElement.appendChild(errorMessage);
  };
  
  export const validateForm = (formFields) => {
    let valid = true;
  
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
  
    formFields.forEach(field => {
      const inputElement = document.getElementById(field.inputElementId);
      const { validationFn, errorMessage } = field;
  
      if (!validationFn(inputElement.value.trim())) {
        valid = false;
        showError(inputElement, errorMessage);
      }
    });
  
    return valid;
  };
  