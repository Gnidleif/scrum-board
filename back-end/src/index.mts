import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { DatabaseReader, DbObject } from './database.mjs';

const app: Express = express();
const port: number = 8080;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.get("/tasks", async (req: Request, res: Response) => {
    const allTasks = await DatabaseReader.ReadAll("tasks");
    if (allTasks instanceof Error) {
        res.status(500).send(`Error reading tasks.json: ${allTasks.message}`);
        return;
    }
    res.send(allTasks);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});