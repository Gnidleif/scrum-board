export enum TaskType {
    UX,
    Backend,
    Frontend,
}

export enum TaskStatus {
    ToDo,
    InProgress,
    Done,
}

export class Task {
    public name: string = "";
    public type: TaskType | null = null;
    public status: TaskStatus | null = null;
    public developer: string = "";
}