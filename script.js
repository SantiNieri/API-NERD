
const apiUrl = 'https://pokeapi.co/api/v2/pokemon';


const fetchBtn = document.getElementById('fetchBtn');
const clearBtn = document.getElementById('clearBtn');
const quantityInput = document.getElementById('quantity');
const resultsContainer = document.getElementById('resultsContainer');


async function fetchPokemonData(limit) {
    try {
        const response = await fetch(`${apiUrl}?limit=${limit}`);
        if (!response.ok) throw new Error('Error al obtener los datos');

        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        console.error(error);
        alert('Hubo un problema al cargar los datos.');
    }
}


function displayResults(pokemonList) {
    resultsContainer.innerHTML = '';
    pokemonList.forEach(async (pokemon) => {
        const pokeData = await fetch(pokemon.url).then(res => res.json());
        
        
        const card = document.createElement('div');
        card.classList.add('card');
        
        const img = document.createElement('img');
        img.src = pokeData.sprites.front_default;
        img.alt = pokemon.name;
        
        const name = document.createElement('h3');
        name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        
       
        card.appendChild(img);
        card.appendChild(name);
        
        resultsContainer.appendChild(card);
    });
}

fetchBtn.addEventListener('click', () => {
    const quantity = quantityInput.value;
    if (quantity > 0) {
        fetchPokemonData(quantity);
    } else {
        alert('Por favor ingresa un número válido.');
    }
});

clearBtn.addEventListener('click', () => {
    resultsContainer.innerHTML = '';
    quantityInput.value = '';
});