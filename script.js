// Get DOM elements
const incomeInput = document.getElementById("income");
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseList = document.getElementById("expenseList");
const totalIncomeElem = document.getElementById("totalIncome");
const totalExpensesElem = document.getElementById("totalExpenses");
const remainingBudgetElem = document.getElementById("remainingBudget");
const budgetChart = document.getElementById("budgetChart");

let totalIncome = 0;
let totalExpenses = 0;
let expenses = [];

// Initialize the chart
const ctx = budgetChart.getContext("2d");
const chart = new Chart(ctx, {
    type: "pie", // You can change this to 'bar', 'line', etc.
    data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
            data: [0, 0], // Placeholder data
            backgroundColor: ['#2ecc71', '#e74c3c'],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
});

// Add Expense
addExpenseBtn.addEventListener("click", () => {
    const expenseName = expenseNameInput.value;
    const expenseAmount = parseFloat(expenseAmountInput.value);

    if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
        expenses.push({ name: expenseName, amount: expenseAmount });

        // Update total expenses
        totalExpenses += expenseAmount;
        updateSummary();

        // Display the new expense in the list
        const expenseItem = document.createElement("li");
        expenseItem.textContent = `${expenseName}: $${expenseAmount.toFixed(2)}`;
        expenseList.appendChild(expenseItem);

        // Clear the inputs
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
    } else {
        alert("Please enter a valid expense name and amount.");
    }
});

// Set Income
incomeInput.addEventListener("input", () => {
    totalIncome = parseFloat(incomeInput.value);
    updateSummary();
});

// Update Summary and Chart
function updateSummary() {
    totalIncomeElem.textContent = totalIncome.toFixed(2);
    totalExpensesElem.textContent = totalExpenses.toFixed(2);
    const remainingBudget = totalIncome - totalExpenses;
    remainingBudgetElem.textContent = remainingBudget.toFixed(2);

    // Update the chart
    chart.data.datasets[0].data = [totalIncome, totalExpenses];
    chart.update();
}
