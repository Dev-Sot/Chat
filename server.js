const express = require("express");
<<<<<<< HEAD
const { connectDB } = require("./src/infrastructure/db/mongoConnection");
const registerSocketHandlers = require("./src/presentation/socket/socketHandler");

const app = express();
=======
const app = express();

//socket
>>>>>>> 475c89df84bdaeb3c081ae2feda87c4348f6e4cc
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

<<<<<<< HEAD
// Servir el frontend estático
app.use(express.static(__dirname));

// Registrar handlers de Socket.io (capa de presentación)
registerSocketHandlers(io);

// Iniciar servidor solo después de conectar a la DB
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    http.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("No se pudo conectar a MongoDB:", err);
    process.exit(1);
  });
=======
io.on("connection", (socket) => {  
  socket.on("message", (message) => {
    io.emit("messages", message );
  });
});

//inicio del servidor
http.listen(3000, () => {
  console.log("Server Running");
});
>>>>>>> 475c89df84bdaeb3c081ae2feda87c4348f6e4cc
