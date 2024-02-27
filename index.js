const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["https://front-chat-bdcq3nqlk-tekeshitime.vercel.app/"],
  },
});

const PORT = 5000;

//clientと通信する
io.on("connection", (socket) => {
  console.log("clientと接続しました");

  //クライアントから受信
  socket.on("send_message", (data) => {
    console.log(data);
    //ほかのクライアントへ送信
    io.emit("received_message", data);
  });

  socket.on("disconnect", () => {
    console.log("clientと接続が切れました");
  });
});

server.listen(PORT, () => console.log(`server is running on ${PORT}`));
