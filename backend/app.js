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

  const restaurante_nome = "piriri"

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

      const filtro = { restaurante_nome: "piriri" };

      const rest = await Restaurante.consultar(filtro);
      console.log(rest)

      res.end('Restaurante atualizado com sucesso!');

      // --------------------- PEDIDO ----------------------
    } else if (req.method === 'POST' && req.url === '/inserir-pedido') {

      const filtroCliente = { email: email, senha: senha };
      const cliente = await Cliente.consultar(filtroCliente);

      const filtroRest = { restaurante_nome: restaurante_nome}
      const restaurante = await Restaurante.consultar(filtroRest)

      const pedido = new Pedido(40, 80, cliente._id, restaurante._id) // ->> Cria pedido
      pedido.inserir()
      res.end(`Pedido feito!`)

    } else if (req.method === 'DELETE' && req.url === '/excluir-pedido') {
      
      const filtroCliente = { email: email, senha: senha };
      const cliente = await Cliente.consultar(filtroCliente);
      console.log(cliente)

      Pedido.excluir(cliente._id)

      console.log('Pedidos excluidos');

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


