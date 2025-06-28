const { connect } = require("../database/db");
const { logger } = require("../logger");
const Cliente = require('../models/ClienteModel');

class ClienteController {
  constructor(nome, email, senha, _id = null) {
    this._id = _id
    this.nome = nome
    this.email = email
    this.senha = senha
  }

  validar() {
    if (!this.nome || !this.email || !this.senha) {
      logger("Erro: Nome, email e senha são obrigatórios.");
      throw new Error("Nome, email e senha são obrigatórios.");
    }

    if (this.senha.length < 6) {
      logger("Erro: Senha deve ter pelo menos 6 caracteres.");
      throw new Error("Senha deve ter pelo menos 6 caracteres.");
    }
  }


  async inserir() {

    try {

      this.validar();

      const existeCliente = await ClienteController.consultar({ email: this.email });

      if (existeCliente) {

        console.log("Cliente já existe:", this.email);

        console.log("---------------------------------------");

        logger("Cliente já existe: " + this.email);

        return;
      }
      else {

        console.log("---------------------------------------");

        console.log("Inserindo novo cliente:", this.nome);

        const result = await db.collection("cliente").insertOne({

          nome: this.nome,

          email: this.email,

          senha: this.senha

        });

        console.log("Cliente inserido:", result.insertedId);

        logger("Cliente inserido: " + JSON.stringify({

          nome: this.nome,

          email: this.email,

          _id: result.insertedId

        }));

      }

      client.close();


    } catch (error) {

      logger("Erro ao inserir cliente: " + error);

      console.error("Erro ao inserir cliente: " + error);

      throw error;

    }
  }


  static async consultar(filtro = {}) {
    try {

      const cliente = await Cliente.findOne(filtro);

      if (!cliente) {

        console.log("Cliente não encontrado");

        logger("Cliente não encontrado: " + JSON.stringify(filtro));

        return;

      } else {

        console.log("---------------------------------------");

        console.log("Cliente consultado:", cliente.nome);

        client.close();

        return cliente;

      }

    } catch (error) {

      console.error("Erro ao buscar cliente: " + error);

      throw error;
    }

  }


  static async excluir(filtro = {}) {

    try {
      const { db, client } = await connect();

      const result = await db.collection("cliente").deleteOne(filtro);

      if (result.deletedCount === 0) {

        console.log("---------------------------------------");

        console.log("Nenhum cliente foi excluído");

        logger("Nenhum cliente foi excluído: " + JSON.stringify(filtro));

        return;

      } else {

        console.log("Cliente Excluido:", result.deletedCount);

        client.close();

      }

    } catch (error) {

      console.log("Erro ao excluir usuário:", error);

      logger("Erro ao excluir usuário: " + error);

    }


  }

  static async atualizar(filtro, novosDados) {

    try {
      const { db, client } = await connect();

      const result = await
        db.collection("cliente").updateOne(filtro, {
          $set: novosDados,
        });

      if (result && result.modifiedCount === 0) {
        console.log("---------------------------------------");

        console.log("Cliente não encontrado ou nenhum dado para atualizar.");

        logger("Cliente não encontrado ou nenhum dado para atualizar: " + JSON.stringify(filtro));

        return;

      } else {
        console.log("cliente atualizados:", result.modifiedCount);

      }

      client.close();

    } catch (error) {

      console.log("Erro ao atualizar cliente: " + error);

    }

  }

}

module.exports = ClienteController;