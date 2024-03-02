import fs from 'fs/promises';

class Incrementer {
    private static id: number = -1;

    public static nextId(): number {
        return ++Incrementer.id;
    }
}

export class DbObject {
    private id: number;

    constructor() {
        this.id = Incrementer.nextId();
    }

    get Id(): number {
        return this.id;
    }
}

export class DatabaseReader {
    public static async ReadAll(fileName: string): Promise<DbObject[] | Error> {
        return await fs.readFile(`db/${fileName}.json`, "utf8")
            .then((data: string) => JSON.parse(data))
            .then((tasks: DbObject[]) => tasks)
            .catch((err: Error) => err);
    }

    public static async ReadById(fileName: string, id: number): Promise<DbObject | null | Error> {
        return await fs.readFile(`db/${fileName}.json`, "utf8")
            .then((data: string) => JSON.parse(data))
            .then((tasks: DbObject[]) => tasks.find((t) => t.Id === id) || null)
            .catch((err: Error) => err);
    }
}