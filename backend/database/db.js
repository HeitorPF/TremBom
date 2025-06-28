const mongoose = require('mongoose');

async function mongooseConnect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/TremBom', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Conectado ao MongoDB com Mongoose');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}

module.exports = mongooseConnect;