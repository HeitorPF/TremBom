const loginForm = document.getElementById('loginForm');
const errorPopup = document.getElementById('errorPopup');
const popupMessage = document.getElementById('popupMessage');

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
                popupMessage.textContent = result.message;
                errorPopup.style.display = 'block';
            } else {
                console.error('Unexpected response:', result);
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
        popupMessage.textContent = 'Ocorreu um erro ao tentar fazer login.';
        errorPopup.style.display = 'block';
    }
});

function closePopup() {
    errorPopup.style.display = 'none';
}

