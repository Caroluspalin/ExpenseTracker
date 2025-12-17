<img width="1440" height="900" alt="Screenshot 2025-12-17 at 2 16 16" src="https://github.com/user-attachments/assets/b333765d-1f7e-48fe-be0a-3a131cd709c8" />
🚀 Expense Tracker (Kuluseuraaja)
This is a responsive, single-page application built to track personal income and expenses. It provides a real-time overview of financial health and saves all data locally in the user's browser.

✨ Key Features
Add Transactions: Easily add new income or expense entries with a description, amount, and type (income/expense).

Dynamic Summary: Calculates and displays the Total Balance, Total Income, and Total Expenses in real-time.

Balance Visual Feedback: The Total Balance is visually color-coded (Green for positive, Red for negative) for quick financial assessment.

Transaction List: Displays a complete list of transactions, color-coded by type.

Delete Entries: Each transaction can be individually deleted from the list.

Filtering: Allows the user to filter the transaction list to show only Income, only Expenses, or All entries.

Data Persistence: Uses the browser's Local Storage API to ensure all transactions are saved and persist even if the page is reloaded or the browser is closed.

Reset Function: Includes a dedicated button to clear all stored data and reset the tracker to zero.

🛠️ Technologies Used
HTML5 (Structure and Semantics)

CSS3 (Styling, Dark Mode, Flexbox/Grid for layout)

JavaScript (ES6+) (Core logic and DOM manipulation)

🎯 Learning & Practice Points
This project served as an excellent opportunity to practice and implement several core JavaScript and web development concepts, particularly the following features for the first time:

1. Local Storage Implementation

This was the first time implementing full data persistence using the browser's native storage. This involved:

Loading data on startup (JSON.parse(localStorage.getItem(...))).

Saving data upon every modification (localStorage.setItem(..., JSON.stringify(...))).

2. Advanced Array Methods (Functional JS)

The project heavily relies on modern JavaScript array methods for clean and efficient data processing:

Array.prototype.filter(): Used extensively for calculating total income and total expenses, and for implementing the list filtering feature.

Array.prototype.reduce(): Used to aggregate transaction amounts for calculating the totals and net balance.

3. Dynamic DOM Manipulation

The entire list of transactions is built dynamically in JavaScript based on the transactions array. This ensures that the UI is always a direct reflection of the underlying data state.

4. Event Delegation

Handling delete functionality by attaching a single event listener to the container (or relying on individual listeners for dynamically created elements) and reading the transaction ID via data-id attributes.

⚙️ How to Run
Clone this repository (or copy the HTML, CSS, and JS files into a single folder).

Open index.html in your web browser.
