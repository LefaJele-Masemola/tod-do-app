const baseUrl = 'http://localhost:5000/api/tasks'; // Update with the correct API route

// Fetch tasks from the server
const getTasks = async () => {
  try {
    const response = await fetch(baseUrl);
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
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
      <button onclick="markComplete('${task._id}')">Complete</button>
      <button onclick="deleteTask('${task._id}')">Delete</button>
      <button onclick="editTask('${task._id}')">Edit</button>
    `;
    taskList.appendChild(taskItem);
  });
};

// Add new task
const addNewTask = async (event) => {
  event.preventDefault();
  const taskName = document.getElementById('task-name').value;
  const importance = document.getElementById('importance').value;
  const reminder = document.getElementById('reminder').value;
  const category = document.getElementById('category').value;
  const dueDate = document.getElementById('due-date').value;

  const newTask = { name: taskName, importance, reminder, category, dueDate };

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    const addedTask = await response.json();
    renderTasks([addedTask]); // Update the task list with the new task
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

// Mark task as complete
const markComplete = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}/complete`, { method: 'PATCH' });
    const updatedTask = await response.json();
    getTasks(); // Refresh task list
  } catch (error) {
    console.error('Error marking task as complete:', error);
  }
};

// Delete task
const deleteTask = async (id) => {
  try {
    await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    getTasks(); // Refresh task list
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

// Edit task (not yet implemented)
const editTask = async (id) => {
  // Implement editing functionality here
};

// Call getTasks on page load
document.addEventListener('DOMContentLoaded', () => {
  getTasks();

  const taskForm = document.getElementById('task-form-content');
  taskForm.addEventListener('submit', addNewTask);
});
