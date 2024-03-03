import fs from 'fs/promises';
import { DatabaseError, DbObject, Success } from '../repository/utils.mjs';

export class Database {
    private static instance: Database;
    private path: string = "src/backend/files";
    private incrementer: Map<string, number> = new Map<string, number>();

    private constructor() { }

    public static get Instance(): Database {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }

    public async Initialize(): Promise<void> {
        await fs.readdir(this.path).then(async (files: string[]) => {
            for (const file of files) {
                await fs.readFile(`${this.path}/${file}`, "utf-8")
                    .then((data: string) => JSON.parse(data) as DbObject[])
                    .then((data: DbObject[]) => {
                        const maxId = data.reduce((acc: number, task: DbObject) => task.id > acc ? task.id : acc, 1);
                        this.incrementer.set(file.replace(/\.\w+$/, ""), maxId);
                    });
            }
        });
    }

    private async Read<T extends DbObject>(fileName: string): Promise<T[]> {
        console.log(this.incrementer.get(fileName));
        return await fs.readFile(`${this.path}/${fileName}.json`, "utf-8")
            .then((data: string) => JSON.parse(data) as T[]);
    }

    private async Write<T extends DbObject>(fileName: string, data: T[]): Promise<void | Error> {
        return await fs.writeFile(`${this.path}/${fileName}.json`, JSON.stringify(data))
            .catch((err: Error) => err);
    }

    public async Select<T extends DbObject>(fileName: string): Promise<Success<T> | Error> {
        return await this.Read<T>(fileName)
            .then((data: T[]) => new Success(data, "Data fetched successfully"))
            .catch((err: Error) => err);
    }

    public async Insert<T extends DbObject>(fileName: string, object: T): Promise<Success<T> | Error> {
        return await this.Read<T>(fileName)
            .then((data: T[]) => {
                const nextId = this.incrementer.get(fileName) || 1;
                this.incrementer.set(fileName, nextId + 1);
                object.id = nextId;
                object.created = object.created || Date.now();
                object.updated = object.updated || Date.now();
                data.push(object);
                return data;
            })
            .then((data: T[]) => {
                this.Write(fileName, data);
                return new Success([object], "Data inserted successfully");
            })
            .catch((err: Error) => err);
    }

    public async Update<T extends DbObject>(fileName: string, object: T): Promise<Success<T> | Error> {
        return await this.Read<T>(fileName)
            .then((data: T[]) => {
                const index = data.findIndex((task: DbObject) => task.id === object.id);
                if (index !== -1) {
                    object.created = data[index].created || Date.now();
                    object.updated = Date.now();
                    data[index] = object;
                    return data;
                }
                throw new DatabaseError("Task does not exist");
            })
            .then((data: T[]) => {
                this.Write(fileName, data);
                return new Success([object], "Data updated successfully");
            })
            .catch((err: Error) => err);
    }

    public async Delete<T extends DbObject>(fileName: string, id: number): Promise<Success<T> | Error> {
        return await this.Read<T>(fileName)
            .then((data: T[]) => {
                const index = data.findIndex((task: DbObject) => task.id === id);
                if (index !== -1) {
                    data.splice(index, 1);
                    return data;
                }
                throw new DatabaseError("Task does not exist");
            })
            .then((data: T[]) => { 
                this.Write(fileName, data);
                return new Success([], "Data deleted successfully");
            })
            .catch((err: Error) => err);
    }
}