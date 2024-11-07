// Mock data for testing frontend functionality
let tasks = [
  { _id: '1', name: 'Task 1', importance: 'High', reminder: '2024-11-06', category: 'Work', dueDate: '2024-11-10', completed: false },
  { _id: '2', name: 'Task 2', importance: 'Low', reminder: '2024-11-06', category: 'Personal', dueDate: '2024-11-12', completed: false },
];

// Fetch tasks (from mock data)
const getTasks = () => {
  renderTasks(tasks); // Directly render tasks from mock data
};

// Render tasks on the frontend
const renderTasks = (tasks) => {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear current task list
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span>${task.name}</span> 
      <span>(${task.importance})</span> 
      <span>Due: ${new Date(task.dueDate).toLocaleString()}</span>
      <span>Reminder: ${new Date(task.reminder).toLocaleString()}</span>
      <span>Category: ${task.category}</span>
      <span>Status: ${task.completed ? 'Completed' : 'Incomplete'}</span>
      <button onclick="markComplete('${task._id}')">Complete</button>
      <button onclick="deleteTask('${task._id}')">Delete</button>
      <button onclick="editTask('${task._id}')">Edit</button>
    `;
    taskList.appendChild(taskItem);
  });
};

// Add new task (mock functionality)
const addNewTask = (event) => {
  event.preventDefault();
  const taskName = document.getElementById('task-name').value;
  const importance = document.getElementById('importance').value;
  const reminder = document.getElementById('reminder').value;
  const category = document.getElementById('category').value;
  const dueDate = document.getElementById('due-date').value;

  const newTask = {
    _id: Date.now().toString(), // Unique ID using timestamp
    name: taskName,
    importance,
    reminder,
    category,
    dueDate,
    completed: false,
  };

  tasks.push(newTask); // Add to the mock data array
  renderTasks(tasks);  // Re-render tasks list
};

// Mark task as complete (mock functionality)
const markComplete = (id) => {
  const taskIndex = tasks.findIndex(task => task._id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true; // Mark the task as complete
    renderTasks(tasks); // Re-render task list
  }
};

// Delete task (mock functionality)
const deleteTask = (id) => {
  tasks = tasks.filter(task => task._id !== id); // Remove task from mock data
  renderTasks(tasks); // Re-render task list
};

// Edit task (not implemented, but can be added later)
const editTask = (id) => {
  // For now, just log the task to edit
  const task = tasks.find(task => task._id === id);
  console.log('Edit task:', task);
};

// Call getTasks on page load
document.addEventListener('DOMContentLoaded', () => {
  getTasks();

  const taskForm = document.getElementById('task-form-content');
  taskForm.addEventListener('submit', addNewTask);
});
