import express from "express";
import dotenv from "dotenv";
import { errors, logs } from "./middlewares";
import router from "./router";

import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

dotenv.config();

const app = express();
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // url aceita pelo cors
    methods: ["GET", "POST"], // Métodos aceitos pela url
  },
});

app.use(express.json())

app.use(cors());

app.use(logs);

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.use(router)

app.use(errors);

io.on("connection", (socket: Socket) => {
  console.log("Conectado");
  socket.on("disconnect", () => {
    console.log("Desconectado");
  });
  socket.on("mensagem", (msg) => {
    console.log(`Mensagem ${msg}`);
    io.emit('mensagemServer', {mensagem: msg} )
  });

  socket.on("emit-test",({msg})=>{
    console.log(msg)
  })
  socket.emit("ola", "Bem vindo");
  socket.broadcast.emit('mensagemServer', { mensagem: ' Iiiiiirraaaa! Fulano acabou de se conectar :D'});
});

// http.listen(3002, () =>
//   console.log(`ouvindo porta ${process.env.PORT}!`)
// );

httpServer.listen(3002, () =>
  console.log(`socket porta 3002!`)
);
app.listen(process.env.PORT, () =>
  console.log(`ouvindo porta ${process.env.PORT}!`)
);
