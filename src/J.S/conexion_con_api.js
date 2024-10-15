document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar el envío normal del formulario

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
        const response = await fetch('http://localhost:3000/api/login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        document.getElementById('response').innerText = data.message; // Mostrar el mensaje

        // Manejo de la respuesta
        if (response.ok) {
            // Almacenar el token en localStorage
            localStorage.setItem('token', data.token);
            document.getElementById('response').innerText = 'Acceso concedido. Redirigiendo...';

            // Redirigir a la página después de un breve retraso
         
                window.location.href = 'Formulario.html'; // Redirigir a la página
        } else {
            document.getElementById('response').innerText = data.message; // Mostrar mensaje de error
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        document.getElementById('response').innerText = 'Error en la conexión con el servidor.';
    }
});

