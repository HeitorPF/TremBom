document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('.btn-pedido');
    
    botoes.forEach(botao => {
      botao.addEventListener('click', async (e) => {
        e.preventDefault();

        const produtoId = botao.getAttribute('data-id');
        const preco = botao.closest('.item').querySelector('.preco-produto strong').textContent.replace('R$', '').replace(',', '.');

        console.log(`id: ${produtoId} preço: ${preco}`)
        try {
          const resposta = await fetch('/carrinho', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              _id: produtoId,
              preco: parseFloat(preco)
            })
          });

          if (resposta.ok) {
            console.log('Produto adicionado ao carrinho com sucesso');
          } else {
            console.error('Erro ao adicionar produto');
          }
        } catch (erro) {
          console.error('Erro na requisição:', erro);
        }
      });
    });
  });
