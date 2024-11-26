import { hideAllButtonsExcept } from './utils.js';
import { getFromStorage, saveToStorage } from './storage.js';
import { loadPostsForCategory } from './posts.js';

export function handleViewCategoriesClick() {
  hideAllButtonsExcept(['back', 'categoriesListContainer', 'removeCategoryBtn', 'searchCategoriesBtn']);
  loadCategories();
}

export function loadCategories() {
  getFromStorage('savedPosts').then((savedPosts) => {
    const categories = [...new Set(savedPosts.map((post) => post.category))];
    const categoriesList = document.getElementById('categoriesList');

    categoriesList.innerHTML = '';

    if (categories.length === 0) {
      categoriesList.textContent = 'No categories found.';
      return;
    }

    categories.forEach((category) => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = category;
      link.addEventListener('click', () => loadPostsForCategory(category));
      listItem.appendChild(link);
      categoriesList.appendChild(listItem);
    });
  });
}
