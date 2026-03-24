async function login() {
    const cedula = document.getElementById('cedula').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cedula, password })
        });

        const data = await res.json();

        console.log(data); // 👈 importante para debug

        if (data.msg === 'ok') {
            alert('Bienvenido al sistema 💪');

            // 🔥 GUARDAR USUARIO
            localStorage.setItem('cedula', data.user.CedulaUsuario);

            // 🔥 REDIRECCIONAR
            window.location.href = "dashboard.html";

        } else {
            alert(data.msg);
        }

    } catch (error) {
        console.error(error);
        alert("Error conectando con el servidor");
    }
}