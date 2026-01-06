let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function addTask() {
  const text = document.getElementById("taskInput").value;
  if (!text) return;

  tasks.push({ id: Date.now(), text, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById("taskInput").value = "";
  render();
}

function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

function setFilter(f) {
  filter = f;
  render();
}

function render() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks
    .filter(t =>
      filter === "all" ||
      (filter === "done" && t.done) ||
      (filter === "pending" && !t.done)
    )
    .forEach(t => {
      list.innerHTML += `
        <li>
          <span class="${t.done ? 'done' : ''}"
                onclick="toggleTask(${t.id})">
            ${t.text}
          </span>
          <button onclick="toggleTask(${t.id})">✔</button>
        </li>
      `;
    });
}

render();
