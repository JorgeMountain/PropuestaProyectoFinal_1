const API_BASE = 'http://localhost:3000';
let ingredients = [];

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  renderIngredientList();
  loadFavorites();
});

function getAuthHeaders(withJson = false) {
  const token = localStorage.getItem('token');
  const headers = {};

  if (withJson) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function handleUnauthorized() {
  alert('Tu sesión expiró, vuelve a iniciar sesión.');
  logout();
}

function parseSearchQuery(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return {};
  }

  const typeMatch = trimmed.match(/^(tipo|type):\s*(.+)$/i);
  if (typeMatch) {
    return { type: typeMatch[2] };
  }

  return { name: trimmed };
}

async function searchRecipes() {
  const query = document.getElementById('search-input').value;
  const params = parseSearchQuery(query);

  if (!params.name && !params.type) {
    alert('Ingresa un término para buscar (ej. "Pasta" o "tipo: Vegetariano").');
    return;
  }

  const searchParams = new URLSearchParams(params);

  try {
    const response = await fetch(`${API_BASE}/recipes?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error('No se pudieron obtener las recetas.');
    }

    const recipes = await response.json();
    displayRecipes(recipes, 'search-results', 'No se encontraron recetas para esa búsqueda.');
  } catch (error) {
    alert(error.message);
  }
}

function buildRecipeCard(recipe) {
  const {
    id,
    name,
    description,
    type,
    difficulty,
    preparationTime,
    servings
  } = recipe;

  return `
    <article class="recipe-card">
      <div class="recipe-card__header">
        <h3>${name}</h3>
        <span class="recipe-card__tag">${type}</span>
      </div>
      <p>${description || 'Sin descripción disponible.'}</p>
      <div class="recipe-card__meta">
        <span>Tiempo: ${preparationTime} min</span>
        <span>Dificultad: ${difficulty}</span>
        <span>Porciones: ${servings}</span>
      </div>
      <button type="button" onclick="addToFavorites(${id})">
        Agregar a Favoritos
      </button>
    </article>
  `;
}

function displayRecipes(recipes, containerId, emptyMessage) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  if (!recipes.length) {
    container.innerHTML = `<p class="empty-state">${emptyMessage}</p>`;
    return;
  }

  container.innerHTML = recipes.map(buildRecipeCard).join('');
}

async function addToFavorites(recipeId) {
  try {
    const response = await fetch(`${API_BASE}/favorites`, {
      method: 'POST',
      headers: getAuthHeaders(true),
      body: JSON.stringify({ recipeId })
    });

    if (response.status === 401) {
      handleUnauthorized();
      return;
    }

    if (response.status === 409) {
      alert('La receta ya está en tu lista de favoritos.');
      return;
    }

    if (!response.ok) {
      throw new Error('No se pudo agregar la receta a favoritos.');
    }

    alert('Receta añadida a favoritos.');
    loadFavorites();
  } catch (error) {
    alert(error.message);
  }
}

async function loadFavorites() {
  try {
    const response = await fetch(`${API_BASE}/favorites`, {
      headers: getAuthHeaders()
    });

    if (response.status === 401) {
      handleUnauthorized();
      return;
    }

    if (!response.ok) {
      throw new Error('No se pudieron cargar tus favoritos.');
    }

    const favorites = await response.json();
    renderFavorites(favorites);
  } catch (error) {
    alert(error.message);
  }
}

function renderFavorites(favorites) {
  const container = document.getElementById('favorite-list');
  if (!container) {
    return;
  }

  if (!favorites.length) {
    container.innerHTML = '<p class="empty-state">Aún no tienes recetas favoritas.</p>';
    return;
  }

  container.innerHTML = favorites
    .map(
      (favorite) => `
        <article class="favorite-card">
          <div>
            <h4>${favorite.name}</h4>
            <p>${favorite.description || 'Sin descripción disponible.'}</p>
            <small>${favorite.type} - ${favorite.difficulty}</small>
          </div>
          <button type="button" class="secondary" onclick="removeFavorite(${favorite.recipeId})">
            Quitar
          </button>
        </article>
      `
    )
    .join('');
}

async function removeFavorite(recipeId) {
  try {
    const response = await fetch(`${API_BASE}/favorites`, {
      method: 'DELETE',
      headers: getAuthHeaders(true),
      body: JSON.stringify({ recipeId })
    });

    if (response.status === 401) {
      handleUnauthorized();
      return;
    }

    if (response.status === 404) {
      alert('La receta no estaba en tu lista de favoritos.');
      return;
    }

    if (!response.ok) {
      throw new Error('No se pudo eliminar la receta de favoritos.');
    }

    loadFavorites();
  } catch (error) {
    alert(error.message);
  }
}

function addIngredient() {
  const input = document.getElementById('ingredient-input');
  const value = input.value.trim();

  if (!value) {
    alert('Ingresa un ingrediente antes de agregarlo.');
    return;
  }

  ingredients.push(value);
  input.value = '';
  renderIngredientList();
}

function removeIngredient(index) {
  ingredients.splice(index, 1);
  renderIngredientList();
}

function renderIngredientList() {
  const list = document.getElementById('ingredient-list');

  if (!list) {
    return;
  }

  if (!ingredients.length) {
    list.innerHTML = '<li class="empty-state">Añade tus ingredientes disponibles.</li>';
    return;
  }

  list.innerHTML = ingredients
    .map(
      (ingredient, index) => `
        <li class="ingredient-pill">
          <span>${ingredient}</span>
          <button type="button" class="icon-button" onclick="removeIngredient(${index})">x</button>
        </li>
      `
    )
    .join('');
}

async function suggestRecipes() {
  if (!ingredients.length) {
    alert('Agrega al menos un ingrediente para obtener sugerencias.');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/recipes/ingredients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients })
    });

    if (response.status === 404) {
      displayRecipes(
        [],
        'suggestion-results',
        'No encontramos recetas con esos ingredientes. Intenta con otros.'
      );
      return;
    }

    if (!response.ok) {
      throw new Error('No se pudieron obtener las sugerencias.');
    }

    const recipes = await response.json();
    displayRecipes(recipes, 'suggestion-results', 'No encontramos recetas con esos ingredientes.');
  } catch (error) {
    alert(error.message);
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}
