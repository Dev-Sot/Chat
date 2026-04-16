/**
 * INFRASTRUCTURE LAYER — Repositorio de mensajes.
 * Esta es la capa externa que habla con MongoDB.
 * El dominio y los casos de uso NO conocen esta implementación.
 */
const { getDB } = require("../db/mongoConnection");
const Message = require("../../domain/entities/Message");

const COLLECTION = "messages";

class MessageRepository {
  /**
   * Persiste un mensaje en MongoDB.
   * @param {Message} message
   * @returns {Promise<Message>}
   */
  async save(message) {
    const db = getDB();
    const doc = {
      name: message.name,
      message: message.message,
      createdAt: message.createdAt,
    };
    const result = await db.collection(COLLECTION).insertOne(doc);
    return { ...message, _id: result.insertedId };
  }

  /**
   * Retorna los últimos N mensajes para mostrar historial al conectarse.
   * @param {number} limit
   * @returns {Promise<Message[]>}
   */
  async getRecent(limit = 20) {
    const db = getDB();
    const docs = await db
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return docs.reverse().map((d) => new Message(d));
  }
}

module.exports = new MessageRepository();
