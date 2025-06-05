const { connect } = require("../db");
class Pagamento {

  constructor(pago, valor, data_pagamento, metodo_pagamento, pedido_id, _id = null) {
    this._id = _id
    this.pago = pago
    this.valor = valor
    this.data_pagamento = data_pagamento
    this.metodo_pagamento = metodo_pagamento
    this.pedido_id = pedido_id
  }

  async inserir() {
    try {
      const { db, client } = await connect();

      const result = await db.collection("pagamento").insertOne({
        pago: this.pago,
        valor: this.valor,
        data_pagamento: this.data_pagamento,
        metodo_pagamento: this.metodo_pagamento,
        pedido_id: this.pedido_id
      });
      this._id = result.insertedId

      console.log("pagamento inserido:", result.insertedId);
      client.close();

    } catch (error) {
      console.log("Erro ao inserir pagamento:", error);
    }
  }

  static async excluir(_id) {
    try {
      const { db, client } = await connect();

      const result = await db.collection("pagamento").deleteOne({ _id: _id });

      console.log("pagamento Excluido:", result.deletedCount);
      client.close();
    } catch (error) {
      console.log("Erro ao excluir pagamento:", error);
    }
  }

  static async atualizar(filtro, novosDados) {
    try {
      const { db, client } = await connect();

      const result = await
        db.collection("pagamento").updateOne(filtro, {
          $set: novosDados,
        });

      console.log("pagamento atualizados:", result.modifiedCount);
      client.close();

    } catch (error) {

      console.log("Erro ao atualizar pagamento: " + error);

    }

  }

  static async consultar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const cliente = await
        db.collection("pagamento").findOne(filtro);
      client.close();
      return cliente;
    } catch (error) {
      console.log("Erro ao buscar cliente: " + error);
    }

  }
}

module.exports = Pagamento