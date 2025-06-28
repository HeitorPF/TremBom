const mongoose = require('mongoose');

const ProdutoSchema = require('./ProdutoModel'); // ou defina diretamente aqui se estiver no mesmo arquivo

const CarrinhoSchema = new mongoose.Schema({
  clienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  itens: [{
    produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    quantidade: { type: Number, default: 1 },
    preco: { type: Number, required: true }
}],
  total: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true });

const Carrinho = mongoose.model('Carrinho', CarrinhoSchema,'carrinho');

module.exports = Carrinho;
