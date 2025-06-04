const { connect } = require("../db");
class Restaurante {
  constructor(restaurante_nome, horario_abertura, horario_fechamento, _id = null) {
    this._id = _id
    this.restaurante_nome = restaurante_nome
    this.horario_abertura = horario_abertura
    this.horario_fechamento = horario_fechamento
  }
  
  async inserir() {
    try {

      const { db, client } = await connect();

      const result = await db.collection("restaurante").insertOne({
        restaurante_nome: this.restaurante_nome,
        horario_abertura: this.horario_abertura,
        horario_fechamento: this.horario_fechamento
      });

      this._id = result.insertedId
      console.log("Restaurante inserido:", result.insertedId);
      client.close();
    } catch (error) {
      console.log("Erro ao inserir restaurante:", errorestaurante_nomer);
    }
  }

  static async excluir(nome) {
    try {

      const { db, client } = await connect();
      const result = await db.collection("restaurante").deleteOne({ restaurante_nome: nome });
      console.log("Restaurante Excluido:", result.deletedCount);
      client.close();
    } catch (error) {
      console.log("Erro ao excluir restaurante:", error);
    }
  }

  static async atualizar(filtro, novosDados) {

    try {
      const { db, client } = await connect();

      const result = await
        db.collection("restaurante").updateMany(filtro, {
          $set: novosDados,
        });
      console.log("Restaurante atualizados:", result.modifiedCount);
      client.close();

    } catch (error) {
      console.log("Erro ao atualizar restaurante: " + error);
    }

  }

  static async consultar(filtro = {}) {

    try {

      const { db, client } = await connect();

      const restaurante = await

        db.collection("restaurante").find(filtro).toArray();

      console.log("Restaurante encontrados:", restaurante);

      client.close();

    } catch (error) {

      Logger.log("Erro ao buscar restaurante: " + error);

    }

  }


}

module.exports = Restaurante