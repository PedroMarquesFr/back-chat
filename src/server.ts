import express from "express";
import dotenv from "dotenv";
import { errors, logs } from "./middlewares";
import router from "./router";
dotenv.config();

const app = express();
app.use(express.json())

app.use(logs);

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.use(router)

app.use(errors);

app.listen(process.env.PORT, () =>
  console.log(`ouvindo porta ${process.env.PORT}!`)
);
