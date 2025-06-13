const { connect } = require("../db");
const { Restaurante } = require("../models/Restaurante");
class RestauranteController {
  constructor(restaurante_nome, horario_abertura, horario_fechamento, _id = null) {
    this._id = _id
    this.restaurante_nome = restaurante_nome
    this.horario_abertura = horario_abertura
    this.horario_fechamento = horario_fechamento
  }

  validacao = (restaurante) => {
    if (!restaurante.restaurante_nome || !restaurante.horario_abertura || !restaurante.horario_fechamento) {
      console.log("Nome do restaurante e horário de abertura são obrigatórios.");
      logger("Nome do restaurante e horário de abertura são obrigatórios.");
      return false;
    }
    return true;
  }


  async inserir() {

    try {

      this.validacao(this);

      const { db, client } = await connect();

      this.consultar({ restaurante_nome: this.restaurante_nome })

      if (this._id) {
        console.log("Restaurante já existe:", this.restaurante_nome);
        logger(`Restaurante já existe: ${this.restaurante_nome}`);
        return;
      }
      else if (!this._id) {

        const restaurante = new Restaurante({
          restaurante_nome: this.restaurante_nome,
          horario_abertura: this.horario_abertura,
          horario_fechamento: this.horario_fechamento
        });

        const result = await db.collection("restaurante").insertOne(restaurante);

        if (result.insertedId === 0) {
          console.log("Erro ao inserir restaurante:", this.restaurante_nome);
          logger(`Erro ao inserir restaurante: ${this.restaurante_nome}`);
          return;
        }

        this._id = result.insertedId

        console.log("Restaurante inserido:", result.insertedId);

        client.close();
      }
    } catch (error) {
      console.log("Erro ao inserir restaurante:", errorestaurante_nomer);
      logger(`Erro ao inserir restaurante: ${error}`);
    }
  }

  static async excluir(nome) {
    try {

      const { db, client } = await connect();

      const result = await db.collection("restaurante").deleteOne({ restaurante_nome: nome });

      console.log("Restaurante Excluido:", result.deletedCount);

      client.close();

      if (result.deletedCount === 0) {

        console.log("Nenhum restaurante encontrado com o nome:", nome);

        logger(`Nenhum restaurante encontrado com o nome: ${nome}`);

      } else {

        console.log("Restaurante excluído com sucesso:", nome);

        logger(`Restaurante excluído com sucesso: ${nome}`);

      }

    } catch (error) {

      console.log("Erro ao excluir restaurante:", error);

      logger(`Erro ao excluir restaurante: ${error}`);

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
        db.collection("restaurante").findOne(filtro)
      client.close();
      return restaurante

    } catch (error) {

      console.log("Erro ao buscar restaurante: " + error);

    }

  }


}

module.exports = RestauranteController