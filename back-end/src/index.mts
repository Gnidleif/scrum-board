import express, { Express, Request, Response } from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import { Task } from './task.mjs';

const app: Express = express();
const port: number = 8080;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.get("/tasks", async (req: Request, res: Response) => {
    await fs.readFile("db/tasks.json", "utf8")
        .then((data: string) => JSON.parse(data))
        .then((tasks: Task[]) => {
            res.send(tasks);
        })
        .catch((err: Error) => {
            res.status(500).send(`Error reading tasks.json: ${err.message}`);
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});