// --- DOM Elements ---
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

// --- State Management ---
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// --- Formatter for Currency (Professional Look) ---
const formatter = new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR'
});

// --- Functions ---

function saveTransactions() {
    try {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (e) {
        console.error("Error saving to localStorage:", e);
        alert("Could not save data.");
    }
}

function addTransaction(e) {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid description and amount.');
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: type === 'expense' ? -amount : amount,
        type: type,
        date: new Date().toLocaleDateString('fi-FI') 
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
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
        localStorage.removeItem('transactions');
        transactions = [];
        updateUI();
    }
}

function updateUI() {
    // 1. Calculate Totals
    const amounts = transactions.map(t => t.amount);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0);

    const expense = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0);

    const total = income + expense;

    // 2. Update Balance Display
    totalBalanceElement.innerText = formatter.format(total);
    totalIncomeElement.innerText = formatter.format(income);
    totalExpensesElement.innerText = formatter.format(Math.abs(expense));

    // 3. Filter List
    const selectedFilter = filterSelect.value;
    const filteredTransactions = transactions.filter(transaction => {
        if (selectedFilter === 'all') return true;
        return transaction.type === selectedFilter;
    });

    // 4. Render List
    transactionsList.innerHTML = '';

    if (filteredTransactions.length === 0) {
        transactionsList.innerHTML = '<p style="text-align:center; opacity:0.5; margin-top:20px;">No transactions found.</p>';
        return;
    }

    filteredTransactions.forEach(transaction => {
        const sign = transaction.amount > 0 ? '+' : '';
        const itemClass = transaction.amount > 0 ? 'income' : 'expense';
        
        const li = document.createElement('li');
        li.classList.add('transaction-item', itemClass);
        
        li.innerHTML = `
            <div class="tx-info">
                <span class="tx-desc">${transaction.description}</span>
                <span class="tx-date">${transaction.date || 'Today'}</span>
            </div>
            
            <div class="tx-right">
                <span class="tx-amount">${sign} ${formatter.format(Math.abs(transaction.amount))}</span>
                <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        `;

        transactionsList.appendChild(li);
    });
}

// --- Event Listeners ---
expenseForm.addEventListener('submit', addTransaction);
resetButton.addEventListener('click', resetData);
filterSelect.addEventListener('change', updateUI);

// Initial Load
updateUI();