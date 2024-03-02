export abstract class DbObject {
    readonly id: number;
    created: Date = new Date();

    protected constructor(id: number) {
        this.id = id;
    }
}

export class DataBaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ApiError";
    }
}