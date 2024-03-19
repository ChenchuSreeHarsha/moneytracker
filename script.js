document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expenses');
  
    expenseForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const description = document.getElementById('expense-description').value;
      const amount = document.getElementById('expense-amount').value;
  
      await fetch('/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description, amount })
      });
  
      // Clear form fields
      document.getElementById('expense-description').value = '';
      document.getElementById('expense-amount').value = '';
  
      // Refresh expense list
      fetchExpenses();
    });
  
    // Function to fetch and display expenses
    async function fetchExpenses() {
      expenseList.innerHTML = '';
  
      const response = await fetch('/expenses');
      const expenses = await response.json();
  
      expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.description}: $${expense.amount}`;
        expenseList.appendChild(li);
      });
    }
  
    // Initial fetch of expenses
    fetchExpenses();
  });
  