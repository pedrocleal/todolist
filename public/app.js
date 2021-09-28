const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOpt = document.querySelector('.todo-filter');

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', completeTodo);
filterOpt.addEventListener('click', filterTodo);

function addTodo(event) {
  event.preventDefault();
  
  if (todoInput.value === '') {
    alert('Não é possível adicionar um ToDo vazio!');
    return 1;
  }
  //Create TODO div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  
  saveLocalTodos(todoInput.value); //Add to localStorage
   
  //Create TODO li 
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo-item');
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);
  
  //Create complete task button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  //Create delete task button 
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add('delete-btn');
  todoDiv.appendChild(deleteButton);

  //Append to list 
  todoList.appendChild(todoDiv);

  //Clear input value
  todoInput.value = '';
}

function completeTodo(event) {
  const item = event.target;
  console.log(item);

  if(item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', () => {
      todo.remove();
    })
  }

  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch(event.target.value) {
      case "all": 
        todo.style.display = 'flex';
        break;
      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    } 
  });
} 

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null ) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null ) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach((todo) => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    //Create TODO li 
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);
    
    //Create complete task button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //Create delete task button 
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    //Append to list 
    todoList.appendChild(todoDiv);
  });
}
 
function removeLocalTodos(todo) {
  let todos; 
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}