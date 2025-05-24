const { connect } = require("./db");
class Cliente {
 constructor(nome, email, senha) {
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
    console.log("Cliente inserido:", result.insertedId);
    client.close();
  } catch (error) {
    console.log("Erro ao inserir cliente:", error);
  }
 }

 async excluir() {
  try {
    const { db, client } = await connect();
    const result = await db.collection("cliente").deleteOne({nome: this.nome});
    console.log("Cliente Excluido:", result.deletedCount);
    client.close();
  } catch (error) {
    console.log("Erro ao excluir usuário:", error);
  }
 }
}

module.exports = Cliente