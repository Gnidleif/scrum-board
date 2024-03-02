import fs from 'fs/promises';

interface HasId {
    id: number;
    [key: string]: any;
}

export class DatabaseReader {
    public static async SelectAll(fileName: string): Promise<HasId[] | Error> {
        return await fs.readFile(`db/${fileName}.json`, "utf8")
            .then((data: string) => JSON.parse(data))
            .then((tasks: HasId[]) => tasks)
            .catch((err: Error) => err);
    }

    public static async Select(fileName: string, id: number): Promise<HasId | null | Error> {
        return await fs.readFile(`db/${fileName}.json`, "utf8")
            .then((data: string) => JSON.parse(data))
            .then((tasks: HasId[]) => tasks.find((t) => t.id === id) || null)
            .catch((err: Error) => err);
    }
}