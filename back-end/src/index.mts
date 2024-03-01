import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port: number = 8080;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello index.again!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});