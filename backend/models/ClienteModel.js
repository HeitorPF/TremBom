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


module.exports = mongoose.model('Cliente', ClienteSchema, 'Cliente');