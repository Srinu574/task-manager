const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render Tasks
function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    tasks
        .filter(task => {
            if (filter === "completed") return task.completed;
            if (filter === "pending") return !task.completed;
            return true;
        })
        .forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task.text;

            if (task.completed) {
                li.classList.add("completed");
            }

            li.addEventListener("click", () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks(filter);
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";

            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                tasks.splice(index, 1);
                saveTasks();
                renderTasks(filter);
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
}

// Add Task
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
});

// Filter
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        renderTasks(button.dataset.filter);
    });
});

// Initial Load
renderTasks();
