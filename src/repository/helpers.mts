export abstract class DbObject {
    id: number;
    created: number = Date.now();
    updated: number = Date.now();

    protected constructor(id: number) {
        this.id = id;
    }
}

export class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ApiError";
    }
}

export class Success<T extends DbObject> {
    message: string;
    content: T[];

    constructor(content: T[], message: string) {
        this.message = message;
        this.content = content;
    }
}