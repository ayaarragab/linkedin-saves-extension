export function hideAllButtonsExcept(exceptions) {
  const allElements = [
    ...document.querySelectorAll(
      '#addPostBtn, #viewCategoriesBtn, #addPostForm, #categoriesListContainer, #postsListContainer, #back'
    ),
  ];

  allElements.forEach((el) => {
    el.style.display = exceptions.includes(el.id) ? 'block' : 'none';
  });
}


export function handleBackClick() {
  refreshForm();
  loadCategories();
  if (document.getElementById('categoriesListContainer').style.display === 'block' || 
  document.getElementById('addPostForm').style.display === 'block') {
    hideAllButtonsExcept(['addPostBtn', 'viewCategoriesBtn']);
  } else {
    handleViewCategoriesClick();
  }
}
