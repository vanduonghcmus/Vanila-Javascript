const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const hideBtn = document.getElementById("hide");
const showBtn = document.getElementById("show");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardEl = [];

// Store card data

const cardsData = getCardsData();

// const cardData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];

// Create all cards
function createCards() {
  cardsData.forEach((data, idx) => createCard(data, idx));
}

// Create Single card
function createCard(data, idx) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (idx === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `
        <div class="inner-card">
          <div class="inner-card-front">
            <p>${data.question}</p>
          </div>
          <div class="inner-card-back">
            <p>${data.answer}</p>
          </div>
        </div>
  `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // add DOM card
  cardEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show number of card
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardEl.length}`;
}

createCards();

// Gets cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards ?? [];
}

// set card to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

// Event Listener

// Next Button
nextBtn.addEventListener("click", () => {
  cardEl[currentActiveCard].classList = "card left";
  currentActiveCard += 1;

  if (currentActiveCard > cardEl.length - 1) {
    currentActiveCard = cardEl.length - 1;
  }

  cardEl[currentActiveCard].classList = "card active";
  updateCurrentText();
});

// Prev Button
prevBtn.addEventListener("click", () => {
  cardEl[currentActiveCard].classList = "card right";
  currentActiveCard -= 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardEl[currentActiveCard].classList = "card active";
  updateCurrentText();
});

// show add container
showBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});

// hide add container
hideBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});

// Add new card
addBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  const newCard = { question, answer };

  questionEl.value = "";
  answerEl.value = "";

  addContainer.classList.remove("show");

  cardsData.push(newCard);
  setCardsData(cardsData);
});

// clear all card
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("cards");
  cardsContainer.innerHTML = "";
  window.location.reload();
});
