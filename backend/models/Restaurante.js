const mongoose = require('mongoose');

const RestauranteSchema = new mongoose.Schema({
    restaurante_nome: {
        type: String,
        required: true,
    },
    horario_abertura: {
        type: String,
        required: true,
    },
    horario_fechamento: {
        type: String,
        default: 'Pendente',
    }
}, {
    timestamps: true,
});

const Restaurante = mongoose.model('Restaurante', RestauranteSchema);

module.exports = Restaurante;