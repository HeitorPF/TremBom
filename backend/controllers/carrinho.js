const { connect } = require("../database/db");

class Carrinho {
    constructor(cliente_id, restaurante_id, _id = null) {
        this._id = _id;
        this.itens = [];
        this.pedido_total = 0;
        this.cliente_id = cliente_id;
        this.restaurante_id = restaurante_id;
    }

    adicionarItem(item) {
        const novoItem = {
            id: item.id,
            nome: item.nome,
            preco: item.preco,
            quantidade: item.quantidade || 1,
            subtotal: item.preco * (item.quantidade || 1)
        };

        const itemExistente = this.itens.find(i => i.id === item.id);

        if (itemExistente) {
            itemExistente.quantidade += novoItem.quantidade;
            itemExistente.subtotal = itemExistente.preco * itemExistente.quantidade;
        } else {
            this.itens.push(novoItem);
        }

        this.calcularTotal();
    }

    removerItem(itemId) {
        this.itens = this.itens.filter(item => item.id !== itemId);
        this.calcularTotal();
    }

    atualizarQuantidade(itemId, novaQuantidade) {
        const item = this.itens.find(i => i.id === itemId);
        if (item) {
            if (novaQuantidade <= 0) {
                this.removerItem(itemId);
            } else {
                item.quantidade = novaQuantidade;
                item.subtotal = item.preco * novaQuantidade;
                this.calcularTotal();
            }
        }
    }

    calcularTotal() {
        this.pedido_total = this.itens.reduce((total, item) => total + item.subtotal, 0);
    }

    obterQuantidadeItens() {
        return this.itens.reduce((total, item) => total + item.quantidade, 0);
    }

    limparCarrinho() {
        this.itens = [];
        this.pedido_total = 0;
    }

    estaVazio() {
        return this.itens.length === 0;
    }

    async salvar() {
        try {
            const { db, client } = await connect();

            const carrinhoData = {
                itens: this.itens,
                pedido_total: this.pedido_total,
                cliente_id: this.cliente_id,
                restaurante_id: this.restaurante_id,
                quantidade_itens: this.obterQuantidadeItens()
            };

            if (this._id) {
                const result = await db.collection("carrinho").updateOne(
                    { _id: this._id },
                    { $set: carrinhoData }
                );
                console.log("Carrinho atualizado:", result.modifiedCount);
            } else {
                // Criar novo carrinho
                const result = await db.collection("carrinho").insertOne(carrinhoData);
                this._id = result.insertedId;
                console.log("Carrinho criado:", result.insertedId);
            }

            client.close();
        } catch (error) {
            console.log("Erro ao salvar carrinho:", error);
        }
    }

    // Carregar carrinho do banco de dados
    static async carregar(cliente_id, restaurante_id) {
        try {
            const { db, client } = await connect();

            const carrinhoData = await db.collection("carrinho").findOne({
                cliente_id: cliente_id,
                restaurante_id: restaurante_id
            });

            client.close();

            if (carrinhoData) {
                const carrinho = new Carrinho(cliente_id, restaurante_id, carrinhoData._id);
                carrinho.itens = carrinhoData.itens || [];
                carrinho.pedido_total = carrinhoData.pedido_total || 0;
                return carrinho;
            } else {
                return new Carrinho(cliente_id, restaurante_id);
            }
        } catch (error) {
            console.log("Erro ao carregar carrinho:", error);
            return new Carrinho(cliente_id, restaurante_id);
        }
    }

    // Excluir carrinho do banco de dados
    async excluir() {
        try {
            const { db, client } = await connect();

            if (this._id) {
                const result = await db.collection("carrinho").deleteOne({ _id: this._id });
                console.log("Carrinho excluído:", result.deletedCount);
            }

            client.close();
        } catch (error) {
            console.log("Erro ao excluir carrinho:", error);
        }
    }
}

module.exports = Carrinho;