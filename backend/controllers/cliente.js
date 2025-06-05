const { connect } = require("../db");
class Cliente {
  constructor(nome, email, senha, _id = null) {
    this._id = _id
    this.nome = nome
    this.email = email
    this.senha = senha
  }

  async inserir() {
    try {
      const { db, client } = await connect();

      const result = await db.collection("cliente").insertOne({
        nome: this.nome,
        email: this.email,
        senha: this.senha
      });
      this._id = result.insertedId

      console.log("Cliente inserido:", result.insertedId);
      client.close();

    } catch (error) {
      console.log("Erro ao inserir cliente:", error);
    }
  }

  static async excluir(_id) {
    try {
      const { db, client } = await connect();

      const result = await db.collection("cliente").deleteOne({ _id: _id });

      console.log("Cliente Excluido:", result.deletedCount);
      client.close();
    } catch (error) {
      console.log("Erro ao excluir usuário:", error);
    }
  }

  static async atualizar(filtro, novosDados) {
    try {
      const { db, client } = await connect();

      const result = await
        db.collection("cliente").updateOne(filtro, {
          $set: novosDados,
        });

      console.log("cliente atualizados:", result.modifiedCount);
      client.close();

    } catch (error) {

      console.log("Erro ao atualizar cliente: " + error);

    }

  }

  static async consultar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const cliente = await
        db.collection("cliente").findOne(filtro);
      client.close();
      return cliente;
    } catch (error) {
      console.log("Erro ao buscar cliente: " + error);
    }

  }
}

module.exports = Cliente