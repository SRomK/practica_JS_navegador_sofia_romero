// se introduce un concepto y se agrega un li de ese concepto en el historial (tambien necesito que se puedan borrar)
// y dependiendo de si es gasto se agrega un colorcito y otro para ingreso
// y se muestra sumado arriba los gastos y los ingresos y arriba de todo tu ahorro (hacer las cuentas para esos elementos0)
// mi AHORRO es la diferencia entre ingreso y gastos (ingresos - gastos)

const balance = document.getElementById("ahorroTotal");
const moneyPlus = document.getElementById("moneyPlus");
const moneyLess = document.getElementById("moneyLess");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("input-text");
const amount = document.getElementById("input-amount");


const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions: [];


// Add transaction

function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === ""){
        alert("Por favor ingresa texto y valor")
    }
    else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateLocalStorage();
    updateValues();
    text.value = "";
    amount.value = "";
    }
}

//Generate id

function generateID() {
    return Math.floor(Math.random()*1000000000);
}


function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    )

    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeItem(${transaction.id})">X</button>
    `;

    list.appendChild(item);
}


// removeItem

function removeItem(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
    Init();
    updateLocalStorage();
}

// Update updateValues

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item),0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc,item) => (acc += item), 0).toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc,item) => (acc += item), 0)* -1
    ).toFixed(2);

    balance.innerText = `€${total}`;
    moneyPlus.innerText = `€${income}`;
    moneyLess.innerText = `€${expense}`;
}

// Update Local Storage
function updateLocalStorage() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

// Init app

function Init(){
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}


//addTransactionDOM(transactions);
Init();

form.addEventListener("submit", addTransaction);



/* 
const dummyTransaction = [
    { id: 1, text: "Flower", amount: -20 },
    { id: 2, text: "Salary", amount: 300 },
    { id: 3, text: "Book", amount: -10 },
    { id: 4, text: "Camera", amount: 150 },
];
*/