import express from "express";
import WebSocket from "ws";

const PORT = 3000;
const app = express();
const wsSocket = new WebSocket.Server({ port: 8080 });

wsSocket.on("connection", (ws) => {
  console.log("A new client connected.");
  ws.on("message", (msg) => {
    console.log("msg", msg.toString());

    // send msg to others
    wsSocket.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("A client disconnected.");
  });
});

app.listen(PORT, () => {
  console.log(`Server Started on PORT : ${PORT}`);
});
