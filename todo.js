let newTaskInput = document.querySelector("#TaskInput");
let addTaskButton = document.querySelector("#AddTaskBtn");
let filter = document.querySelector("#FilterInput");
let clear = document.querySelector("#ClearBtn");
let list = document.querySelector("#TaskList");

addTaskButton.addEventListener("click", addTask);
newTaskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask(e);
  }
});
// EventListener for edit btn
document.addEventListener("click", function (e) {
  const editBtn = e.target.closest(".edit-btn");
  if (!editBtn) return;
  const newText = prompt("Edit your task:");
  if (newText === null || newText.trim() === "") return;

  // UI update
  const li = e.target.closest("li");
  const id = li.dataset.id;
  console.log(li);
  console.log(id);
  li.querySelector("span").innerText = newText;

  // localStorage update
  editTaskInLocalStorage(id, newText);
});
// eventListeners
filter.addEventListener("keyup", filterTasks);
clear.addEventListener("click", clearTasks);
window.addEventListener("load", getTasks);
list.addEventListener("click", removeTask);
// Add Task
function addTask(e) {
  e.preventDefault();
  if (newTaskInput.value === "") {
    alert("please Write Some thing!");
    return;
  }
  const taskObj = {
    id: Date.now(),
    text: newTaskInput.value,
  };
  adTaskInUI(taskObj);
  storeTaskInLocalStorage(taskObj);
  newTaskInput.value = "";
}
// Add task in UI
function adTaskInUI(taskObj) {
  let li = document.createElement("li");
  li.dataset.id = taskObj.id;
  let btnDiv = document.createElement("div");
  let outerDiv = document.createElement("div");
  outerDiv.className = "outer-div";
  btnDiv.className = "buttonDiv";
  let span = document.createElement("span");
  let button = document.createElement("button");

  button.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
  let editBtn = document.createElement("button");
  editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
  editBtn.className = "edit-btn";
  editBtn.dataset.id = taskObj.id;
  span.innerText = taskObj.text;
  button.id = "del";
  outerDiv.appendChild(span);
  outerDiv.appendChild(btnDiv);
  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(button);
  li.appendChild(outerDiv);
  list.appendChild(li);
}

// Edit a Task

function editTaskInLocalStorage(id, newText) {
  let Listed_Items = JSON.parse(localStorage.getItem("Listed Tasks")) || [];
  console.log("new text is ", newText);
  Listed_Items = Listed_Items.map((item) => {
    if (item.id === Number(id)) {
      console.log("Item id:", item.id);
      console.log("edited id:", id);
      return {
        ...item,
        text: newText,
      };
    }
    return item;
  });

  localStorage.setItem("Listed Tasks", JSON.stringify(Listed_Items));
}
// Fillter Tasks
function filterTasks(e) {
  let text = e.target.value.toLowerCase();
  document.querySelectorAll("#TaskList li").forEach((item) => {
    let itemText = item.querySelector("span").textContent.toLowerCase();
    if (itemText.includes(text)) {
      item.style.display = "list-item";
    } else {
      item.style.display = "none";
    }
  });
}

// Clear Tasks
function clearTasks() {
  if (confirm("Are you Sure Want to Delete All Tasks?")) {
    list.innerHTML = "";
  }
  localStorage.clear();
}
// Remove Tasks
function removeTask(e) {
  e.preventDefault();
  const delet = e.target.closest("#del");
  if (!delet) return;
  {
    let element = delet.closest("li");
    let id = element.dataset.id;
    element.remove();
    removeTaskFromLocalStorage(id);
  }
}
// Function to remove task from local storage
function removeTaskFromLocalStorage(id) {
  let Listed_Items = JSON.parse(localStorage.getItem("Listed Tasks")) || [];
  Listed_Items = Listed_Items.filter((item) => {
    return item.id !== Number(id);
  });

  localStorage.setItem("Listed Tasks", JSON.stringify(Listed_Items));
}
// Get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("Listed Tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("Listed Tasks"));
  }
  tasks.forEach((task) => {
    adTaskInUI(task);
  });
}
// Store in loacal storage
function storeTaskInLocalStorage(taskObj) {
  let Listed_Items;
  if (localStorage.getItem("Listed Tasks") === null) {
    Listed_Items = [];
  } else {
    Listed_Items = JSON.parse(localStorage.getItem("Listed Tasks"));
  }
  Listed_Items.push(taskObj);
  localStorage.setItem("Listed Tasks", JSON.stringify(Listed_Items));
}
