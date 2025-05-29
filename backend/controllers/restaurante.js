const { connect } = require("../db");
class Restaurante {
  constructor(restaurante_nome, horario_abertura, horario_fechamento) {

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

      console.log("Restaurante inserido:", result.insertedId);

      client.close();

    } catch (error) {

      console.log("Erro ao inserir restaurante:", errorestaurante_nomer);

    }
  }

  async excluir() {
    try {

      const { db, client } = await connect();

      const result = await db.collection("restaurante").deleteOne({ nome: this.nome });

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

      Logger.log("Erro ao atualizar usuários: " + error);

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