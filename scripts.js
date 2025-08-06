document.addEventListener('DOMContentLoaded', function() {
    const screens = document.querySelectorAll('.screen');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.querySelector('.cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const backToProductsBtn = document.querySelector('.back-to-products');
    const searchInput = document.getElementById('search-input');
    const noResults = document.querySelector('.no-results');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const exploreBtn = document.getElementById('explore-btn');
    const homeLogo = document.getElementById('home-logo');
    const footerLogo = document.getElementById('footer-logo');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentScreen = localStorage.getItem('currentScreen') || 'home';
    let products = [];
    let decantProducts = [];
    
    function init() {
        loadProducts();
        setupEventListeners();
        updateCartCount();
        showScreen(currentScreen);
        
        // Verificar si debemos mostrar detalle de producto al cargar
        if (currentScreen === 'product-detail') {
            const productName = localStorage.getItem('currentProduct');
            if (productName) {
                showProductDetail(productName);
            }
        }
    }
    
    function loadProducts() {
        products = [
            {
                id: 1,
                name: "Lattafa Raghba for Men",
                category: "man",
                price: 1850,
                image: "./img/lattafa-raghba-men.jpg",
                description: "Una fragancia oriental amaderada para hombre que combina notas de vainilla, ámbar y sándalo con un toque moderno. Ideal para ocasiones nocturnas y eventos especiales.",
                features: ["Notas de salida: Bergamota, Cardamomo", "Notas de corazón: Vainilla, Ámbar", "Notas de fondo: Sándalo, Pachulí"],
                durability: "8-10 horas"
            },
            {
                id: 2,
                name: "Lattafa Yara",
                category: "woman",
                price: 1650,
                image: "./img/lattafa-yara.jpg",
                description: "Una fragancia floral frutal para mujer con notas de frutas tropicales y flores blancas. Perfecta para el día a día y reuniones sociales.",
                features: ["Notas de salida: Frutas tropicales", "Notas de corazón: Flores blancas", "Notas de fondo: Vainilla, Almizcle"],
                durability: "6-8 horas"
            },
            {
                id: 3,
                name: "Swiss Arabian Shaghaf Oud",
                category: "unisex",
                price: 2100,
                image: "./img/swiss-arabian-shaghaf.jpg",
                description: "Una fragancia oriental amaderada unisex con notas de oud, azafrán y rosas. Una experiencia olfativa intensa y duradera.",
                features: ["Notas de salida: Azafrán, Cardamomo", "Notas de corazón: Rosa, Oud", "Notas de fondo: Ámbar, Sándalo"],
                durability: "10-12 horas"
            },
            {
                id: 4,
                name: "Rasasi Hawas",
                category: "man",
                price: 1950,
                image: "./img/rasasi-hawas.jpg",
                description: "Una fragancia acuática aromática para hombre con notas de manzana, lavanda y ámbar. Fresca y vigorizante para uso diario.",
                features: ["Notas de salida: Manzana, Bergamota", "Notas de corazón: Lavanda, Pimienta", "Notas de fondo: Ámbar, Almizcle"],
                durability: "8-10 horas"
            },
            {
                id: 5,
                name: "Lattafa Ana Abiyedh",
                category: "woman",
                price: 1750,
                image: "./img/lattafa-ana-abiyedh.jpg",
                description: "Una fragancia floral frutal para mujer con notas de pera, lirio y almizcle. Elegante y sofisticada para ocasiones especiales.",
                features: ["Notas de salida: Pera, Bergamota", "Notas de corazón: Lirio, Jazmín", "Notas de fondo: Almizcle, Vainilla"],
                durability: "6-8 horas"
            },
            {
                id: 6,
                name: "Al Haramain Amber Oud",
                category: "unisex",
                price: 2250,
                image: "./img/al-haramain-amber-oud.jpg",
                description: "Una fragancia oriental amaderada unisex con notas de oud, ámbar y vainilla. Lujosa y exótica para quienes buscan algo único.",
                features: ["Notas de salida: Azafrán, Cardamomo", "Notas de corazón: Oud, Rosa", "Notas de fondo: Ámbar, Vainilla"],
                durability: "12+ horas"
            }
        ];
        
        decantProducts = products.map(product => ({
            ...product,
            price: Math.round(product.price * 0.3),
            name: `${product.name} (Decant 30ml)`
        }));
        
        renderProducts(products, document.getElementById('perfumes-grid'));
        renderProducts(decantProducts, document.getElementById('decant-grid'));
        renderProducts(products.filter(p => p.id <= 3), document.querySelector('.products-grid'));
        renderProducts(products.slice(0, 3), document.getElementById('promotions-grid'));
    }
    
    function setupEventListeners() {
        // Logo click event
        homeLogo.addEventListener('click', function(e) {
            e.preventDefault();
            setCurrentScreen('home');
            showScreen('home');
            navLinks.forEach(l => l.classList.remove('nav-active'));
            document.querySelector('.nav-link[data-target="home"]').classList.add('nav-active');
        });
        
        // Footer logo click event
        footerLogo.addEventListener('click', function(e) {
            e.preventDefault();
            setCurrentScreen('home');
            showScreen('home');
            navLinks.forEach(l => l.classList.remove('nav-active'));
            document.querySelector('.nav-link[data-target="home"]').classList.add('nav-active');
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('data-target');
                setCurrentScreen(target);
                showScreen(target);
                
                navLinks.forEach(l => l.classList.remove('nav-active'));
                this.classList.add('nav-active');
                
                if (window.innerWidth <= 992) {
                    nav.classList.remove('active');
                }
            });
        });
        
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
        
        cartIcon.addEventListener('click', function() {
            cartModal.classList.add('active');
            renderCartItems();
        });
        
        closeCart.addEventListener('click', function() {
            cartModal.classList.remove('active');
        });
        
        checkoutBtn.addEventListener('click', function() {
            alert('Procediendo al pago...');
        });
        
        whatsappBtn.addEventListener('click', function() {
            this.classList.add('pulse');
            setTimeout(() => this.classList.remove('pulse'), 500);
        });
        
        backToProductsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            setCurrentScreen('perfumes');
            showScreen('perfumes');
        });
        
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const target = 'perfumes';
                setCurrentScreen(target);
                showScreen(target);
                
                navLinks.forEach(l => l.classList.remove('nav-active'));
                document.querySelector(`.nav-link[data-target="${target}"]`).classList.add('nav-active');
            });
        }
        
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
                const productCard = e.target.closest('.product-card');
                const productName = productCard.getAttribute('data-name');
                addToCart(productName);
            }
            
            if (e.target.classList.contains('view-detail-btn') || e.target.classList.contains('view-detail') || e.target.closest('.view-detail-btn') || e.target.closest('.view-detail')) {
                e.preventDefault();
                const productCard = e.target.closest('.product-card');
                const productName = productCard.getAttribute('data-name');
                showProductDetail(productName);
            }
            
            if (e.target.classList.contains('quantity-btn') || e.target.closest('.quantity-btn')) {
                const cartItem = e.target.closest('.cart-item');
                const productName = cartItem.querySelector('.cart-item-title').textContent;
                const isIncrease = e.target.textContent === '+' || (e.target.closest('.quantity-btn') && e.target.closest('.quantity-btn').textContent === '+');
                updateCartItemQuantity(productName, isIncrease);
            }
            
            if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
                const cartItem = e.target.closest('.cart-item');
                const productName = cartItem.querySelector('.cart-item-title').textContent;
                removeFromCart(productName);
            }
            
            if (e.target.classList.contains('detail-image')) {
                e.target.classList.toggle('zoomed');
            }
        });
        
        searchInput.addEventListener('input', function() {
            filterProducts();
        });
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterProducts();
            });
        });
    }
    
    function setCurrentScreen(screen) {
        currentScreen = screen;
        localStorage.setItem('currentScreen', screen);
    }
    
    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = 'none';
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.style.display = 'block';
            setTimeout(() => targetScreen.classList.add('active'), 10);
        }
        
        if (screenId === 'perfumes') {
            filterProducts();
        }
        
        window.scrollTo(0, 0);
    }
    
    function renderProducts(productsArray, container) {
        container.innerHTML = '';
        
        if (productsArray.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        
        productsArray.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card animate-slide-up';
            productCard.setAttribute('data-name', product.name);
            
            productCard.innerHTML = `
                <div class="product-badge">${product.id <= 3 ? (product.id === 1 ? 'Nuevo' : product.id === 2 ? 'Más vendido' : 'Exclusivo') : 'Popular'}</div>
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-actions">
                        <div class="action-btn add-to-cart"><i class="fas fa-shopping-bag"></i></div>
                        <div class="action-btn view-detail-btn"><i class="fas fa-search"></i></div>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category === 'man' ? 'Hombre' : product.category === 'woman' ? 'Mujer' : 'Unisex'}</span>
                    <h3>${product.name}</h3>
                    <div class="product-price">$<span class="current-price">${product.price.toLocaleString()}</span> MXN</div>
                    <a href="#" class="btn view-detail">Ver Detalles</a>
                </div>
            `;
            
            container.appendChild(productCard);
        });
    }
    
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
        
        let filteredProducts = products;
        
        if (activeCategory !== 'all') {
            filteredProducts = products.filter(product => product.category === activeCategory);
        }
        
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
            );
        }
        
        noResults.style.display = filteredProducts.length === 0 ? 'block' : 'none';
        renderProducts(filteredProducts, document.getElementById('perfumes-grid'));
    }
    
    function showProductDetail(productName) {
        const product = [...products, ...decantProducts].find(p => p.name === productName);
        if (!product) return;
        
        localStorage.setItem('currentProduct', productName);
        setCurrentScreen('product-detail');
        
        const detailContent = document.getElementById('detail-content');
        detailContent.innerHTML = `
            <div class="detail-image-container">
                <img src="${product.image}" alt="${product.name}" class="detail-image">
            </div>
            <div class="detail-info">
                <span class="detail-category">${product.category === 'man' ? 'Hombre' : product.category === 'woman' ? 'Mujer' : 'Unisex'}</span>
                <h2>${product.name}</h2>
                <div class="detail-price">$${product.price.toLocaleString()} MXN</div>
                <p class="detail-description">${product.description}</p>
                <button class="btn add-to-cart-detail">Añadir al Carrito</button>
                
                <div class="detail-features">
                    <div class="feature-card">
                        <h4>Notas Olfativas</h4>
                        <ul class="feature-list">
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="feature-card">
                        <h4>Durabilidad</h4>
                        <ul class="feature-list">
                            <li>${product.durability}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        document.querySelector('.add-to-cart-detail').addEventListener('click', () => addToCart(product.name));
        
        showScreen('product-detail');
    }
    
    function addToCart(productName) {
        const product = [...products, ...decantProducts].find(p => p.name === productName);
        if (!product) return;
        
        const existingItem = cart.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        updateCart();
        cartIcon.classList.add('pulse');
        setTimeout(() => cartIcon.classList.remove('pulse'), 500);
    }
    
    function updateCartItemQuantity(productName, isIncrease) {
        const item = cart.find(item => item.name === productName);
        if (!item) return;
        
        if (isIncrease) {
            item.quantity += 1;
        } else {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                removeFromCart(productName);
                return;
            }
        }
        
        updateCart();
    }
    
    function removeFromCart(productName) {
        cart = cart.filter(item => item.name !== productName);
        updateCart();
    }
    
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    }
    
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
            cartSubtotal.textContent = '$0.00 MXN';
            cartTotal.textContent = '$0.00 MXN';
            return;
        }
        
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString()} MXN</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-btn">+</button>
                        <button class="remove-item"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        cartSubtotal.textContent = `$${subtotal.toLocaleString()} MXN`;
        cartTotal.textContent = `$${subtotal.toLocaleString()} MXN`;
    }
    
    init();
});