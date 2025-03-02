document.addEventListener("DOMContentLoaded", () => {
  const todoinput = document.getElementById("todo-input");
  const addTaskbtn = document.getElementById("addTask");
  const lstitems = document.getElementById("todolist");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task));

  addTaskbtn.addEventListener("click", () => {
    const tasktset = todoinput.value.trim();
    if (tasktset === "") return;
    const newTask = {
      id: Date.now(),
      text: tasktset,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoinput.value = "";
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
      <span>${task.text}</span> 
      <button>delete</button>`;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      lstitems.removeChild(li);
    });

    lstitems.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
