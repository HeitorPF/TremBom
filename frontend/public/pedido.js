
const btnPedido = document.querySelectorAll('.btn-pedido');
btnPedido.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
        event.preventDefault();
        const card = event.target.closest('.card');
        if (card) {
            const title = card.querySelector('.card-title').textContent;
            alert(`Você adicionou ${title} ao carrinho!`);

            const data = {
                item: title
            };

            try {
                const response = await fetch('/item', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    console.log('Item adicionado com sucesso!');
                } else {
                    const result = await response.json();
                    console.error('Erro ao adicionar item:', result.message);
                }
            } catch (error) {
                console.error('Erro durante a requisição:', error);
                alert('Ocorreu um erro ao adicionar o item.');
            }
        }
    });
});

const pedidoForm = document.getElementById('pedidoForm');
pedidoForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(pedidoForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Pedido realizado com sucesso!');
            window.location.href = '/pedido';
        } else {
            const result = await response.json();
            alert(`Erro ao realizar pedido: ${result.message}`);
        }
    } catch (error) {
        console.error('Error during order submission:', error);
        alert('Ocorreu um erro ao tentar realizar o pedido.');
    }
});