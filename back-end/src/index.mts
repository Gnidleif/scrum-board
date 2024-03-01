import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
const port: number = 8080;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("hello from node!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});