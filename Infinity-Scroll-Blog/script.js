const postContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}?_page=${page}`
  );

  const data = await res.json();

  return data;
}

// Show Post in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>`;

    postContainer.appendChild(postEl);
  });
}

// show loading and fetch more
function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// Filter Posts by input
function filterPosts(e) {
  const temp = e.target.value.toUpperCase();

  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();
    if (title.indexOf(temp) > -1 || body.indexOf(temp) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

// show init posts
showPosts();

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});
filter.addEventListener("input", filterPosts);
