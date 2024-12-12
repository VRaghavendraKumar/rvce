// Get references to the DOM elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filters button');

// Initialize tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks to the DOM
function renderTasks(filter = 'all') {
    taskList.innerHTML = ''; // Clear the task list
    let filteredTasks = tasks; // Default to all tasks

    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    // Render filtered tasks
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add(task.completed ? 'completed' : '');
        li.innerHTML = `
            ${task.name}
            <button class="delete-btn" onclick="deleteTask(${task.id})">X</button>
            <input type="checkbox" class="complete-task" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${task.id})" />
        `;
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName === '') {
        alert('Please enter a task!');
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName,
        completed: false
    };
    
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks in localStorage
    taskInput.value = ''; // Clear input field
    renderTasks(); // Re-render the tasks
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks in localStorage
    renderTasks(); // Re-render the tasks
}

// Function to toggle task completion
function toggleComplete(taskId) {
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks in localStorage
    renderTasks(); // Re-render the tasks
}

// Event listener for "Add Task" button
addTaskButton.addEventListener('click', addTask);

// Event listeners for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        renderTasks(filter); // Filter tasks based on the selected button
    });
});

// Initial rendering of tasks
renderTasks();
