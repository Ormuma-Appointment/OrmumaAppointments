import express from "express";
import helmet from "helmet";
import MainRouter from "./routes";

const app = express();
app.use(express.json());
app.use(helmet());

app.use(MainRouter);

app.listen(5050, () => {
  console.log("Express listening on http://localhost:5050");
});