import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { Database } from './database.mjs';
import { Task } from '../repository/task.mjs';
import { DatabaseError } from '../repository/helpers.mjs';

const app: Express = express();
const port: number = 8080;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

async function HandleResponse(answer: any, res: Response) {
    if (answer instanceof Error) {
        if (answer instanceof DatabaseError) {
            res.status(400).send(answer.message);
        } else {
            res.status(500).send(answer.message);
        }
    }
    else if (answer === null || answer === undefined || !answer.length) {
        res.status(204).send();
    }
    else {
        res.status(200).send(answer);
    }
}

app.get("/", async (_: Request, res: Response) => {
    Database.Instance.Select<Task>("tasks")
        .then((answer: Task[] | Error) => HandleResponse(answer, res));
});

app.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    Database.Instance.Select<Task>("tasks", id)
        .then((answer: Task[] | Error) => HandleResponse(answer, res));
});

app.post("/", async (req: Request, res: Response) => {
    const task: Task = req.body;
    Database.Instance.Insert<Task>("tasks", task)
        .then((answer: void | Error) => HandleResponse(answer, res));
});

app.put("/", async (req: Request, res: Response) => {
    const task: Task = req.body;
    Database.Instance.Update<Task>("tasks", task)
        .then((answer: void | Error) => HandleResponse(answer, res));
});

app.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    Database.Instance.Delete<Task>("tasks", id)
        .then((answer: void | Error) => HandleResponse(answer, res));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});