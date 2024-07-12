import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const products = [
      { id: 1, name: 'Air Max 1', brand: 'Nike Original', price: 120, image: '/public/airmax1.png' },
      { id: 2, name: 'NB 9060', brand: 'New Balance', price: 80, image: '/public/nb9060.png' },
      { id: 3, name: 'Nike Revolution', brand: 'Nike Original', price: 90, image: '/public/nikerev.png' },
      { id: 4, name: 'Forum Buckle', brand: 'Adidas Original', price: 100, image: '/public/forumbuk.png' },
      { id: 5, name: 'Campus', brand: 'Adidas Original', price: 150, image: '/public/campus.png' },
      { id: 6, name: 'NB 327', brand: 'New Balance', price: 120, image: '/public/nb327.png' },
      { id: 7, name: 'Dunk Low', brand: 'Nike Original', price: 100, image: '/public/dunklow.png' },
      { id: 8, name: 'Gazelle', brand: 'Adidas Original', price: 90, image: '/public/gazelle.png' },
      { id: 9, name: 'Air Max SC', brand: 'Nike Original', price: 150, image: '/public/airmaxsc.png' },
      { id: 10, name: 'Handball Spezial', brand: 'Adidas Original', price: 120, image: '/public/handballspezial.png' },
      { id: 11, name: 'Air Force', brand: 'Nike Original', price: 130, image: '/public/airforce.png' },
      { id: 12, name: 'NB 9060', brand: 'New Balance', price: 100, image: '/public/nb9060red.png' },
      { id: 13, name: 'NB 480', brand: 'New Balance', price: 150, image: '/public/nb480.png' },
      { id: 14, name: 'Full Force Low', brand: 'Nike Original', price: 70, image: '/public/fullforcelow.png' },
      { id: 15, name: 'Air Max SC', brand: 'Nike Original', price: 160, image: '/public/airmaxscgrey.png' },
      { id: 16, name: 'Handball Spezial', brand: 'Adidas Original', price: 140, image: '/public/handballspezialred.png' },
  ];
  const mainElement = document.getElementById('mainElement');
  const divImageMainElement = document.createElement('div');
  divImageMainElement.id='divImageMainElement';
  const imageMainElement = document.createElement('img');
  imageMainElement.src='./public/main-cover.jpeg';
  imageMainElement.alt='';
  imageMainElement.id='imageMainElement';
  divImageMainElement.appendChild(imageMainElement);
  mainElement.prepend(divImageMainElement);

  const productsContainer = document.getElementById('productsContainer');
  const filterButton = document.getElementById('filterButton');
  const imageFilterButton = document.createElement('img');
  imageFilterButton.src='./public/vectorDown.png';
  imageFilterButton.alt=''
  filterButton.innerHTML = '';  // Limpiar el texto del botón si es necesario
  filterButton.appendChild(imageFilterButton); 
  
  // Crear y agregar el modal de filtros
  const filterButtonDiv = document.getElementById('filterButtonDiv')
  const filterModal = document.createElement('div');
  filterModal.id = 'filterModal';
  filterModal.className = 'modal';
  filterModal.innerHTML = `
      <div class="filterFormContainer">
          <form id="filterForm">
              <select id="brandFilter" name="brand" class="filter">
                  <option value="all">All brands</option>
                  <option value="Nike Original">Nike Original</option>
                  <option value="Adidas Original">Adidas Original</option>
                  <option value="New Balance">New Balance</option>
              </select>
              <input type="number" id="priceFilter" min=0 class="filter">
              <button type="button" id="applyFilters" class="filter innerButtonFilter">Filtrar</button>
              <button type="button" id="clearFilters" class="filter innerButtonFilter">Limpiar</button>
          </form>
      </div>
  `;
  filterButtonDiv.prepend(filterModal);
  filterModal.style.display = 'none';

  const applyFiltersButton = document.getElementById('applyFilters');
  const clearFiltersButton = document.getElementById('clearFilters');
  const brandFilter = document.getElementById('brandFilter');
  const priceFilter = document.getElementById('priceFilter');

  // Función para pintar productos
  function renderProducts(filteredProducts) {
      productsContainer.innerHTML='';
      filteredProducts.forEach(product => {
          const productElement = document.createElement('div');
          productElement.className = 'product';
          productElement.innerHTML = `
              <div class="image-container">
                <img src="${product.image}" alt="${product.name}">
              </div>
              <p id="cardBrandText">${product.brand}</p>
              <div id="detailsCard">
                <p>${product.name}</p>
                <p>${product.price.toFixed(2)} €</p>
              </div>
              <button>Comprar</button>
          `;
          productsContainer.appendChild(productElement);
      });
  }

  // Función para aplicar filtros
  function applyFilters() {
      const brand = brandFilter.value;
      const price = parseFloat(priceFilter.value);

      let filteredProducts = products;

      if (brand !== 'all') {
          filteredProducts = filteredProducts.filter(product => product.brand === brand);
      }

      if (!isNaN(price)) {
          filteredProducts = filteredProducts.filter(product => product.price <= price);
      }

      if (filteredProducts.length === 0) {
          renderSuggestedProducts();
      } else {
          renderProducts(filteredProducts);
      }
  }

  // Función para limpiar filtros
  function clearFilters() {
      brandFilter.value = 'all';
      priceFilter.value = '';
      renderProducts(products);
  }

  // Función para mostrar productos sugeridos
  function renderSuggestedProducts() {
      productsContainer.innerHTML = '<p>No se encontraron productos con los filtros aplicados. Productos sugeridos:</p>';
      const suggestedProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3);
      renderProducts(suggestedProducts);
  }

  filterButton.addEventListener('click', function() {
    // Alternar la visibilidad del contenedor de productos
    if (filterModal.style.display === 'none') {
        filterModal.style.display = 'block';
        imageFilterButton.src='./public/vectorUp.png';
    } else {
        filterModal.style.display = 'none';
        imageFilterButton.src='./public/vectorDown.png';
    }
  });

  // Eventos para aplicar y limpiar filtros
  applyFiltersButton.onclick = () => {
      applyFilters();
  };

  clearFiltersButton.onclick = () => {
      clearFilters();
  };

  // Pintar productos inicialmente
  renderProducts(products);
});

