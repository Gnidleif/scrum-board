export enum TaskType {
    Error,
    UX,
    Backend,
    Frontend,
}

export enum TaskStatus {
    Error,
    ToDo,
    InProgress,
    Done,
}

export class Task {
    public id: number = -1;
    public name: string = "";
    public type: TaskType = TaskType.Error;
    public status: TaskStatus = TaskStatus.Error;
    public developer: string = "";
}