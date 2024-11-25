document.addEventListener("DOMContentLoaded", () => {
  const addPostBtn = document.getElementById("addPostBtn");
  const viewCategoriesBtn = document.getElementById("viewCategoriesBtn");
  const addPostForm = document.getElementById("addPostForm");
  const categoriesListContainer = document.getElementById("categoriesListContainer");
  const postsListContainer = document.getElementById("postsListContainer");

  const categoriesList = document.getElementById("categoriesList");
  const postsList = document.getElementById("postsList");

  // Show Add Post Form
  addPostBtn.addEventListener("click", () => {
    addPostForm.style.display = "block";
    categoriesListContainer.style.display = "none";
    postsListContainer.style.display = "none";
  });

  // Show Categories List
  viewCategoriesBtn.addEventListener("click", () => {
    addPostForm.style.display = "none";
    categoriesListContainer.style.display = "block";
    postsListContainer.style.display = "none";
    loadCategories();
  });

  // Save a Post
  const savePostForm = document.getElementById("savePostForm");
  savePostForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const postLink = document.getElementById("postLink").value;
    const remind = document.getElementById("remind").value;
    const category = document.getElementById("category").value;

    chrome.storage.local.get("savedPosts", (result) => {
      const savedPosts = result.savedPosts || [];
      savedPosts.push({ postLink, remind, category });
      chrome.storage.local.set({ savedPosts });

      document.getElementById("statusMessage").textContent = "Post saved successfully!";
      savePostForm.reset();
    });
  });

  // Load Categories
  function loadCategories() {
    chrome.storage.local.get("savedPosts", (result) => {
      const savedPosts = result.savedPosts || [];
      const categories = [...new Set(savedPosts.map(post => post.category))];

      categoriesList.innerHTML = "";
      categories.forEach((category) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = category;
        link.addEventListener("click", () => {
          loadPostsForCategory(category);
        });
        listItem.appendChild(link);
        categoriesList.appendChild(listItem);
      });

      if (categories.length === 0) {
        categoriesList.textContent = "No categories found.";
      }
    });
  }

  // Load Posts for a Selected Category
  function loadPostsForCategory(category) {
    addPostForm.style.display = "none";
    categoriesListContainer.style.display = "none";
    postsListContainer.style.display = "block";
    document.getElementById("categoryName").textContent = `Category: ${category}`;

    chrome.storage.local.get("savedPosts", (result) => {
      const savedPosts = result.savedPosts || [];
      const filteredPosts = savedPosts.filter(post => post.category === category);

      postsList.innerHTML = "";
      filteredPosts.forEach(post => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = post.postLink;
        link.textContent = post.remind;
        link.target = "_blank";
        listItem.appendChild(link);
        postsList.appendChild(listItem);
      });

      if (filteredPosts.length === 0) {
        postsList.textContent = "No posts found for this category.";
      }
    });
  }
});
