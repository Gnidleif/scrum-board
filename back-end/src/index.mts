import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { DatabaseReader } from './database.mjs';

const app: Express = express();
const port: number = 8080;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.get("/tasks", async (req: Request, res: Response) => {
    const allTasks = await DatabaseReader.SelectAll("tasks");
    if (allTasks instanceof Error) {
        res.status(500).send(`Error reading tasks.json: ${allTasks.message}`);
        return;
    }
    res.send(allTasks);
});

app.get("/tasks/:id", async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const task = await DatabaseReader.Select("tasks", id);
    if (task instanceof Error) {
        res.status(500).send(`Error reading tasks.json: ${task.message}`);
        return;
    }
    if (task === null) {
        res.status(204).send({});
        return;
    }
    res.send(task);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});