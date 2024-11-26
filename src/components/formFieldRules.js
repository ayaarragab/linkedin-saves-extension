// Define validation rules for each form field
export const formFields = [
    {
      inputElementId: 'postLink',
      validationFn: value => value !== '' && value.includes('linkedin'), // Must be non-empty and contain 'linkedin'
      errorMessage: 'Post link is required and should be a LinkedIn URL!'
    },
    {
      inputElementId: 'remind',
      validationFn: value => value !== '', // Must not be empty
      errorMessage: 'Reminder text is required.'
    },
    {
      inputElementId: 'category',
      validationFn: value => value !== '', // Must not be empty
      errorMessage: 'Category is required.'
    }
  ];
  