const taskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-task');
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createCheckbox = function () {
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  return checkBox;
};

const createLabel = function (taskString) {
  const label = document.createElement('label');
  label.innerText = taskString;
  label.className = 'task';
  return label;
};

const createEditInput = function () {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';
  return editInput;
};

const createEditButton = function () {
  const editButton = document.createElement('button');
  //innerText encodes special characters, HTML does not.
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  return editButton;
};

const createDeleteButton = function () {
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');
  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);
  return deleteButton;
};

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  listItem.appendChild(createCheckbox());
  listItem.appendChild(createLabel(taskString));
  listItem.appendChild(createEditInput());
  listItem.appendChild(createEditButton());
  listItem.appendChild(createDeleteButton());

  return listItem;
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};
addButton.addEventListener('click', addTask);

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editBtn = taskItem.querySelector('.edit');
  const isEditing = taskItem.classList.contains('editMode');

  if (isEditing) {
    label.innerText = editInput.value;
    //innerText encodes special characters, HTML does not.
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const listContainer = taskItem.parentNode;
  listContainer.removeChild(taskItem);
};

const taskCompleted = function () {
  const taskItem = this.parentNode;
  completedTasksHolder.appendChild(taskItem);
  bindTaskEvents(taskItem, taskIncomplete);
};

const taskIncomplete = function () {
  const taskItem = this.parentNode;
  incompleteTaskHolder.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
