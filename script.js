$(document).ready(function () {
  // Initial budget values (you can modify these as needed)
  var totalBudget = 1000;
  var remainingBudget = 1000;

  // Set initial values in the HTML
  document.getElementById('totalBudget').textContent = totalBudget;
  document.getElementById('remainingBudget').textContent = remainingBudget;

  // Create the initial budget chart
  var ctx = document.getElementById('budgetChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Total Budget', 'Remaining Budget'],
      datasets: [{
        label: 'Budget Overview',
        data: [totalBudget, remainingBudget],
        backgroundColor: ['#3498db', '#2ecc71'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Function to update the progress bar and chart
  function updateBudget(newBudget) {
    totalBudget = newBudget;
    remainingBudget = newBudget;

    // Update the HTML
    document.getElementById('totalBudget').textContent = totalBudget;
    document.getElementById('remainingBudget').textContent = remainingBudget;

    // Reset the progress bar
    updateProgressBar();

    // Reset the budget chart
    myChart.data.datasets[0].data = [totalBudget, remainingBudget];
    myChart.update();
  }

  // Function to update the progress bar
  function updateProgressBar() {
    var progress = (remainingBudget / totalBudget) * 100;
    document.getElementById('budgetProgressBar').style.width = progress + '%';
    document.getElementById('budgetProgressBar').style.backgroundColor = getBudgetColor(progress);
  }

  // Function to get the color based on budget utilization
  function getBudgetColor(progress) {
    if (progress > 80) {
      return '#e74c3c'; // Red color for high utilization
    } else if (progress > 50) {
      return '#f39c12'; // Orange color for moderate utilization
    } else {
      return '#2ecc71'; // Green color for low utilization
    }
  }

  // Function to add an expense
  function addExpense() {
    var expenseName = document.getElementById('expenseName').value;
    var expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

    if (expenseName && !isNaN(expenseAmount)) {
      // Assuming expenses will be added to a list
      var expenseList = document.getElementById('expenseList');
      var li = document.createElement('li');
      li.textContent = `${expenseName}: $${expenseAmount.toFixed(2)}`;
      expenseList.appendChild(li);

      // Update the chart with the new data
      myChart.data.datasets[0].data.push(expenseAmount);
      myChart.update();

      // Clear the input fields
      document.getElementById('expenseName').value = '';
      document.getElementById('expenseAmount').value = '';
    } else {
      alert('Please enter valid expense details.');
    }
  }

  // Attach the functions to the global scope if needed
  window.updateBudget = updateBudget;
  window.addExpense = addExpense;
});
