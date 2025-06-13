const mongoose = require('mongoose');


const ClienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;