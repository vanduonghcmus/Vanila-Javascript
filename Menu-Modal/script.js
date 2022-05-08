const toggle = document.getElementById("toggle");
const closeModal = document.getElementById("close");
const openModal = document.getElementById("open");
const modal = document.getElementById("modal");

// Toggle nav
toggle.addEventListener("click", () =>
  document.body.classList.toggle("show-nav")
);

// show modal
openModal.addEventListener("click", () => modal.classList.add("show-modal"));

closeModal.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);

// hide modal when click out side
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
