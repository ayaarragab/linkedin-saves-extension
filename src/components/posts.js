import { hideAllButtonsExcept } from './utils.js';
import { saveToStorage, getFromStorage } from './storage.js';
import { validateForm } from './formValidator.js';
import { formFields } from './formFieldRules.js';

const element = document.getElementById('statusMessage');
const element2 = document.getElementById('category');

const populateCategories = async () => {
  const result = await chrome.storage.local.get('savedPosts');
  const savedPosts = result.savedPosts || [];  
  const categories = [];

  savedPosts.forEach((post) => {
    categories.push(post.category);    
  })

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

const isCategPopulated = () => {
  const select = document.querySelector('select');
  if (!select) {
    return false;
  }  
  return select.options.length > 1;
}

const handleAddPostClick = async () => {
  hideAllButtonsExcept(['back', 'addPostForm']);
  await verifyPopulate();
}

const verifyPopulate = async () => {
  if (!isCategPopulated()) {
    await populateCategories();
  }
}

const refreshForm = async () => {
  if (element.textContent.length !== 0) {
    element.textContent = '';
  }
}

export async function handleSavePostSubmit(event) {  
  event.preventDefault();
  const post = {
    postLink: document.getElementById('postLink').value,
    remind: document.getElementById('remind').value,
    category: document.getElementById('category').value,
  };
  const valid = validateForm(formFields);
  if (valid) {
    const savedPosts = await getFromStorage('savedPosts') || [];
    savedPosts.push(post);
    await saveToStorage('savedPosts', savedPosts);
    document.getElementById('statusMessage').textContent = 'Post saved successfully!';
    document.getElementById('savePostForm').reset();
  }
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
      link.textContent = post.remind;
      link.target = '_blank';
      listItem.appendChild(link);
      postsList.appendChild(listItem);
    });
  });
}

export function handleBackClick() {
  refreshForm();
  hideAllButtonsExcept(['addPostBtn', 'viewCategoriesBtn']);
}

export { refreshForm, handleAddPostClick };
