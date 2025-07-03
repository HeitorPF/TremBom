const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Produto = require('./backend/controllers/produto');
const Carrinho = require('./backend/controllers/carrinho');
const Cliente = require('./backend/controllers/cliente')

app.set('views', path.join(__dirname, 'frontend', 'views'));
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const mongooseConnect = require('./backend/database/db');

mongooseConnect().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});


app.use(
    session({
        secret: 'segredo_super_secreto',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 6000000 }
    })
);

function checkLogin(req, res, next) {
    try {
        if (req.session && req.session.logado) {
            next();
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Erro na verificação de login:', error);
        res.redirect('/login');
    }
}
app.get('/index', checkLogin, async (req, res) => {
  try {
    
    const filtro = { _id: req.session.usuarioId};

    console.log("cliente id para criar o carrinho",filtro);

    const usuario = await Cliente.consultarById(filtro);
    const listaDeProdutos = await Produto.listaProdutos(); 
    const listarCarrinho = await Carrinho.listaCarrinho(usuario._id); 

    console.log(listarCarrinho);

    let quantidade = 0
    listarCarrinho.itens.forEach((item) => {
    
        quantidade += item.quantidade
    })

    res.render('pedido', {
        produto: listaDeProdutos,
        usuario: usuario.nome,
        carrinho: listarCarrinho,
        quantidade: quantidade,
    }); 
    console.log(listaDeProdutos)

  } catch (error) {
    console.error('Erro ao carregar página de pedido:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.post('/carrinho', async (req,res) => {
    try{
        const { _id } = req.body;
        const usuarioId = req.session.usuarioId;
        const carrinhoSessao = req.session.carrinho;
        console.log(_id)
        
        const { carrinhoAtualizado, produto } = await Carrinho.adicionarAoCarrinho(usuarioId,_id,carrinhoSessao);


        req.session.carrinho = carrinhoAtualizado;

        res.status(200).json({
        mensagem: `${produto.nome} adicionado ao carrinho com sucesso!`,
        carrinho: carrinhoAtualizado
        });

    }catch (error){
        console.error('Erro ao carregar página de pedido:', error);
        res.status(500).send('Erro interno do servidor');
    }
})


app.get('/carrinho', async (req,res) => {
    try{
        const { usuarioId } = req.session.usuarioId;

        console.log("carrido do cliente id ",req.session.usuarioId);

        const listarCarrinho = await Carrinho.listaCarrinho(usuarioId); 


        res.render('pedido', { carrinho: listarCarrinho }); 


    }catch (error){
        console.error('Erro ao carregar página de pedido:', error);
        res.status(500).send('Erro interno do servidor');
    }
})


app.get('/login', (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.error('Erro ao carregar página de login:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

app.get('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro ao destruir sessão:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao fazer logout'
                });
            }
            res.redirect('/login');
        });
    } catch (error) {
        console.error('Erro no logout:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});


app.post('/login', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Dados do formulário não recebidos. Verifique se o formulário está sendo enviado corretamente.'
            });
        }

        const { nome, senha } = req.body;

        if (!nome || !senha) {
            return res.status(400).json({
                success: false,
                message: 'Usuário e senha são obrigatórios.'
            });
        }

        const filtro = { nome: nome , senha: senha};
        dadosExiste = await Cliente.consultar(filtro);

        console.log('dados existe:', dadosExiste);

        if (dadosExiste) {
            req.session.logado = true;
            req.session.usuarioId = dadosExiste._id;

            console.log(req.session.usuarioId)
            res.redirect('/index');
        } else {
            res.status(401).json({
                success: false,
                message: 'Credenciais inválidas. Usuário ou senha incorretos.'
            });
        }
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor. Tente novamente mais tarde.'
        });
    }
});

app.get('/', (req, res) => {
    try {
        res.redirect('/login');
    } catch (error) {
        console.error('Erro ao redirecionar para login:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});



http.createServer(app).listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});