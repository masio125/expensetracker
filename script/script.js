const balance = document.querySelector(".balance");
const moneyPlus = document.querySelector(".money-plus");
const moneyMinus = document.querySelector(".money-minus");
const list = document.querySelector(".list");
const form = document.querySelector(".form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("test");
  } else {
    const transaction = {
      id: getID(),
      name: text.value,
      amount: +amount.value,
    };
    console.log(transaction);

    transactions.push(transaction);
    displayTransaction(transaction);
    updateBalance();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

function getID() {
  return Math.floor(Math.random() * 10000000);
}

function displayTransaction(transaction) {
  const sign = transaction.amount > 0 ? "+" : "-";
  const item = document.createElement("li");
  item.classList.add(transaction.amount > 0 ? "plus" : "minus");
  item.innerHTML = ` ${transaction.name} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="btnDelete" onclick="removeTransaction(${
    transaction.id
  })">X</button>`;
  list.appendChild(item);
}
function updateBalance() {
  const amount = transactions.map((transaction) => transaction.amount);

  const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amount
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = amount
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  balance.innerText = `${total}`;
  moneyPlus.innerText = `${income}`;
  moneyMinus.innerText = `${expense}`;
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}
function init() {
  list.innerHTML = ``;
  transactions.forEach(displayTransaction);
  updateBalance();
}
init();

form.addEventListener("submit", addTransaction);
