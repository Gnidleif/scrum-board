export abstract class DbObject {
    id: number = 0;
    created: number = Date.now();
    updated: number = Date.now();
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