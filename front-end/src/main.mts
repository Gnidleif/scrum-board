import { Task, TaskStatus, TaskType } from "./task.mjs";

await fetch("http://127.0.0.1:8080/tasks")
    .then((response: Response) => response.json())
    .then((tasks: Task[]) => {
        for (const task of tasks) {
            if (task.status === null || task.type === null) {
                throw new Error("Invalid task");
            }
            console.log(task);
        }
    });

await fetch("http://127.0.0.1:8080/tasks/3")
    .then((response: Response) => response.json())
    .then((task: Task) => {
        if (task.status === null || task.type === null) {
            throw new Error("Invalid task");
        }
        console.log(task);
    });

const select_type: HTMLSelectElement = document.querySelector("#task-type") as HTMLSelectElement;
for (const key in Object.keys(TaskType).filter((k) => isNaN(Number(k)))) {
    const option: HTMLOptionElement = document.createElement("option");
    option.value = key;
    option.text = TaskType[key];
    select_type.appendChild(option);
}

document.querySelector("#add-task")!.addEventListener("submit", async (evt: Event) => {
    evt.preventDefault();
    const name: string = (document.querySelector("#task-name") as HTMLInputElement).value;
    const type: number = Number(select_type.value);

    const task: Task = new Task();
    task.name = name;
    task.type = type;
    task.status = TaskStatus.ToDo;
    console.log(task);
});