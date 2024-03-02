import { DbObject } from "./helpers.mjs";

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
    developer: string;
    type: TaskType;
    status: TaskStatus;

    constructor(id: number, title: string, developer: string, type: TaskType, status: TaskStatus) {
        super(id);
        this.title = title;
        this.developer = developer;
        this.type = type;
        this.status = status;
    }
}