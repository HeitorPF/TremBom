const Cliente = require("./cliente");
const Restaurante = require("./restaurante");

const cliente = new Cliente("pele", "pele@gmail.com")
const rest = new Restaurante("pombo", "09:00", "12:00")

inserirCliente(cliente)
inserirRestaurante(rest)

async function inserirCliente(cliente) {
  await cliente.inserir();
}

async function excluirCliente(cliente) {
  await cliente.excluir();
}

async function inserirRestaurante(restaurante) {
  await restaurante.inserir();
}

async function inserirRestaurante(restaurante) {
  await restaurante.inserir();
}
