const form = document.querySelector("#add-todo");
const todoInput = document.querySelector('input[name="todo"]');
const todoContent = document.querySelector("#todoContent");
const removeButtons = document.querySelectorAll("ul button");

todoContent.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("crossed");
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newTodoDiv = document.createElement("div");
  const newTodo = document.createElement("li");
  const removeBtn = document.createElement("button");
  newTodo.innerText = todoInput.value;
  removeBtn.innerText = "X";

  if (!todoInput.value) {
    return;
  } else {
    const newLiBtn = newTodoDiv.appendChild(newTodo);
    newTodoDiv.appendChild(newLiBtn);
    newTodoDiv.appendChild(removeBtn);

    newTodoDiv.classList.add("liBtn");
    todoContent.appendChild(newTodoDiv);

    todoInput.value = "";
  }
});
