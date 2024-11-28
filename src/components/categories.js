import { hideAllButtonsExcept } from './utils.js';
import { getFromStorage, saveToStorage } from './storage.js';
import { loadPostsForCategory } from './posts.js';
import { refreshForm } from './posts.js';

export function handleViewCategoriesClick() {
  refreshForm();
  hideAllButtonsExcept(['back', 'categoriesListContainer', 'removeCategoryBtn', 'searchCategoriesBtn']);
  loadCategories();
}

const loadCategories = async () => {
  refreshForm();
  const categories = await getFromStorage('categories') || [];  
  const categoriesList = document.getElementById('categoriesList');
  const categoryLen = categories.length;
  if (categoryLen === 0) {
    categoriesList.textContent = 'No categories found.';
    return;
  } else if (categoriesList.childNodes.length === 0 && categoryLen > 0) {
    categories.forEach((category) => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#';
      link.id = category;
      link.textContent = category;
      link.addEventListener('click', () => loadPostsForCategory(category));
      listItem.appendChild(link);
      const removeIcon = createRemoveBtns('category');
      removeIcon.addEventListener('click', async () => {
        await removeCateogory(category);
      });
      listItem.appendChild(removeIcon);
      categoriesList.appendChild(listItem);
      }); 
  }
}

const createRemoveBtns = (forWhat) => {
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


const removeCateogory = async (categoryName) => {
  const categories = await getFromStorage('categories') || [];
  const updatedCategories = categories.filter(category => !category.includes(categoryName));
  await saveToStorage('categories', updatedCategories);
  const savedPosts = await getFromStorage('savedPosts');
  savedPosts.forEach(async (post) => {
    const updatedPosts = savedPosts.filter(post => !post.category.includes(categoryName));
    await saveToStorage('savedPosts', updatedPosts);
    document.getElementById(categoryName).parentNode.style.display = "none";
  })
}


export { createRemoveBtns, loadCategories };