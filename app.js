const form = document.querySelector("#add-todo");
const todoInput = document.querySelector('input[name="todo"]');
const todoContent = document.querySelector("#todoContent");
const removeButtons = document.querySelectorAll("ul button");
let todoArr = JSON.parse(localStorage.getItem("todos")) || [];

for (let todo of todoArr) {
  const newTodoDiv = document.createElement("div");
  const newTodo = document.createElement("li");
  const removeBtn = document.createElement("button");

  const newLiBtn = newTodoDiv.appendChild(newTodo);
  newTodo.innerText = todo;
  removeBtn.innerText = "X";

  newTodoDiv.appendChild(newLiBtn);
  newTodoDiv.appendChild(removeBtn);

  newTodoDiv.classList.add("liBtn");
  todoContent.appendChild(newTodoDiv);
}

// console.log(localStorage);

todoContent.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
    // console.log(e.target.parentElement.querySelector("li").innerText);
    // localStorage.clear();
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("crossed");
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newTodoDiv = document.createElement("div");
  const newTodo = document.createElement("li");
  const removeBtn = document.createElement("button");

  if (!todoInput.value) {
    return;
  } else {
    const newLiBtn = newTodoDiv.appendChild(newTodo);
    newTodo.innerText = todoInput.value;
    removeBtn.innerText = "X";

    newTodoDiv.appendChild(newLiBtn);
    newTodoDiv.appendChild(removeBtn);

    newTodoDiv.classList.add("liBtn");
    todoContent.appendChild(newTodoDiv);

    todoArr.push(todoInput.value);
    localStorage.setItem("todos", JSON.stringify(todoArr));

    todoInput.value = "";
  }
});
