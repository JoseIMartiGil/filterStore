import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const products = [
      { id: 1, name: 'Air Max 1', brand: 'Nike Original', price: 120, image: '/assets/airmax1.png' },
      { id: 2, name: 'NB 9060', brand: 'New Balance', price: 80, image: '/assets/nb9060.png' },
      { id: 3, name: 'Nike Revolution', brand: 'Nike Original', price: 90, image: '/assets/nikerev.png' },
      { id: 4, name: 'Forum Buckle', brand: 'Adidas Original', price: 100, image: '/assets/forumbuk.png' },
      { id: 5, name: 'Campus', brand: 'Adidas Original', price: 150, image: '/assets/campus.png' },
      { id: 6, name: 'NB 327', brand: 'New Balance', price: 120, image: '/assets/nb327.png' },
      { id: 7, name: 'Dunk Low', brand: 'Nike Original', price: 100, image: '/assets/dunklow.png' },
      { id: 8, name: 'Gazelle', brand: 'Adidas Original', price: 90, image: '/assets/gazelle.png' },
      { id: 9, name: 'Air Max SC', brand: 'Nike Original', price: 150, image: '/assets/airmaxsc.png' },
      { id: 10, name: 'Handball Spezial', brand: 'Adidas Original', price: 120, image: '/assets/handballspezial.png' },
      { id: 11, name: 'Air Force', brand: 'Nike Original', price: 130, image: '/assets/airforce.png' },
      { id: 12, name: 'NB 9060', brand: 'New Balance', price: 100, image: '/assets/nb9060red.png' },
      { id: 13, name: 'NB 480', brand: 'New Balance', price: 150, image: '/assets/nb480.png' },
      { id: 14, name: 'Full Force Low', brand: 'Nike Original', price: 70, image: '/assets/fullforcelow.png' },
      { id: 15, name: 'Air Max SC', brand: 'Nike Original', price: 160, image: '/assets/airmaxscgrey.png' },
      { id: 16, name: 'Handball Spezial', brand: 'Adidas Original', price: 140, image: '/assets/handballspezialred.png' },
  ];

  const productsContainer = document.getElementById('productsContainer');
  
  const filterButton = document.getElementById('filterButton');
  
 

  console.log(filterButton)
  // Crear y agregar el modal de filtros
  const filterModal = document.createElement('div');
  filterModal.id = 'filterModal';
  filterModal.className = 'modal';
  filterModal.innerHTML = `
      <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Filtros</h2>
          <form id="filterForm">
              <label for="brandFilter">Marca:</label>
              <select id="brandFilter" name="brand">
                  <option value="all">Todas</option>
                  <option value="Nike Original">Nike Original</option>
                  <option value="Adidas Original">Adidas Original</option>
                  <option value="New Balance">New Balance</option>
              </select>
              <label for="priceFilter">Precio máximo:</label>
              <input type="number" id="priceFilter" name="price" min="0">
              <button type="button" id="applyFilters">Aplicar Filtros</button>
              <button type="button" id="clearFilters">Limpiar Filtros</button>
          </form>
      </div>
  `;
  document.body.appendChild(filterModal);

  const closeModal = document.getElementsByClassName('close')[0];
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
              <h2>${product.name}</h2>
              <p>${product.brand}</p>
              <p>${product.price} €</p>
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
      const suggestedProducts = products.sort(() => 0.5 - Math.random()).slice(0, 5);
      renderProducts(suggestedProducts);
  }

  // Eventos para mostrar/ocultar el modal
  filterButton.onclick = () => {
    filterModal.style.display = 'block';
  };

  closeModal.onclick = () => {
    filterModal.style.display = 'none';
  };

  window.onclick = (event) => {
      if (event.target === filterModal) {
          filterModal.style.display = 'none';
      }
  };

  // Eventos para aplicar y limpiar filtros
  applyFiltersButton.onclick = () => {
      applyFilters();
      filterModal.style.display = 'none';
  };

  clearFiltersButton.onclick = () => {
      clearFilters();
  };

  // Pintar productos inicialmente
  renderProducts(products);
});

