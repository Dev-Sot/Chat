const express = require("express");
const { connectDB } = require("./src/infrastructure/db/mongoConnection");
const registerSocketHandlers = require("./src/presentation/socket/socketHandler");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

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
