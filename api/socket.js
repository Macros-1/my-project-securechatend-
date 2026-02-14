import { Server } from "socket.io";

let io;

export default function handler(req, res) {
  if (!res.socket.server.io) {
    io = new Server(res.socket.server, {
      path: "/api/socket"
    });

    res.socket.server.io = io;

    io.on("connection", socket => {

      socket.on("joinRoom", room => {
        socket.join(room);
      });

      socket.on("move", data => {
        io.to(data.room).emit("move", data);
      });

      socket.on("chat", data => {
        io.to(data.room).emit("chat", data);
      });

      socket.on("typing", data => {
        socket.to(data.room).emit("typing", data);
      });

      socket.on("truthDare", data => {
        io.to(data.room).emit("truthDare", data);
      });

    });
  }

  res.end();
}
