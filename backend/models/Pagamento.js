const mongoose = require('mongoose');

const PagamentoSchema = new mongoose.Schema({
    pago: {
        type: String,
        required: true,
        trim: true,
    },
    valor: {
        type: String,
    },
    data_pagamento: {
        type: String,
        required: true,
    },
    metodo_pagamento: {
        type: String,
        require: true,
    },
    pedido_id: {
        type: String,
        require: true,
    }
}, {
    timestamps: true,
});

const Pagamento = mongoose.model('Pagamento', PagamentoSchema);

module.exports = Pagamento;