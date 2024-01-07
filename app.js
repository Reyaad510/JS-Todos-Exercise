const form = document.querySelector("#add-todo");
const todoInput = document.querySelector('input[name="todo"]');
const todoContent = document.querySelector("#todoContent");
const removeButtons = document.querySelectorAll("ul button");

let todoObj = JSON.parse(localStorage.getItem("todos")) || [];

// Initialized Page on reload
for (let todo of todoObj) {
  const newTodoDiv = document.createElement("div");
  const newTodo = document.createElement("li");
  const removeBtn = document.createElement("button");

  const newLiBtn = newTodoDiv.appendChild(newTodo);
  newTodo.innerText = todo.text;

  if (todo.checked === "true") {
    newTodo.classList.add("crossed");
  }

  removeBtn.innerText = "X";

  newTodoDiv.appendChild(newLiBtn);
  newTodoDiv.appendChild(removeBtn);

  newTodoDiv.classList.add("liBtn");
  todoContent.appendChild(newTodoDiv);
}

todoContent.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    removeToDo(e);
  } else if (e.target.tagName === "LI") {
    completedTask(e);
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

    todoObj.push({
      text: todoInput.value,
      checked: false,
    });
    localStorage.setItem("todos", JSON.stringify(todoObj));
    console.log(localStorage);

    todoInput.value = "";
  }
});

// Remove Element and update local storage to reflect that change on window reload
const removeToDo = (e) => {
  e.target.parentElement.remove();

  for (let i = 0; i < todoObj.length; i++) {
    if (
      e.target.parentElement.querySelector("li").innerText === todoObj[i].text
    ) {
      todoObj.splice(i, 1);
      localStorage.setItem("todos", JSON.stringify(todoObj));
    }
  }
};

// Updates a task to be completed and update localstorage to reflect that change on window reload
const completedTask = (e) => {
  e.target.classList.toggle("crossed");
  if (e.target.className === "crossed") {
    todoObj.find(function (todoText) {
      if (todoText.text === e.target.innerText) {
        todoText.checked = "true";
        localStorage.setItem("todos", JSON.stringify(todoObj));
      }
    });
  } else {
    todoObj.find(function (todoText) {
      if (todoText.text === e.target.innerText) {
        todoText.checked = "false";
        localStorage.setItem("todos", JSON.stringify(todoObj));
      }
    });
  }
};
