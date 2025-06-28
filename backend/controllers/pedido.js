const { connect } = require("../database/db");

class Pedido {
  constructor(quantidade_itens, pedido_total, cliente_id, restaurante_id, _id = null) {
    this._id = _id
    this.quantidade_itens = quantidade_itens
    this.pedido_total = pedido_total
    this.cliente_id = cliente_id
    this.restaurante_id = restaurante_id
  }


  async inserir() {
    try {
      const { db, client } = await connect();

      const result = await db.collection("pedido").insertOne({
        quantidade_itens: this.quantidade_itens,
        pedido_total: this.pedidos_total,
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

  static async excluir(client_id) {
    try {

      const { db, client } = await connect();
      const result = await db.collection("pedido").deleteMany({ cliente_id: client_id });
      console.log("Pedidos excluidos:", result.deletedCount);
      client.close();
    } catch (error) {
      console.log("Erro ao excluir pedido:", error);
    }
  }

  static async consultar(filtro = {}) {

    try {
      const { db, client } = await connect();
      const pedido = await
        db.collection("pedido").findOne(filtro);
      client.close();
      return pedido;

    } catch (error) {
      console.log("Erro ao busca pedido:" + error);
    }
  }

}

module.exports = Pedido