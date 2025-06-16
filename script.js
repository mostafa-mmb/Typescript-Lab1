"use strict";
let todos = [];
let editingId = -1;
const txtAreaTitle = document.getElementById('title');
const txtAreaDescription = document.getElementById('description');
const btnSubmit = document.getElementById('submitBtn');
const divTodoList = document.getElementById('todoList');
function renderTodos() {
    divTodoList.innerHTML = '';
    todos.forEach(todo => {
        const divTodo = document.createElement('div');
        divTodo.className = 'todo' + (todo.done ? ' done' : '');
        const spanTitle = document.createElement('span');
        spanTitle.textContent = todo.title;
        const divActions = document.createElement('div');
        divActions.className = 'actions';
        const btnDone = document.createElement('button');
        btnDone.textContent = '✔';
        btnDone.addEventListener('click', function () {
            todo.done = !todo.done;
            divTodo.className = 'todo' + (todo.done ? ' done' : '');
        });
        const btnUpdate = document.createElement('button');
        btnUpdate.textContent = '🖉';
        btnUpdate.addEventListener('click', function () {
            txtAreaTitle.value = todo.title;
            txtAreaDescription.value = todo.description;
            editingId = todo.id;
            btnSubmit.textContent = 'Update';
        });
        const btnDelete = document.createElement('button');
        btnDelete.textContent = '🗑';
        btnDelete.addEventListener('click', function () {
            todos = todos.filter(t => t.id !== todo.id);
            renderTodos();
        });
        divActions.append(btnDone, btnUpdate, btnDelete);
        divTodo.append(spanTitle, divActions);
        divTodoList.appendChild(divTodo);
    });
}
btnSubmit.addEventListener('click', function () {
    const title = txtAreaTitle.value.trim();
    const description = txtAreaDescription.value.trim();
    if (!title || !description)
        return;
    if (editingId !== -1) {
        const todo = todos.find(t => t.id === editingId);
        if (todo) {
            todo.title = title;
            todo.description = description;
        }
        editingId = -1;
        btnSubmit.textContent = 'Add';
    }
    else {
        todos.push({
            id: Date.now(),
            title,
            description,
            done: false
        });
    }
    txtAreaTitle.value = '';
    txtAreaDescription.value = '';
    renderTodos();
});
