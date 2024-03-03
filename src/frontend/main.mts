import { Task, TaskStatus, TaskType } from "../repository/task.mjs";

const addTask = document.querySelector("#add-task-form")! as HTMLFormElement;
const taskType = addTask.querySelector("#task-type-select")! as HTMLSelectElement;

addTask.addEventListener("submit", async (event: Event) => {
    event.preventDefault();
    const taskName = addTask.querySelector("#task-name-input") as HTMLInputElement;
    const task = new Task(taskName.value, Number(taskType.value) as TaskType);
    await fetch("http://127.0.0.1:8080/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
    addTask.reset();
});

for (const key in TaskType) {
    if (isNaN(parseInt(key))) {
        const option = document.createElement("option");
        option.value = TaskType[key];
        option.text = key;
        taskType.appendChild(option);
    }
}

const taskTypes = document.querySelector("#task-types-list")! as HTMLUListElement;
const taskTypeTemplate = taskTypes.querySelector("#task-type-template")! as HTMLTemplateElement;
for (const key in TaskType) {
    if (isNaN(parseInt(key))) {
        const taskType = taskTypeTemplate.content.cloneNode(true) as HTMLElement;
        const span = taskType.querySelector("span")!;
        span.classList.add(key.toLowerCase());
        span.textContent = key;
        taskTypes.appendChild(taskType);
    }
}

const tasksTable = document.querySelector("#tasks-table")! as HTMLTableElement;
const taskHeaderTemplate = tasksTable.querySelector("#tasks-header-template")! as HTMLTemplateElement;
const taskRowTemplate = tasksTable.querySelector("#tasks-row-template")! as HTMLTemplateElement;
for (const key in TaskStatus) {
    if (isNaN(parseInt(key))) {
        const header = taskHeaderTemplate.content.cloneNode(true) as HTMLElement;
        const th = header.querySelector("th")!;
        th.classList.add(key.toLowerCase());
        th.textContent = key;
        tasksTable.querySelector("thead > tr")!.appendChild(header);

        const row = taskRowTemplate.content.cloneNode(true) as HTMLElement;
        const td = row.querySelector("td")!;
        td.classList.add(key.toLowerCase());
        tasksTable.querySelector("tbody > tr")!.appendChild(row);
    }
}