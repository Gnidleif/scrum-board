import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { Database } from './database.mjs';
import { Task } from '../repository/task.mjs';
import { DbObject } from '../repository/dbobject.mjs';

const app: Express = express();
const port: number = 8080;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

async function HandleRequest<T extends DbObject>(callback: () => Promise<T | T[] | null | Error>, res: Response) {
    const answer = await callback();
    if (answer instanceof Error) {
        res.status(500).send(answer.message);
    }
    else if (answer === null) {
        res.status(204).send();
    }
    else {
        res.status(200).send(answer);
    }
}

app.get("/", async (_: Request, res: Response) => {
    HandleRequest(() => Database.SelectAll<Task>("tasks"), res);
});

app.get("/:id", async (req: Request, res: Response) => {
    HandleRequest(() => Database.Select<Task>("tasks", parseInt(req.params.id)), res);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});