import { hideAllButtonsExcept } from './utils.js';
import { saveToStorage, getFromStorage } from './storage.js';
import { validateForm } from './formValidator.js';
import { formFields } from './formFieldRules.js';


export function handleAddPostClick() {
  hideAllButtonsExcept(['back', 'addPostForm']);
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
  hideAllButtonsExcept(['back', 'postsListContainer']);
  document.getElementById('categoryName').textContent = `Category: ${category}`;

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
  hideAllButtonsExcept(['addPostBtn', 'viewCategoriesBtn']);
} 