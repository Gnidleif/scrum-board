import { DbObject } from "./utils.mjs";

export enum TaskType {
    UX,
    Backend,
    Frontend,
}

export enum TaskStatus {
    Todo,
    InProgress,
    Done,
}

export class Task extends DbObject {
    title: string;
    type: TaskType;
    developer: string = "";
    status: TaskStatus = TaskStatus.Todo;

    constructor(title: string, type: TaskType) {
        super();
        this.title = title;
        this.type = type;
    }
}