/**
 * PRESENTATION LAYER — Manejo de eventos Socket.io.
 * Se encarga de recibir y emitir eventos, nada más.
 * Delega la lógica al caso de uso.
 */
const SaveMessage = require("../../application/usecases/SaveMessage");
const messageRepository = require("../../infrastructure/repositories/MessageRepository");

const saveMessage = new SaveMessage(messageRepository);

function registerSocketHandlers(io) {
  io.on("connection", async (socket) => {
    console.log(`🔌 Cliente conectado: ${socket.id}`);

    // Enviar historial reciente al nuevo cliente
    try {
      const history = await messageRepository.getRecent(20);
      socket.emit("history", history);
    } catch (err) {
      console.error("Error cargando historial:", err);
    }

    // Recibir y retransmitir mensajes
    socket.on("message", async (data) => {
      try {
        const saved = await saveMessage.execute(data);
        io.emit("messages", saved);
      } catch (err) {
        console.error("Error guardando mensaje:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ Cliente desconectado: ${socket.id}`);
    });
  });
}

module.exports = registerSocketHandlers;
