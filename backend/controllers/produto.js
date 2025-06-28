const Produto = require('../models/ProdutoModel');

class ProdutoController {
  constructor(nome, preco, _id = null) {
    this._id = _id;
    this.nome = nome;
    this.preco = preco;
  }

  async inserir() {
    try {
      const existe = await Produto.findOne({ nome: this.nome });
      if (existe) {
        console.log("Produto já existe:", existe._id);
        return existe;
      }

      const novoProduto = new Produto({
        nome: this.nome,
        preco: this.preco
      });

      const salvo = await novoProduto.save();
      console.log("Produto inserido:", salvo._id);
      return salvo;
    } catch (error) {
      console.error("Erro ao inserir produto:", error);
      throw error;
    }
  }

  static async consultar(filtro = {}) {
    try {
      if (filtro.id) {
        filtro._id = filtro.id;
        delete filtro.id;
      }

      const produto = await Produto.findOne(filtro);
      if (!produto) {
        console.log("Produto não encontrado.");
        return null;
      }

      console.log("Produto consultado:", produto.nome);
      return produto;
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      throw error;
    }
  }

    static async pegarProdutoPorId(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID inválido');
      }
      const produto = await Produto.findById(id);
      return produto;
    } catch (error) {
      throw new Error('Erro ao buscar produto por ID: ' + error.message);
    }
  }

  static async listaProdutos(){

    try{
      const listaDeProdutos = await Produto.find();
      return listaDeProdutos;
    }
    catch (error) {
      console.error('Erro ao carregar produtos:', error);
      res.status(500).send('Erro interno do servidor');
    }
  }




}

module.exports = ProdutoController;