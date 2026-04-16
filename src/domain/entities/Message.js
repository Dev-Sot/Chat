/**
 * DOMAIN LAYER — Entidad pura, sin dependencias externas.
 * Define qué es un mensaje en términos del negocio.
 */
class Message {
  constructor({ name, message, createdAt = new Date() }) {
    this.name = name;
    this.message = message;
    this.createdAt = createdAt;
  }
}

module.exports = Message;
