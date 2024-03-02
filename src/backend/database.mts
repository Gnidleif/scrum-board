import fs from 'fs/promises';
import { DbObject } from '../repository/dbobject.mjs';

export class Database {
    private static path: string = "src/backend/files";

    public static async SelectAll<T extends DbObject>(fileName: string): Promise<T[] | null | Error> {
        return await fs.readFile(`${this.path}/${fileName}.json`, "utf-8")
            .then((data: string) => JSON.parse(data) as T[])
            .catch((err: Error) => err);
    }

    public static async Select<T extends DbObject>(fileName: string, id: number): Promise<T | null | Error> {
        return await fs.readFile(`${this.path}/${fileName}.json`, "utf-8")
            .then((data: string) => JSON.parse(data) as T[])
            .then((data: T[]) => data.find((task: T) => task.id === id) ?? null)
            .catch((err: Error) => err);
    }
}