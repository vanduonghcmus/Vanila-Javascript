const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Elon Musk",
  "Bernard Arnault",
  "Bill Gates",
  "Mark Zuckerberg",
  "Warren Buffett",
  "Larry Ellison",
  "Larry Page",
  "Sergey Brin",
  "Sergey Brin",
];

// Store Item
const listItems = [];

let dragstartIndex;
// update list
createList();

// Insert list items to DOM
function createList() {
  [...richestPeople]
    .map((it) => ({ value: it, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((it) => it.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
      <p class="person-name">${person}</p>
      <i class="fas fa-grip-lines"></i>
    </div>
    `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  // add Event listener
  addEventListeners();
}

function dragstart() {
  // console.log("dragstart");
  dragstartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  // console.log("dragEnter");
  this.classList.add("over");
}

function dragLeave() {
  // console.log("dragLeave");
  this.classList.remove("over");
}

function dragOver(e) {
  // console.log("dragOver");
  e.preventDefault();
}

function dragDrop() {
  // console.log("dragDrop");
  const dragEndIndex = this.getAttribute("data-index");
  swapItem(dragstartIndex, dragEndIndex);
  this.classList.remove("over");
}

// Swap Item when drag and drop
function swapItem(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  // @todo add new item child override old item child in listItem with index
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// check order
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.add("right");
      listItem.classList.remove("wrong");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragstart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
