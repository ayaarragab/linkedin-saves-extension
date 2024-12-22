import { handleAddPostClick } from './posts.js';
import { handleViewCategoriesClick } from './categories.js';
import { handleBackClick } from './utils.js';

export function setupButtonListeners(buttons) {
  buttons.addPost.addEventListener('click', handleAddPostClick);
  buttons.viewCategories.addEventListener('click', handleViewCategoriesClick);
  buttons.back.addEventListener('click', handleBackClick); 
}

export const createRemoveBtns = (forWhat) => {
  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-xmark';
  icon.style.color = '#005582';
  icon.style.cursor = 'pointer';
  if (forWhat.includes('category')) {
    icon.title = 'Delete this category';
  } else {
    icon.title = 'Delete this post';
  }
  return icon;
}
