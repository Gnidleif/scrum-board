import { DbObject } from "./dbobject.mjs";

export enum TaskType {
    UX,
    Backend,
    Frontend,
}

export enum TaskStatus {
    Todo,
    InProgress,
    Done,
    Deleted,
}

export class Task implements DbObject {
    id: number;
    title: string;
    developer: string;
    type: TaskType;
    status: TaskStatus;

    constructor(id: number, title: string, developer: string, type: TaskType, status: TaskStatus) {
        this.id = id;
        this.title = title;
        this.developer = developer;
        this.type = type;
        this.status = status;
    }
}