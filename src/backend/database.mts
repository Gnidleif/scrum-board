import fs from 'fs/promises';
import { DataBaseError, DbObject } from '../repository/helpers.mjs';

export class Database {
    private static instance: Database;
    private path: string = "files";

    private constructor() { }

    public static get Instance(): Database {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }

    private async Read<T extends DbObject>(fileName: string): Promise<T[]> {
        return await fs.readFile(`${this.path}/${fileName}.json`, "utf-8")
            .then((data: string) => JSON.parse(data) as T[]);
    }

    private async Write<T extends DbObject>(fileName: string, data: T[]): Promise<void | Error> {
        return await fs.writeFile(`${this.path}/${fileName}.json`, JSON.stringify(data))
            .catch((err: Error) => err);
    }

    public async Select<T extends DbObject>(fileName: string, id: number | null = null): Promise<T[] | Error> {
        return await this.Read<T>(fileName)
            .then((data: T[]) => {
                if (id !== null) {
                    return data.filter((task: T) => task.id === id);
                }
                return data;
            })
            .catch((err: Error) => err);
    }

    public async Insert<T extends DbObject>(fileName: string, object: T): Promise<void | Error> {
        return await this.Read<T>(fileName)
            .then((data: T[]) => {
                const index = data.findIndex((task: DbObject) => task.id === object.id);
                if (index === -1) {
                    object.created = object.created || new Date();
                    data.push(object);
                    return data;
                }
                throw new DataBaseError("Task already exists");
            })
            .then((data: T[]) => this.Write(fileName, data))
            .catch((err: Error) => err);
    }

    public async Update<T extends DbObject>(fileName: string, object: T): Promise<void | Error> {
        return await this.Read<T>(fileName)
            .then((data: T[]) => {
                const index = data.findIndex((task: DbObject) => task.id === object.id);
                if (index !== -1) {
                    data[index] = object;
                    return data;
                }
                throw new DataBaseError("Task does not exist");
            })
            .then((data: T[]) => this.Write(fileName, data))
            .catch((err: Error) => err);
    }

    public async Delete<T extends DbObject>(fileName: string, id: number): Promise<void | Error> {
        return await this.Read<T>(fileName)
            .then((data: T[]) => {
                const index = data.findIndex((task: DbObject) => task.id === id);
                if (index !== -1) {
                    data.splice(index, 1);
                    return data;
                }
                throw new DataBaseError("Task does not exist");
            })
            .then((data: T[]) => this.Write(fileName, data))
            .catch((err: Error) => err);
    }
}