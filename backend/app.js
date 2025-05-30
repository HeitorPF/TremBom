const http = require('http');
const Cliente = require("./controllers/cliente");
const Restaurante = require("./controllers/restaurante");
const Pedido = require('./controllers/pedido')


const server = http.createServer(async (req, res) => {

  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  res.end('Servidor Node.js sem Express está rodando!');


  try {

    if (req.method === 'POST' && req.url === '/inserir-cliente') {

      const cliente = new Cliente("Heitor", "heitor@gmail.com", "123456");

      await cliente.inserir();


      res.end('Cliente inserido com sucesso!');

    } else if (req.method === 'DELETE' && req.url === '/excluir-cliente') {

      const nomeCliente = "Heitor";

      const cliente = new Cliente(nomeCliente);

      await cliente.excluir();

      res.end('Cliente excluído com sucesso!');

    } else if (req.method === 'PUT' && req.url === '/atualizar-cliente') {

      const filtro = { nome: "Heitor" };

      const novosDados = { email: "miniheitor@gmail.com" };

      await Cliente.atualizar(filtro, novosDados);

      res.end('Cliente atualizado com sucesso!');

    } else if (req.method === 'GET' && req.url === '/consultar-cliente') {

      const filtro = { nome: "Heitor" };

      const cliente = await Cliente.consultar(filtro);

      const pedido = new Pedido(10, 40, `${cliente._id}`, 'restId') // ->> Cria pedido
      pedido.inserir()

      console.log(`Cliente encontrado! ID: ${cliente._id}`);

      res.end(`Cliente encontrado! ID: ${cliente._id}`)

    } else if (req.method === 'POST' && req.url === '/inserir-restaurante') {

      const restaurante = new Restaurante("Estação", "09:00", "12:00");

      await restaurante.inserir();

      res.end('Restaurante inserido com sucesso!');

    } else if (req.method === 'DELETE' && req.url === '/excluir-restaurante') {

      const nomeRestaurante = "Estação";

      const restaurante = new Restaurante(nomeRestaurante);

      await restaurante.excluir();

      res.end('Restaurante excluído com sucesso!');

    } else if (req.method === 'PUT' && req.url === '/atualizar-restaurante') {

      const filtro = { restaurante_nome: "Estação" };

      const novosDados = { horario_abertura: "10:00", horario_fechamento: "14:00" };

      await Restaurante.atualizar(filtro, novosDados);

      res.end('Restaurante atualizado com sucesso!');

    } else if (req.method === 'GET' && req.url === '/consultar-restaurante') {

      const filtro = { nome: "Estação" };

      await Restaurante.consultar(filtro);

      res.end('Restaurante atualizado com sucesso!');

    } else if (req.method === 'POST' && req.url === '/adicionar-pedido') {

      const pedido = new Pedido(1, 30, 'id1', 'id2')

    } else if (req.method === 'DELETE' && req.url === '/excluir-pedido') {

      const pedido = new Pedido('6831027db8f4b7256a3f7712')

      pedido.excluir()

    } 
    else {

      res.end('Rota não encontrada');

    } 
  }
  catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Erro interno do servidor');
  }
}


);

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


