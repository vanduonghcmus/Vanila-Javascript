const balances = document.getElementById("balances");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// mock data
// const dummyTransaction = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// add Transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    // clear form
    text.value = "";
    amount.value = "";
  }
}

// generate Id
function generateID() {
  return Math.floor(Math.random() * 100000);
}

// Add transaction
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  // create item
  const item = document.createElement("li");

  // add class
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })" >X</button>
  `;

  list.appendChild(item);
}

// update the balance, income and expense
function updateValues() {
  const amount = transactions.map((transaction) => transaction.amount);

  const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amount
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amount.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
  balances.innerText = `${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by Id
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();
  init();
}

// update local storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init App
function init() {
  list.innerHTML = "";

  updateValues();
  transactions.forEach((transaction) => {
    addTransactionDOM(transaction);
  });
}
init();

form.addEventListener("submit", addTransaction);
