import express, { Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";
import routesTodo from "./routes/todos";

const app = express();

const PORT = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/todos", routesTodo);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
