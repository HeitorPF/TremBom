
const Produto = require('../models/ProdutoModel'); 
const Carrinho = require('../models/CarrinhoModel')
const CarrinhoModel = require('../models/CarrinhoModel'); 
class CarrinhoController {

  static async adicionarAoCarrinho(usuarioId, produtoId, carrinhoSessao) {
    const produto = await Produto.findById(produtoId);
    if (!produto) {
      throw new Error('Produto não encontrado.');
    }

    // Inicializa carrinho se necessário
    if (!carrinhoSessao) {
      carrinhoSessao = {
        clienteId: usuarioId,
        itens: [],
        total: 0
      };
    }

    // Verifica se o produto já está no carrinho
    const itemExistente = carrinhoSessao.itens.find(item =>
      item.produtoId.toString() === produto._id.toString()
    );

    if (itemExistente) {
      itemExistente.quantidade += 1;
      itemExistente.preco += produto.preco;
    } else {
      carrinhoSessao.itens.push({
        produtoId: produto._id,
        quantidade: 1,
        preco: produto.preco
      });
    }

    // Atualiza total
    carrinhoSessao.total = carrinhoSessao.itens.reduce(
      (soma, item) => soma + item.preco, 0
    );

    const carrinhoSalvo = await CarrinhoModel.findOneAndUpdate(
      { clienteId: usuarioId },
      { ...carrinhoSessao },
      { upsert: true, new: true }
    );


    return { carrinhoAtualizado: carrinhoSessao, produto };
  }

  static async listaCarrinho(usuarioId){

    try{
      const listaCarrinho = await Carrinho.findOne({clienteId: usuarioId})
      return listaCarrinho;
    }
    catch (error) {
      console.error('Erro ao listar carrinho:', error);
      res.status(500).send('Erro interno do servidor');
    }
  }
}
module.exports = CarrinhoController