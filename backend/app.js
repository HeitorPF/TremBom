const http = require('http');
const Cliente = require("./controllers/cliente");
const Restaurante = require("./controllers/restaurante");
const Pedido = require('./controllers/pedido')
const Pagamento = require('./controllers/pagamento');
const { ObjectId } = require('mongodb');

const email = 'brena@gmail.com'

const server = http.createServer(async (req, res) => {

  console.log(`Requisição recebida: ${req.method} ${req.url}`);

  try {
    // --------------------- CLIENTE ----------------------
    if (req.method === 'POST' && req.url === '/inserir-cliente') { // INSERIR CLIENTE

      const cliente = new Cliente("Heitor", "heitor@gmail.com", "123456");

      const clienteExistente = await Cliente.consultar({ email: cliente.email });

      if (clienteExistente) {

        res.end(`Cliente já existe! ID: ${clienteExistente._id}`);

        console.log("Cliente já existe! ID:", clienteExistente._id)

        return;

      }
      else {

        await cliente.inserir();

      }

      res.end('Cliente inserido com sucesso!');

    } else if (req.method === 'DELETE' && req.url === '/deletar-cliente') { // DELETAR CLIENTE

      const filtro = { email: email };

      const cliente = await Cliente.consultar(filtro);

      console.log(cliente)

      if (!cliente) {

        console.log("cliente não encontrado")

        res.end("Cliente não existe");

        return;

      }

      else {

        await Cliente.excluir(cliente._id)

      }

      res.end('Cliente excluído com sucesso!');

    } else if (req.method === 'PUT' && req.url === '/atualizar-cliente') { // ATUALIZAR CLIENTE

      const filtro = { email: email };

      const novosDados = { nome: "Brenda" };

      await Cliente.atualizar(filtro, novosDados);

      res.end('Cliente atualizado com sucesso!');


    } else if (req.method === 'GET' && req.url === '/consultar-cliente') { // CONSULTAR CLIENTE !!

      const filtro = { email: email };

      const cliente = await Cliente.consultar(filtro);

      if (!cliente) {

        console.log("Cliente não existe");

        res.end("Cliente não existe");

        return;
      }

      console.log(`Cliente encontrado! ID: `, cliente);

      res.end('Cliente consultado!');


      // --------------------- RESTAURANTE ----------------------
    } else if (req.method === 'POST' && req.url === '/inserir-restaurante') { // INSERIR RESTUARANTE

      const restaurante = new Restaurante("Piriri", "09:00", "12:00");

      await restaurante.inserir();

      res.end('Restaurante inserido com sucesso!');

    } else if (req.method === 'DELETE' && req.url === '/deletar-restaurante') { // DELETAR RESTAURANTE

      const filtro = { restaurante_nome: "Piriri" };

      const restaurante = await Restaurante.consultar(filtro);

      if (!restaurante) {

        console.log("Restaurante não foi encontrado.");

        res.end("Restaurante não existe");

        return;

      }

      await Restaurante.excluir(restaurante.restaurante_nome)

      res.end('Restaurante excluído com sucesso!');

    } else if (req.method === 'PUT' && req.url === '/atualizar-restaurante') { // ATUALIZAR RESTAURANTE

      const filtro = { restaurante_nome: "Piriri" };

      const novosDados = { horario_abertura: "10:00", horario_fechamento: "14:00" };

      await Restaurante.atualizar(filtro, novosDados);

      res.end('Restaurante atualizado com sucesso!');

    } else if (req.method === 'GET' && req.url === '/consultar-restaurante') { // CONSULTAR RESTAURANTE !!

      const filtro = { restaurante_nome: "Piriri" };

      const rest = await Restaurante.consultar(filtro);

      if (!rest) {

        console.log("Restaurante não existe");

        res.end("Restaurante não existe");

        return;
      }
      console.log(rest)
      res.end('Restaurante encontrado com sucesso!');

      // --------------------- PEDIDO ----------------------
    } else if (req.method === 'POST' && req.url === '/inserir-pedido') {// ->> CRIAR PEDIDO

      const filtroCliente = { email: email };

      const cliente = await Cliente.consultar(filtroCliente);

      const filtroRest = { restaurante_nome: "Piriri" }

      const restaurante = await Restaurante.consultar(filtroRest)

      const pedido = new Pedido(4, 60, cliente._id, restaurante._id)

      await pedido.inserir()

      res.end(`Pedido feito!`)

    } else if (req.method === 'DELETE' && req.url === '/deletar-pedido') { // ->> EXCLUIR PEDIDO

      const filtroCliente = { email: email };

      const cliente = await Cliente.consultar(filtroCliente);

      console.log(cliente)

      await Pedido.excluir(cliente._id)

      console.log('Pedidos excluidos');

      res.end(`Cliente encontrado! ID: ${cliente._id}`)

    } else if (req.method === 'GET' && req.url === '/consultar-pedido') { // ->> CONSULTAR PEDIDO

      const filtroCliente = { email: email };

      const cliente = await Cliente.consultar(filtroCliente);

      if (!cliente) {

        console.log("Cliente não existe");

        res.end("CLiente não encontrado");

        return;
      }

      else {

        const filtroPedido = { cliente_id: cliente._id }

        const pedido = await Pedido.consultar(filtroPedido);

        if (!pedido) {

          console.log("Pedido não encontrado");

          res.end("Pedido não encontrado");

          return;
        }

        console.log(pedido)

      }


      res.end(`Pedido encontrado!`);
      // --------------------------------- PAGAMENTO ----------------------------------
    } else if (req.method === 'POST' && req.url === '/inserir-pagamento') { // INSERIR PAGAMENTO
      
      const filtroCliente = {email: email}
      const cliente = await Cliente.consultar(filtroCliente)

      if(!cliente) {
        console.log("Cliente não existe");

        res.end("CLiente não encontrado");

        return;
      }
      const pedido = await Pedido.consultar({cliente_id: cliente._id})
      if(!pedido) {
        console.log("Pedido não existe");

        res.end("Pedido não encontrado");

        return;
      }
      console.log(pedido)
      const pagamento = new Pagamento(false, 22.12, "07/06/2025", "cartão", pedido._id);

      await pagamento.inserir()

      res.end('Pagamento inserido com sucesso!');

    } else if (req.method === 'DELETE' && req.url === '/deletar-pagamento') { // DELETAR PAGAMENTO

      const pagamento_id = new ObjectId('6841e6d56908ce2e1d292018')
      await Pagamento.excluir(pagamento_id)

      res.end('Pagamento excluído com sucesso!');

    } else if (req.method === 'PUT' && req.url === '/atualizar-pagamento') { // ATUALIZAR PAGAMENTO

      const pagamento_id = new ObjectId('6841e9e6f8a761a3a7c490e7')

      const filtro = { _id: pagamento_id };

      const novosDados = { pago: true };

      await Pagamento.atualizar(filtro, novosDados);

      res.end('pagamento atualizado com sucesso!');

    } else if (req.method === 'GET' && req.url === '/consultar-pagamento') { // CONSULTAR PAGAMENTO

      const pagamento_id = new ObjectId('6841e9e6f8a761a3a7c490e7')
      const filtro = { _id: pagamento_id };

      const pagamento = await Pagamento.consultar(filtro);

      console.log(`Pagamento encontrado! ID: `, pagamento);

      res.end('Pagamento consultado!');
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