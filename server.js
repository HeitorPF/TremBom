const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Pedido = require('./backend/controllers/pedido');
const Carrinho = require('./backend/controllers/carrinho');

app.set('views', path.join(__dirname, 'frontend', 'views'));
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    session({
        secret: 'segredo_super_secreto',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 }
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

app.get('/pedido', checkLogin, (req, res) => {
    try {
        res.render('pedido');
    } catch (error) {
        console.error('Erro ao carregar página de pedido:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

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


app.post('/login', (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Dados do formulário não recebidos. Verifique se o formulário está sendo enviado corretamente.'
            });
        }

        const { usuario, senha } = req.body;

        if (!usuario || !senha) {
            return res.status(400).json({
                success: false,
                message: 'Usuário e senha são obrigatórios.'
            });
        }

        if (usuario === 'admin' && senha === '123') {
            req.session.logado = true;
            res.redirect('/pedido');
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

app.post('/item', async (req, res) => {
    try {
        // Get data from request body
        const { quantidade_itens, pedido_total, cliente_id, restaurante_id } = req.body;

        // Validate required fields
        if (!quantidade_itens || !pedido_total || !cliente_id || !restaurante_id) {
            return res.status(400).json({
                success: false,
                message: 'Todos os campos são obrigatórios: quantidade_itens, pedido_total, cliente_id, restaurante_id'
            });
        }

        // Create new order
        const pedido = new Pedido(quantidade_itens, pedido_total, cliente_id, restaurante_id);

        await pedido.inserir();

        res.status(201).json({
            success: true,
            message: 'Pedido feito com sucesso!',
            pedido_id: pedido._id
        });

    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao criar pedido'
        });
    }
});

// Rotas do Carrinho

// Adicionar item ao carrinho
app.post('/carrinho/adicionar', checkLogin, async (req, res) => {
    try {
        const { item, cliente_id, restaurante_id } = req.body;

        if (!item || !cliente_id || !restaurante_id) {
            return res.status(400).json({
                success: false,
                message: 'Item, cliente_id e restaurante_id são obrigatórios'
            });
        }

        // Carregar carrinho existente ou criar novo
        const carrinho = await Carrinho.carregar(cliente_id, restaurante_id);

        // Adicionar item ao carrinho
        carrinho.adicionarItem(item);

        // Salvar carrinho
        await carrinho.salvar();

        res.status(200).json({
            success: true,
            message: 'Item adicionado ao carrinho',
            carrinho: {
                itens: carrinho.itens,
                total: carrinho.pedido_total,
                quantidade_itens: carrinho.obterQuantidadeItens()
            }
        });

    } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

// Visualizar carrinho
app.get('/carrinho/:cliente_id/:restaurante_id', checkLogin, async (req, res) => {
    try {
        const { cliente_id, restaurante_id } = req.params;

        const carrinho = await Carrinho.carregar(cliente_id, restaurante_id);

        res.status(200).json({
            success: true,
            carrinho: {
                itens: carrinho.itens,
                total: carrinho.pedido_total,
                quantidade_itens: carrinho.obterQuantidadeItens(),
                vazio: carrinho.estaVazio()
            }
        });

    } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

// Atualizar quantidade de item no carrinho
app.put('/carrinho/atualizar', checkLogin, async (req, res) => {
    try {
        const { item_id, quantidade, cliente_id, restaurante_id } = req.body;

        if (!item_id || quantidade === undefined || !cliente_id || !restaurante_id) {
            return res.status(400).json({
                success: false,
                message: 'item_id, quantidade, cliente_id e restaurante_id são obrigatórios'
            });
        }

        const carrinho = await Carrinho.carregar(cliente_id, restaurante_id);
        carrinho.atualizarQuantidade(item_id, quantidade);
        await carrinho.salvar();

        res.status(200).json({
            success: true,
            message: 'Quantidade atualizada',
            carrinho: {
                itens: carrinho.itens,
                total: carrinho.pedido_total,
                quantidade_itens: carrinho.obterQuantidadeItens()
            }
        });

    } catch (error) {
        console.error('Erro ao atualizar carrinho:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

// Remover item do carrinho
app.delete('/carrinho/remover', checkLogin, async (req, res) => {
    try {
        const { item_id, cliente_id, restaurante_id } = req.body;

        if (!item_id || !cliente_id || !restaurante_id) {
            return res.status(400).json({
                success: false,
                message: 'item_id, cliente_id e restaurante_id são obrigatórios'
            });
        }

        const carrinho = await Carrinho.carregar(cliente_id, restaurante_id);
        carrinho.removerItem(item_id);
        await carrinho.salvar();

        res.status(200).json({
            success: true,
            message: 'Item removido do carrinho',
            carrinho: {
                itens: carrinho.itens,
                total: carrinho.pedido_total,
                quantidade_itens: carrinho.obterQuantidadeItens()
            }
        });

    } catch (error) {
        console.error('Erro ao remover item do carrinho:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

// Limpar carrinho
app.delete('/carrinho/limpar', checkLogin, async (req, res) => {
    try {
        const { cliente_id, restaurante_id } = req.body;

        if (!cliente_id || !restaurante_id) {
            return res.status(400).json({
                success: false,
                message: 'cliente_id e restaurante_id são obrigatórios'
            });
        }

        const carrinho = await Carrinho.carregar(cliente_id, restaurante_id);
        await carrinho.excluir();

        res.status(200).json({
            success: true,
            message: 'Carrinho limpo com sucesso'
        });

    } catch (error) {
        console.error('Erro ao limpar carrinho:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

http.createServer(app).listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});