const { connect } = require("../db");
const cliente = require('./cliente')
class Pedido {
  constructor(quantidade_itens, pedido_total, cliente_id, restaurante_id) {

    this.quantidade_itens = quantidade_itens

    this.pedido_total = pedido_total

    this.cliente_id = cliente_id

    this.restaurante_id = restaurante_id
  }

  constructor(id_pedido) {

    this._id = id_pedido;

  }

  async inserir() {
    try {
      const { db, client } = await connect();

      const result = await db.collection("pedido").insertOne({
        quantidade_itens: this.quantidade_itens,
        pedido_total: this.pedido_total,
        cliente_id: this.cliente_id,
        restaurante_id: this.restaurante_id
      });

      console.log("Pedido:", result.insertedId);
      this._id = result.insertedId
      client.close();

    } catch (error) {
      console.log("Erro ao fazer pedido:", erro);
    }
  }

    async excluir(client_id) {
    try {

      const { db, client } = await connect();
      const result = await db.collection("pedido").deleteMany({ client_id:  client_id});

      console.log("Pedido excluido:", result.deletedCount);

      client.close();

    } catch (error) {

      console.log("Erro ao excluir pedido:", error);

    }
  }

}

module.exports = Pedido