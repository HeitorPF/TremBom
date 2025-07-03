
const loginForm = document.getElementById('loginForm');

const errorPopup = document.getElementById('errorPopup');
const popupMessage = document.getElementById('popupMessage'); // 
const cadastroPopup = document.getElementById('cadastroPopup');
const cadastroForm = document.getElementById('cadastroForm');


function closePopup() {
    errorPopup.style.display = 'none';
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.redirected) {
       
            window.location.href = response.url;
        } else {
          
            const result = await response.json();
            if (response.status === 401) {
                popupMessage.textContent = result.message || 'Usuário ou senha incorretos.';
                errorPopup.style.display = 'flex'; 
            } else if (!response.ok) { 
                popupMessage.textContent = result.message || 'Ocorreu um erro inesperado no login.';
                errorPopup.style.display = 'flex';
            } else {
     
                console.log('Login bem-sucedido:', result);
    
            }
        }
    } catch (error) {
        console.error('Erro durante o login:', error);
        popupMessage.textContent = 'Ocorreu um erro ao tentar fazer login. Verifique sua conexão.';
        errorPopup.style.display = 'flex';
    }
});

function abrirPopupCadastro() {
    cadastroPopup.classList.add('active');
}

function abrirPopup() {
    cadastroPopup.classList.add('active');
}

function fecharPopupCadastro() {
    cadastroPopup.classList.remove('active');
    cadastroForm.reset(); 
}

window.addEventListener('click', (event) => {
    if (event.target === cadastroPopup) {
        fecharPopupCadastro();
    }
});

cadastroForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 
   
    const formData = new FormData(cadastroForm);
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) { 
            alert(result.message || 'Cadastro realizado com sucesso! Agora você pode fazer login.');
            fecharPopupCadastro(); 
        } else {

            popupMessage.textContent = result.message || 'Erro ao cadastrar. Tente novamente.';
            errorPopup.style.display = 'flex'; 
        }
    } catch (error) {

        console.error('Erro durante o cadastro:', error);
        popupMessage.textContent = 'Ocorreu um erro ao tentar cadastrar. Verifique sua conexão.';
        errorPopup.style.display = 'flex';
    }
});