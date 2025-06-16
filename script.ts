interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

let todos: Todo[] = [];
let editingId: number = -1;

const txtAreaTitle: HTMLTextAreaElement = document.getElementById('title') as HTMLTextAreaElement;
const txtAreaDescription: HTMLTextAreaElement = document.getElementById('description') as HTMLTextAreaElement;
const btnSubmit: HTMLButtonElement = document.getElementById('submitBtn') as HTMLButtonElement;
const divTodoList: HTMLDivElement = document.getElementById('todoList') as HTMLDivElement;

function renderTodos(): void {
  divTodoList.innerHTML = '';
  todos.forEach(todo => {
    const divTodo: HTMLDivElement = document.createElement('div');
    divTodo.className = 'todo' + (todo.done ? ' done' : '');

    const spanTitle: HTMLSpanElement = document.createElement('span');
    spanTitle.textContent = todo.title;

    const divActions: HTMLDivElement = document.createElement('div');
    divActions.className = 'actions';

    const btnDone:HTMLButtonElement = document.createElement('button');
    btnDone.textContent = '✔';
    btnDone.addEventListener('click', function () {
      todo.done = !todo.done;
      divTodo.className = 'todo' + (todo.done ? ' done' : '');
    });

    const btnUpdate:HTMLButtonElement = document.createElement('button');
    btnUpdate.textContent = '🖉';
    btnUpdate.addEventListener('click', function () {
      txtAreaTitle.value = todo.title;
      txtAreaDescription.value = todo.description;
      editingId = todo.id;
      btnSubmit.textContent = 'Update';
    });

    const btnDelete: HTMLButtonElement = document.createElement('button');
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
  const title: string = txtAreaTitle.value.trim();
  const description: string = txtAreaDescription.value.trim();
  if (!title || !description) return;

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

