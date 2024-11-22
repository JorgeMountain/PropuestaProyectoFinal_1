const API_BASE = 'http://localhost:3000';
let ingredients = [];

async function searchRecipes() {
    const query = document.getElementById('search-input').value;

    const response = await fetch(`${API_BASE}/recipes/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: query })
    });

    const data = await response.json();
    displayRecipes(data);
}

function displayRecipes(recipes) {
    const results = document.getElementById('search-results');
    results.innerHTML = recipes.map(recipe => `
        <div>
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
            <button onclick="addToFavorites(${recipe.id})">Agregar a Favoritos</button>
        </div>
    `).join('');
}

async function addToFavorites(recipeId) {
    await fetch(`${API_BASE}/favorites/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ recipeId })
    });
    alert('Receta añadida a favoritos.');
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}
