const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
    quantidade_itens: {
        type: Number,
        required: true,
    },
    pedido_total: {
        type: Number,
        required: true,
    },
    cliente_id: {
        type: String,
        required: true,
    },
    restaurante_id: {
        type: String,
        required: true,

    },
}, {
    timestamps: true,
});

const Pedido = mongoose.model('Pedido', PedidoSchema);
module.exports = Pedido;