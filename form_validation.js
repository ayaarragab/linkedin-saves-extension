document.getElementById('savePostForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for validation

    // Get the form elements
    const postLink = document.getElementById('postLink');
    const remind = document.getElementById('remind');
    const category = document.getElementById('category');
    
    // Clear previous error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());

    let valid = true;

    // Validate the post link
    if (postLink.value.trim() === '') {
      valid = false;
      showError(postLink, 'Post link is required.');
    }

    // Validate the reminder text
    if (remind.value.trim() === '') {
      valid = false;
      showError(remind, 'Reminder text is required.');
    }

    // Validate the category
    if (category.value.trim() === '') {
      valid = false;
      showError(category, 'Category is required.');
    }

    // If the form is valid, submit the form
    if (valid) {
      // You can add form submission logic here (e.g., saving the data)
      alert('Post saved successfully!');
    }
  });

  // Function to show error messages
  function showError(inputElement, message) {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '0.9em';
    errorMessage.innerText = message;
    
    inputElement.parentElement.appendChild(errorMessage);
  }