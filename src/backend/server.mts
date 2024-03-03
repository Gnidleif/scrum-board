import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { Database } from './database.mjs';
import { Task, TaskStatus, TaskType } from '../repository/task.mjs';
import { DatabaseError, DbObject, Success } from '../repository/utils.mjs';

const app: Express = express();
const port: number = 8080;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

await Database.Instance.Initialize();

async function HandleResponse<T extends DbObject>(answer: Success<T> | Error, res: Response) {
    if (answer instanceof Error) {
        if (answer instanceof DatabaseError) {
            res.status(400).send(answer.message);
        } else {
            res.status(500).send(answer.message);
        }
    }
    else if (answer.content.length === 0) {
        res.status(204).send(answer);
    }
    else {
        res.status(200).send(answer);
    }
}

app.get("/", async (_: Request, res: Response) => {
    Database.Instance.Select<Task>("tasks")
        .then((answer: Success<Task> | Error) => HandleResponse(answer, res));
});

app.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    Database.Instance.Select<Task>("tasks")
        .then((answer: Success<Task> | Error) => {
            if (answer instanceof Error) {
                HandleResponse(answer, res);
            } else {
                const task = answer.content.find((task: Task) => task.id === id);
                answer.content = task ? [task] : [];
                HandleResponse(answer, res);
            }
        });
});

app.get("/type/:type", async (req: Request, res: Response) => {
    const type: TaskType = Number(req.params.type) as TaskType;
    Database.Instance.Select<Task>("tasks")
        .then((answer: Success<Task> | Error) => {
            if (answer instanceof Error) {
                HandleResponse(answer, res);
            } else {
                const filtered = answer.content.filter((task: Task) => task.type === type);
                answer.content = filtered;
                HandleResponse(answer, res);
            }
        });
});

app.get("/status/:status", async (req: Request, res: Response) => {
    const status: TaskStatus = Number(req.params.status) as TaskStatus;
    Database.Instance.Select<Task>("tasks")
        .then((answer: Success<Task> | Error) => {
            if (answer instanceof Error) {
                HandleResponse(answer, res);
            } else {
                const filtered = answer.content.filter((task: Task) => task.status === status);
                answer.content = filtered;
                HandleResponse(answer, res);
            }
        });
});

app.post("/", async (req: Request, res: Response) => {
    const task: Task = req.body;
    Database.Instance.Insert<Task>("tasks", task)
        .then((answer: Success<Task> | Error) => HandleResponse(answer, res));
});

app.put("/", async (req: Request, res: Response) => {
    const task: Task = req.body;
    Database.Instance.Update<Task>("tasks", task)
        .then((answer: Success<Task> | Error) => HandleResponse(answer, res));
});

app.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    Database.Instance.Delete<Task>("tasks", id)
        .then((answer: Success<Task> | Error) => HandleResponse(answer, res));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});