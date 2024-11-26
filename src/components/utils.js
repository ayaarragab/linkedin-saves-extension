export function hideAllButtonsExcept(exceptions) {
  const allElements = [
    ...document.querySelectorAll(
      '#addPostBtn, #viewCategoriesBtn, #addPostForm, #categoriesListContainer, #postsListContainer, #back, #searchCategoriesBtn, #removeCategoryBtn, #searchPostBtn, #removePostBtn'
    ),
  ];

  allElements.forEach((el) => {
    el.style.display = exceptions.includes(el.id) ? 'block' : 'none';
  });
}
