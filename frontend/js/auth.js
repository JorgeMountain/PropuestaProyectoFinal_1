const API_BASE = 'http://localhost:3000';

async function register() {
  const username = document.getElementById('register-username').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;

  if (!username || !email || !password) {
    alert('Completa todos los campos para registrarte.');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || 'Error en el registro.');
    }

    alert('Registro exitoso, ahora puedes iniciar sesión.');
    document.getElementById('register-form').reset();
  } catch (error) {
    alert(error.message);
  }
}

async function login() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    alert('Ingresa tu correo y contraseña.');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || 'Credenciales inválidas.');
    }

    localStorage.setItem('token', data.token);
    window.location.href = 'main.html';
  } catch (error) {
    alert(error.message);
  }
}
