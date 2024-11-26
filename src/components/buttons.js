import { handleAddPostClick, handleBackClick } from './posts.js';
import { handleViewCategoriesClick } from './categories.js';

export function setupButtonListeners(buttons) {
  buttons.addPost.addEventListener('click', handleAddPostClick);
  buttons.viewCategories.addEventListener('click', handleViewCategoriesClick);
  buttons.back.addEventListener('click', handleBackClick);
  
}
