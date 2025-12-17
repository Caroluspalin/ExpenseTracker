const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const transactionsList = document.getElementById('transactions');
const totalBalanceElement = document.getElementById('total-balance');
const totalIncomeElement = document.getElementById('total-income'); 
const totalExpensesElement = document.getElementById('total-expenses');
const filterSelect = document.getElementById('filter-type');
const resetButton = document.getElementById('reset-button');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function saveTransactions() {
    try {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (e) {
        console.error("Error while saving to localstorage:", e);
        alert("Expense update failed.");
    }
}

function addTransaction(e) {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Make sure its a number');
        return;
    }

    const transaction = {
        id: Date.now(), 
        description: description,
        amount: type === 'expense' ? -amount : amount,
        type: type
    };

    transactions.push(transaction);

    saveTransactions(); 
    
    updateUI();
    expenseForm.reset();
}

function deleteTransaction(id) {
    const transactionId = parseInt(id); 
    
    transactions = transactions.filter(transaction => transaction.id !== transactionId);

    saveTransactions(); 
    
    updateUI();
}

function resetData() {
    if (confirm('Are you sure you want to reset, cant go back!')) {
        localStorage.removeItem('transactions'); 
        
        transactions = []; 
        
        updateUI(); 
        
        alert('Reset Sucessful.');
    }
}

function updateUI() {
    const totalBalanceContainer = document.getElementById('balance-container');

    const income = transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0);

    totalIncomeElement.textContent = `${income.toFixed(2)} €`;
    totalExpensesElement.textContent = `${Math.abs(expenses).toFixed(2)} €`; 
    
    const totalBalance = income + expenses;
    totalBalanceElement.textContent = `${totalBalance.toFixed(2)} €`;

    totalBalanceContainer.classList.remove('positive', 'negative');
    if (totalBalance >= 0) {
        totalBalanceContainer.classList.add('positive');
    } else {
        totalBalanceContainer.classList.add('negative');
    }
    
    const selectedFilter = filterSelect.value;
    
    const filteredTransactions = transactions.filter(transaction => {
        if (selectedFilter === 'all') {
            return true;
        }
        return transaction.type === selectedFilter;
    });

    transactionsList.innerHTML = '';
    
    filteredTransactions.forEach(transaction => {
        const listItem = document.createElement('li');
        
        const classType = transaction.type;
        const sign = transaction.amount > 0 ? '+' : '';
        
        listItem.className = classType; 
        
        listItem.innerHTML = `
            <span>${transaction.description}</span>
            <span>${sign}${transaction.amount.toFixed(2)} €</span>
            <button class="delete-btn" data-id="${transaction.id}">X</button>
        `;
        
        transactionsList.appendChild(listItem);
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id; 
            deleteTransaction(id);
        });
    });
}

expenseForm.addEventListener('submit', addTransaction);
resetButton.addEventListener('click', resetData);
filterSelect.addEventListener('change', updateUI);

updateUI();