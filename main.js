import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const navContainer = document.querySelector('.nav-container');
  navContainer.innerHTML = `
    <div class="logo">
        <img src="./logo.png" alt="JD Logo"> 
    </div>
    <label for="checkbox" class="menu" >
        <img src="./hamburguerMenu.png" alt="menu"/>
    </label>
    <input id="checkbox" type="checkbox" />
    <nav class="mainProposals">
        <ul>
            <li><a href="#">Hombre</a></li>
            <li><a href="#">Mujer</a></li>
            <li><a href="#">Niños</a></li>
            <li><a href="#">Ofertas</a></li>
        </ul>
    </nav>
    <div class="icons">
        <a href="#" ><img src="./icon_filter_.png" alt="Filter"></a> 
        <a href="#"><img src="./icon_shopping_basket_.png" alt="Cart"></a> 
        <a href="#"><img src="./icon_user_avatar_.png" alt="Profile"></a>
    </div>
  `
  const mainElement = document.querySelector('#mainElement');
  mainElement.innerHTML = `
    <div id="filterButtonDiv">
        <button id="filterButton"></button>
    </div>
    <div id="productsContainer" class="products"></div>
  `
  const products = [
      { id: 1, name: 'Air Max 1', brand: 'Nike Original', price: 120, image: '/airmax1.png' },
      { id: 2, name: 'NB 9060', brand: 'New Balance', price: 80, image: './nb9060.png' },
      { id: 3, name: 'Nike Revolution', brand: 'Nike Original', price: 90, image: './nikerev.png' },
      { id: 4, name: 'Forum Buckle', brand: 'Adidas Original', price: 100, image: './forumbuk.png' },
      { id: 5, name: 'Campus', brand: 'Adidas Original', price: 150, image: '/campus.png' },
      { id: 6, name: 'NB 327', brand: 'New Balance', price: 120, image: './nb327.png' },
      { id: 7, name: 'Dunk Low', brand: 'Nike Original', price: 100, image: './dunklow.png' },
      { id: 8, name: 'Gazelle', brand: 'Adidas Original', price: 90, image: './gazelle.png' },
      { id: 9, name: 'Air Max SC', brand: 'Nike Original', price: 150, image: './airmaxsc.png' },
      { id: 10, name: 'Handball Spezial', brand: 'Adidas Original', price: 120, image: './handballspezial.png' },
      { id: 11, name: 'Air Force', brand: 'Nike Original', price: 130, image: './airforce.png' },
      { id: 12, name: 'NB 9060', brand: 'New Balance', price: 100, image: './nb9060red.png' },
      { id: 13, name: 'NB 480', brand: 'New Balance', price: 150, image: './nb480.png' },
      { id: 14, name: 'Full Force Low', brand: 'Nike Original', price: 70, image: './fullforcelow.png' },
      { id: 15, name: 'Air Max SC', brand: 'Nike Original', price: 160, image: './airmaxscgrey.png' },
      { id: 16, name: 'Handball Spezial', brand: 'Adidas Original', price: 140, image: './handballspezialred.png' },
  ];
  
  const divImageMainElement = document.createElement('div');
  divImageMainElement.id='divImageMainElement';
  const imageMainElement = document.createElement('img');
  imageMainElement.src='./main-cover.jpeg';
  imageMainElement.alt='';
  imageMainElement.id='imageMainElement';
  divImageMainElement.appendChild(imageMainElement);
  mainElement.prepend(divImageMainElement);

  const productsContainer = document.getElementById('productsContainer');
  const filterButton = document.getElementById('filterButton');
  const imageFilterButton = document.createElement('img');
  imageFilterButton.src='./vectorDown.png';
  imageFilterButton.alt=''
  filterButton.innerHTML = '';  // Limpiar el texto del botón si es necesario
  filterButton.appendChild(imageFilterButton); 
  
  // Crear y agregar el modal de filtros
  const filterButtonDiv = document.getElementById('filterButtonDiv')
  const filterModal = document.createElement('div');
  let divSuggestedProducts = document.querySelector('.divSuggestedProducts');
  filterModal.id = 'filterModal';
  filterModal.className = 'modal';
  filterModal.innerHTML = `
      <div class="filterFormContainer">
          <form id="filterForm">
              <select id="brandFilter" name="brand" class="filter">
                  <option value="all">Todas las marcas</option>
                  <option value="Nike Original">Nike Original</option>
                  <option value="Adidas Original">Adidas Original</option>
                  <option value="New Balance">New Balance</option>
              </select>
              <input type="number" id="priceFilter" placeholder="Precio Máximo" min=0 class="filter">
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
      productsContainer.innerHTML='';
      priceFilter.classList.remove('priceFilterError');
      if (filteredProducts.length === 0) {
        priceFilter.classList.add('priceFilterError');
        renderSuggestedProducts();
      } else {
        if(divSuggestedProducts){
            divSuggestedProducts.innerHTML='';
        }
        renderProducts(filteredProducts);
      }
  }

  // Función para limpiar filtros
  function clearFilters() {
      brandFilter.value = 'all';
      priceFilter.value = '';
      productsContainer.innerHTML='';
      if (divSuggestedProducts) {
        divSuggestedProducts.innerHTML = '';
      }
      priceFilter.classList.remove('priceFilterError');
      renderProducts(products);
  }

  // Función para mostrar productos sugeridos
  function renderSuggestedProducts() {
    
    if (!divSuggestedProducts) {
        divSuggestedProducts = document.createElement('div');
        divSuggestedProducts.className = 'divSuggestedProducts';
        divSuggestedProducts.innerHTML = `<p id="suggestedProductsComment">No se encontraron productos con los filtros aplicados. Productos sugeridos:</p>`;
        
        const referenceNode = document.getElementById('filterButtonDiv');
        referenceNode.parentNode.insertBefore(divSuggestedProducts, referenceNode.nextSibling);
    }

    divSuggestedProducts.innerHTML = `<p id="suggestedProductsComment">No se encontraron productos con los filtros aplicados. Productos sugeridos:</p>`;

    const suggestedProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3);
    renderProducts(suggestedProducts);
  }

  filterButton.addEventListener('click', function() {
    // Alternar la visibilidad del contenedor de productos
    if (filterModal.style.display === 'none') {
        filterModal.style.display = 'block';
        imageFilterButton.src='./vectorUp.png';
    } else {
        filterModal.style.display = 'none';
        imageFilterButton.src='./vectorDown.png';
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

  const footerMenu = document.querySelector('#footerMenu');
  footerMenu.innerHTML = `
  <ul>
    <li>
    <h4>Compra con JD</h4>
    </li>
    <li>
    <a href="#">Guía de tallas</a>
    </li>
    <li>
    <a href="#">Buscador de tallas</a>
    </li>
    <li>
    <a href="#">Descuento estudiantes</a>
    </li>
    <li>
    <a href="#">Calendario lanzamientos</a>
    </li>
    <li>
    <a href="#">Inscribite a JDX</a>
    </li>
    <li>
    <a href="#">JD Blog</a>
    </li>
  </ul>
  <ul>
    <li>
    <h4>Atención al cliente</h4>
    </li>
    <li>
    <a href="#">Preguntas frecuentes</a>
    </li>
    <li>
    <a href="#">Envíos y devoluciones</a>
    </li>
    <li>
    <a href="#">Seguimiento de envío</a>
    </li>
    <li>
    <a href="#">Contacto</a>
    </li>
  </ul>
  <ul>
    <li>
    <h4>Aviso legal</h4>
    </li>
    <li>
    <a href="#">Términos y condiciones</a>
    </li>
    <li>
    <a href="#">Promociones y condiciones</a>
    </li>
    <li>
    <a href="#">Política de privacidad</a>
    </li>
    <li>
    <a href="#">Política de Cookies</a>
    </li>
    <li>
    <a href="#">Ajustes de Cookies</a>
    </li>
    <li>
    <a href="#">Accesibilidad</a>
    </li>
  </ul>
  `
});

