import { hideAllButtonsExcept } from './utils.js';
import { getFromStorage, saveToStorage } from './storage.js';
import { refreshForm, removePost } from './posts.js';
import { createRemoveBtns } from './buttons.js';


export const populateCategories = async () => {
  const categories = await getFromStorage('categories') || [];
  const select = document.querySelector('select');
  const added = [];
  categories.forEach((category) => {
    if (!added.includes(category)) {
      const option = document.createElement('option');
      option.value = category;
      option.text = category;
      added.push(option.value);
      select.appendChild(option);
    }
  })

  const finalElement = document.createElement('option');
  finalElement.value = 'Create a new category';
  finalElement.text = 'Create a new category';
  select.appendChild(finalElement);
  select.addEventListener('change', () => {
    if (select.value === 'Create a new category') {
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.id = 'category';
        newInput.placeholder = 'Create a new category';
        newInput.required = true;

        const parent = select.parentNode;
        parent.replaceChild(newInput, select);
    }
});
}

export const isCategPopulated = () => {
  const select = document.querySelector('select');
  if (!select) {
    return false;
  }  
  return select.options.length > 1;
}

export function loadPostsForCategory(category) {
  refreshForm();
  hideAllButtonsExcept(['back', 'postsListContainer']);
  document.getElementById('categoryName').textContent = `${category}`;

  getFromStorage('savedPosts').then((savedPosts) => {
    const filteredPosts = savedPosts.filter((post) => post.category === category);
    const postsList = document.getElementById('postsList');

    postsList.innerHTML = '';

    if (filteredPosts.length === 0) {
      postsList.textContent = 'No posts found for this category.';
      return;
    }

    filteredPosts.forEach((post) => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = post.postLink;
      link.id = post.remind;
      link.textContent = post.remind;
      link.target = '_blank';
      const removeIcons = createRemoveBtns('post');
      listItem.appendChild(link);
      removeIcons.addEventListener('click', async () => {
        await removePost(post.remind);
      });
      listItem.appendChild(removeIcons);
      postsList.appendChild(listItem);
    });
  });
}


export function handleViewCategoriesClick() {
  refreshForm();
  hideAllButtonsExcept(['back', 'categoriesListContainer', 'removeCategoryBtn', 'searchCategoriesBtn']);
  loadCategories();
}

export const loadCategories = async () => {
  refreshForm();
  const categories = await getFromStorage('categories') || [];  
  const categoriesList = document.getElementById('categoriesList');
  const categoryLen = categories.length;
  const childrenLen = categoriesList.childNodes.length;
  if (categoryLen === 0) {
    categoriesList.textContent = 'No categories found.';
    return;
  } else if (childrenLen === 0 && categoryLen > 0) {
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
  } else if (childrenLen !== categoryLen && categoryLen - childrenLen === 1) {
    const categoryMissed = categories[-1];
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#';
    link.id = categoryMissed;
    link.textContent = categoryMissed;
    link.addEventListener('click', () => loadPostsForCategory(categoryMissed));
    listItem.appendChild(link);
    const removeIcon = createRemoveBtns('category');
    removeIcon.addEventListener('click', async () => {
      await removeCateogory(categoryMissed);
    });
    listItem.appendChild(removeIcon);
    categoriesList.appendChild(listItem);
  }
}


export const removeCateogory = async (categoryName) => {
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


