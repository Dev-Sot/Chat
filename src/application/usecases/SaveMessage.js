/**
 * APPLICATION LAYER — Caso de uso: guardar un mensaje.
 * Orquesta la entidad del dominio y el repositorio.
 * No sabe si la base de datos es Mongo, Postgres u otra cosa.
 */
const Message = require("../../domain/entities/Message");

class SaveMessage {
  /**
   * @param {import("../../infrastructure/repositories/MessageRepository")} messageRepository
   */
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  /**
   * @param {{ name: string, message: string }} data
   * @returns {Promise<Message>}
   */
  async execute(data) {
    const message = new Message(data);
    return await this.messageRepository.save(message);
  }
}

module.exports = SaveMessage;
