import express, { Express, Request, Response, response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get('/users', (req: Request, res: Response) => {
  res.send('')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

