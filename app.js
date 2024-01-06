const form = document.querySelector("#add-todo");
const todoInput = document.querySelector('input[name="todo"]');
const todoContent = document.querySelector("#todoContent");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;

  todoContent.append(newTodo);
});
