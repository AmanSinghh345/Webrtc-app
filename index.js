const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded"); // ✅ fixed
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    // ✅ fixed
    io.to(userToCall).emit("callUser", { signal: signalData, from, name }); // ✅ fixed
  });

  socket.on("answerCall", (data) => {
    // ✅ fixed
    io.to(data.to).emit("callAccepted", data.signal); // ✅ fixed
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
