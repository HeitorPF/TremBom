const http = require('http');
const Cliente = require("./controllers/cliente");
const Restaurante = require("./controllers/restaurante");
const Pedido = require('./controllers/pedido')


const server = http.createServer(async (req, res) => {

  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  // res.writeHead(200, { 'Content-Type': 'text/plain' });

  // res.end('Servidor Node.js sem Express está rodando!');
  // Para testar cliente
  const email = "joao@gmail"
  const senha = "123"


  try {
    // --------------------- CLIENTE ----------------------
    if (req.method === 'POST' && req.url === '/inserir-cliente') { // INSERIR CLIENTE
      const cliente = new Cliente("nome doido", "doido@gmail.com", "123456");
      await cliente.inserir();
      res.end('Cliente inserido com sucesso!');

    } else if (req.method === 'DELETE' && req.url === '/deletar-cliente') { // DELETAR CLIENTE
      const filtro = { email: email, senha:senha };
      const cliente = await Cliente.consultar(filtro);
      console.log(cliente)
      if(!cliente){
        console.log("cliente não encontrado")
        return;
      }
      else {
        await Cliente.excluir(cliente._id)
      }
      res.end('Cliente excluído com sucesso!');

    } else if (req.method === 'PUT' && req.url === '/atualizar-cliente') { // ATUALIZAR CLIENTE
      const filtro = { email: email, senha:senha };
      const novosDados = { nome: "irineu" };
      await Cliente.atualizar(filtro, novosDados);
      res.end('Cliente atualizado com sucesso!');

    } else if (req.method === 'GET' && req.url === '/consultar-cliente') { // CONSULTAR CLIENTE !!

      const filtro = { nome: "Heitor" };

      const cliente = await Cliente.consultar(filtro);

      const pedido = new Pedido(10, 40, `${cliente._id}`, 'restId') // ->> Cria pedido

      pedido.inserir()

      console.log(`Cliente encontrado! ID: ${cliente._id}`);

      res.end(`Cliente encontrado! ID: ${cliente._id}`)

      // --------------------- RESTAURANTE ----------------------
    } else if (req.method === 'POST' && req.url === '/inserir-restaurante') { // INSERIR RESTUARANTE
      const restaurante = new Restaurante("piriri", "09:00", "12:00");
      await restaurante.inserir();
      res.end('Restaurante inserido com sucesso!');

    } else if (req.method === 'DELETE' && req.url === '/deletar-restaurante') { // DELETAR RESTAURANTE
      const nomeRestaurante = "jacare";
      await Restaurante.excluir(nomeRestaurante)
      res.end('Restaurante excluído com sucesso!');

    } else if (req.method === 'PUT' && req.url === '/atualizar-restaurante') { // ATUALIZAR RESTAURANTE
      const filtro = { restaurante_nome: "piriri" };
      const novosDados = { horario_abertura: "10:00", horario_fechamento: "14:00" };
      await Restaurante.atualizar(filtro, novosDados);
      res.end('Restaurante atualizado com sucesso!');

    } else if (req.method === 'GET' && req.url === '/consultar-restaurante') { // CONSULTAR RESTAURANTE !!

      const filtro = { nome: "Estação" };

      await Restaurante.consultar(filtro);

      res.end('Restaurante atualizado com sucesso!');

    } else if (req.method === 'POST' && req.url === '/inserir-pedido') {

      const filtro = { nome: "Heitor" };

      const cliente = await Cliente.consultar(filtro);

      const pedido = new Pedido(10, 40, `${cliente._id}`, 'restId') // ->> Cria pedido

      pedido.inserir()

      console.log(`Cliente encontrado! ID: ${cliente._id}`);

      res.end(`Cliente encontrado! ID: ${cliente._id}`)

    } else if (req.method === 'DELETE' && req.url === '/excluir-pedido') {

      const filtro = { nome: "Heitor" };

      const cliente = await Cliente.consultar(filtro);

      console.log(`Cliente encontrado! ID: ${cliente._id}`);

      const pedido = new Pedido(null, null, `${cliente._id}`, null) // ->> Cria pedido

      pedido.excluir()

      console.log(`Pedido ! ID: ${cliente._id}`);

      res.end(`Cliente encontrado! ID: ${cliente._id}`)

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


