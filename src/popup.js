import { setupButtonListeners } from './buttons.js';
import { handleSavePostSubmit } from './posts.js';
import { hideAllButtonsExcept } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const buttons = {
    addPost: document.getElementById('addPostBtn'),
    viewCategories: document.getElementById('viewCategoriesBtn'),
    back: document.getElementById('back'),
  };
  hideAllButtonsExcept(['addPostBtn', 'viewCategoriesBtn']);
  const forms = {
    addPost: document.getElementById('savePostForm'),
  };
  setupButtonListeners(buttons);
  forms.addPost.addEventListener('submit', handleSavePostSubmit);
});
