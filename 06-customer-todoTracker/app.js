// Get references to input fields and todo list container
const customerInput = document.getElementById('customerName');
const statusInput = document.getElementById('todoStatus');
const todoList = document.getElementById('todoList');
const taskChart = document.getElementById('taskChart').getContext('2d');
const completedBadge = document.getElementById('completedCount');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let chart = null;

// Add a new To-Do item
function addTodo() {
  const customerName = customerInput.value.trim();
  const todoStatus = statusInput.value;

  if (customerName === '') {
    alert('Please enter a customer name');
    return;
  }

  const todo = {
    id: Date.now(),
    customer: customerName,
    status: todoStatus,
  };

  todos.push(todo);
  updateLocalStorage();
  renderTodos();
  updateChart();

  // Clear input fields
  customerInput.value = '';
  statusInput.value = 'Not Complete';
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Render the list of To-Do items
function renderTodos() {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('list-group-item', 'todo-item');
    
    const text = document.createElement('span');
    text.textContent = `${todo.customer} - Status: ${todo.status}`;
    
    const actions = document.createElement('div');
    actions.classList.add('actions');
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('btn', 'btn-success', 'edit-button');
    editButton.onclick = () => editTodo(todo.id);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'btn-danger', 'delete-button');
    deleteButton.onclick = () => deleteTodo(todo.id);

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    todoItem.appendChild(text);
    todoItem.appendChild(actions);
    
    todoList.appendChild(todoItem);
  });

  updateCompletedBadge();
}

// Edit an existing To-Do item
function editTodo(id) {
  const todo = todos.find(t => t.id === id);
  const newCustomer = prompt('Edit customer name:', todo.customer);
  const newStatus = prompt('Edit status (Complete, Not Complete, No Home, Reschedule, Order Parts):', todo.status);

  if (newCustomer !== null && newStatus !== null) {
    todo.customer = newCustomer;
    todo.status = newStatus;
    updateLocalStorage();
    renderTodos();
    updateChart();
  }
}

// Delete a To-Do item
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  updateLocalStorage();
  renderTodos();
  updateChart();
}

// Render Pie Chart.js for task completion status
function updateChart() {
  const statusCounts = {
    Complete: 0,
    'Not Complete': 0,
    'No Home': 0,
    'Reschedule': 0,
    'Order Parts': 0,
  };

  todos.forEach(todo => {
    statusCounts[todo.status]++;
  });

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(taskChart, {
    type: 'pie',
    data: {
      labels: Object.keys(statusCounts),
      datasets: [{
        label: 'Task Status',
        data: Object.values(statusCounts),
        backgroundColor: [
          '#28a745', // Complete
          '#dc3545', // Not Complete
          '#ffc107', // No Home
          '#17a2b8', // Reschedule
          '#6f42c1', // Order Parts
        ],
        borderWidth: 1,
      }]
    },
  });
}

// Update the completed tasks badge
function updateCompletedBadge() {
  const completedCount = todos.filter(todo => todo.status === 'Complete').length;
  completedBadge.textContent = `${completedCount} Completed`;
}

// Initialize the app
renderTodos();
updateChart();