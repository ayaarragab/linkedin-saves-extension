import { hideAllButtonsExcept } from './utils.js';
import { saveToStorage, getFromStorage } from './storage.js';
import { validateForm } from './formValidator.js';
import { formFields } from './formFieldRules.js';
import { populateCategories,
         isCategPopulated } from './categories.js';


const element = document.getElementById('statusMessage');

const verifyPopulate = async () => {
  if (!isCategPopulated()) {
    await populateCategories();
  }
}

const handleAddPostClick = async () => {
  hideAllButtonsExcept(['back', 'addPostForm']);
  await verifyPopulate();
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
  const statusMsg = document.getElementById('statusMessage');
  statusMsg.style.fontSize = 'larger';
  if (valid) {
    const savedPosts = await getFromStorage('savedPosts') || [];
    const categories = await getFromStorage('categories') || [];

    const isDuplicate = savedPosts.some(post_ => post_.postLink === post.postLink);
    if (isDuplicate) {
      statusMsg.style.color = 'red';
      statusMsg.textContent = 'You saved this post before!';
      return;
    }

    savedPosts.push(post);
    await saveToStorage('savedPosts', savedPosts);

    if (!categories.includes(post.category)) {
      categories.push(post.category);
      await saveToStorage('categories', categories);
    }

    statusMsg.textContent = 'Post saved successfully!';
    document.getElementById('savePostForm').reset();
  }
}


const removePost = async (postRemind) => {
  const savedPosts = await getFromStorage('savedPosts') || [];
  const updatedPosts = savedPosts.filter((post) => post.remind !== postRemind);
  await saveToStorage('savedPosts', updatedPosts);
  document.getElementById(postRemind).parentNode.style.display = "none";
}


export { removePost, refreshForm, handleAddPostClick };
