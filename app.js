const form = document.querySelector("#add-todo");
const todoInput = document.querySelector('input[name="todo"]');
const todoContent = document.querySelector("#todoContent");
const removeButtons = document.querySelectorAll("ul button");

// if page empty and nothing to parse will set todoObj to empty array
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

// Looks for click on "Delete" button and on the "Text" li for completed tasks
todoContent.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    removeToDo(e);
  } else if (e.target.tagName === "LI") {
    completedTask(e);
  }
});

// Form submission when submit new todo
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo(e);
});

// Add new todo to page
const addTodo = (e) => {
  const newTodoDiv = document.createElement("div");
  const newTodo = document.createElement("li");
  const removeBtn = document.createElement("button");

  // If user does not input anything then an empty todo will not be created
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

    // Create new todo as an object that is stored in an array
    todoObj.push({
      text: todoInput.value,
      checked: false,
    });
    localStorage.setItem("todos", JSON.stringify(todoObj));

    // After user submits it will clear text in the input field so user can type another task
    todoInput.value = "";
  }
};

// Remove Element and update local storage to reflect that change on window reload
const removeToDo = (e) => {
  e.target.parentElement.remove();

  // Looping through todoObj array and finding the correct todo by comparing the text key/value pair
  for (let i = 0; i < todoObj.length; i++) {
    if (
      e.target.parentElement.querySelector("li").innerText === todoObj[i].text
    ) {
      // passing in index from todoObj array and removing it
      todoObj.splice(i, 1);
      localStorage.setItem("todos", JSON.stringify(todoObj));
    }
  }
};

// Updates a task to be completed and update localstorage to reflect that change on window reload
const completedTask = (e) => {
  e.target.classList.toggle("crossed");
  if (e.target.className === "crossed") {
    // Looping through todoObj and comparing text key/value pair to update "checked" value to true or false
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
