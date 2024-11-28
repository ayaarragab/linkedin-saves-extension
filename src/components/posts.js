import { hideAllButtonsExcept } from './utils.js';
import { saveToStorage, getFromStorage } from './storage.js';
import { validateForm } from './formValidator.js';
import { formFields } from './formFieldRules.js';
import { handleViewCategoriesClick } from './categories.js';
import { createRemoveBtns } from './categories.js';

const element = document.getElementById('statusMessage');

const populateCategories = async () => {
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
    const categories = await getFromStorage('categories') || [];
    savedPosts.push(post);
    await saveToStorage('savedPosts', savedPosts);
    if (!categories.includes(post.category)) {
      categories.push(post.category);
      await saveToStorage('categories', categories);
    }
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

const removePost = async (postRemind) => {
  const savedPosts = await getFromStorage('savedPosts') || [];
  const updatedPosts = savedPosts.filter((post) => post.remind !== postRemind);
  await saveToStorage('savedPosts', updatedPosts);
  document.getElementById(postRemind).parentNode.style.display = "none";
}


export function handleBackClick() {
  refreshForm();
  if (document.getElementById('categoriesListContainer').style.display === 'block') {
    hideAllButtonsExcept(['addPostBtn', 'viewCategoriesBtn']);
  } else {
    handleViewCategoriesClick();
  }
}

export { refreshForm, handleAddPostClick };
