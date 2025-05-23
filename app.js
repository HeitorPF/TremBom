const Cliente = require("./cliente");
const user = new Cliente("Heitor", "Heitor@gmail.com", "123")

excluirCliente(user);

async function inserirCliente(user) {
 await user.inserir();
}

async function excluirCliente(user) {
 await user.excluir();
}
