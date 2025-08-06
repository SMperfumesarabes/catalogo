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
            // HOMBRE
            {
                id: 1,
                name: "Stallion 53 Linea Emper",
                category: "man",
                price: 2200,
                image: "./img/stallion53.png",
                description: "Fragancia para hombre de la línea Emper, con notas frescas y amaderadas que evocan fuerza y elegancia.",
                features: ["Notas de salida: Bergamota, Cardamomo", "Notas de corazón: Cedro, Pimienta", "Notas de fondo: Ámbar, Cuero"],
                durability: "8-10 horas"
            },
            {
                id: 2,
                name: "Fahkar Lattafa",
                category: "man",
                price: 1850,
                image: "./img/fahkar.png",
                description: "Un perfume árabe intenso para hombre con notas de cuero y especias, ideal para la noche.",
                features: ["Notas de salida: Lavanda, Bergamota", "Notas de corazón: Cuero, Canela", "Notas de fondo: Vainilla, Ámbar"],
                durability: "10-12 horas"
            },
            {
                id: 3,
                name: "Fahkar Gold Lattafa",
                category: "man",
                price: 1950,
                image: "./img/fahkar-gold.png",
                description: "Versión premium de Fahkar, con toques de oro en su esencia, más dulce y sofisticada.",
                features: ["Notas de salida: Bergamota, Limón", "Notas de corazón: Canela, Rosa", "Notas de fondo: Vainilla, Ámbar, Almizcle"],
                durability: "12+ horas"
            },
            {
                id: 4,
                name: "Hayaati Gold Elixir Lattafa",
                category: "man",
                price: 2100,
                image: "./img/hayaati-gold-elixir.png",
                description: "Elixir dorado para hombre con una mezcla de notas frescas y amaderadas, con un toque de lujo.",
                features: ["Notas de salida: Manzana, Bergamota", "Notas de corazón: Vainilla, Canela", "Notas de fondo: Ámbar, Sándalo"],
                durability: "10-12 horas"
            },
            {
                id: 5,
                name: "Asad Lattafa",
                category: "man",
                price: 1900,
                image: "./img/asad.png",
                description: "Un perfume árabe fuerte y especiado para el hombre moderno y audaz.",
                features: ["Notas de salida: Pimienta negra, Bergamota", "Notas de corazón: Vainilla, Canela", "Notas de fondo: Ámbar, Tabaco"],
                durability: "8-10 horas"
            },
            {
                id: 6,
                name: "Asad Zanzibar Lattafa",
                category: "man",
                price: 2000,
                image: "./img/asad-zanzibar.png",
                description: "Versión exótica de Asad con notas tropicales de Zanzíbar, fresca y envolvente.",
                features: ["Notas de salida: Cítricos, Menta", "Notas de corazón: Vainilla, Especias", "Notas de fondo: Ámbar, Maderas"],
                durability: "8-10 horas"
            },
            {
                id: 7,
                name: "Qaed Al Fursan Lattafa",
                category: "man",
                price: 1800,
                image: "./img/qaed-al-fursan.png",
                description: "Fragancia para el caballero moderno, con notas afrutadas y amaderadas.",
                features: ["Notas de salida: Piña, Bergamota", "Notas de corazón: Rosa, Manzana", "Notas de fondo: Vainilla, Sándalo"],
                durability: "6-8 horas"
            },
            {
                id: 8,
                name: "Maahir Lattafa",
                category: "man",
                price: 1750,
                image: "./img/maahir.png",
                description: "Perfil fresco y acuático para el hombre activo y dinámico.",
                features: ["Notas de salida: Manzana, Lavanda", "Notas de corazón: Vainilla, Canela", "Notas de fondo: Almizcle, Ámbar"],
                durability: "6-8 horas"
            },
            {
                id: 9,
                name: "Ameerat Al Arab",
                category: "man",
                price: 2300,
                image: "./img/ameerat-al-arab.png",
                description: "Un perfume de lujo para el caballero árabe, con notas intensas y duraderas.",
                features: ["Notas de salida: Bergamota, Cardamomo", "Notas de corazón: Cuero, Canela", "Notas de fondo: Vainilla, Ámbar"],
                durability: "12+ horas"
            },
            {
                id: 10,
                name: "Al Noble Waazer Lattafa",
                category: "man",
                price: 1950,
                image: "./img/al-noble-waazer.png",
                description: "Fragancia noble y sofisticada con notas amaderadas y especiadas.",
                features: ["Notas de salida: Bergamota, Lavanda", "Notas de corazón: Canela, Pimienta", "Notas de fondo: Ámbar, Sándalo"],
                durability: "8-10 horas"
            },
            // MUJER
            {
                id: 11,
                name: "Yara Lattafa",
                category: "woman",
                price: 1650,
                image: "./img/yara.png",
                description: "Fragancia floral frutal para mujer con notas de frutas tropicales y flores blancas.",
                features: ["Notas de salida: Frutas tropicales", "Notas de corazón: Flores blancas", "Notas de fondo: Vainilla, Almizcle"],
                durability: "6-8 horas"
            },
            {
                id: 12,
                name: "Yara Candy Lattafa",
                category: "woman",
                price: 1700,
                image: "./img/yara-candy.png",
                description: "Versión dulce de Yara, con notas de caramelo y frutas, ideal para el día.",
                features: ["Notas de salida: Frambuesa, Caramelo", "Notas de corazón: Vainilla, Jazmín", "Notas de fondo: Almizcle, Sándalo"],
                durability: "6-8 horas"
            },
            {
                id: 13,
                name: "Yara Moi Lattafa",
                category: "woman",
                price: 1750,
                image: "./img/yara-moi.png",
                description: "Interpretación más intensa y cremosa de Yara, con notas de leche y frutas.",
                features: ["Notas de salida: Frutas rojas, Leche", "Notas de corazón: Flores blancas, Vainilla", "Notas de fondo: Almizcle, Sándalo"],
                durability: "8-10 horas"
            },
            {
                id: 14,
                name: "Ana Rouge Lattafa",
                category: "woman",
                price: 1800,
                image: "./img/ana-rouge.png",
                description: "Fragancia floral oriental con toques frutales, elegante y sofisticada.",
                features: ["Notas de salida: Pera, Bergamota", "Notas de corazón: Rosa, Jazmín", "Notas de fondo: Vainilla, Almizcle"],
                durability: "8-10 horas"
            },
            {
                id: 15,
                name: "La Vivacite Maison",
                category: "woman",
                price: 1900,
                image: "./img/la-vivacite.png",
                description: "Perfume fresco y vivaz para la mujer alegre y llena de energía.",
                features: ["Notas de salida: Cítricos, Frutas", "Notas de corazón: Flores blancas, Muguete", "Notas de fondo: Almizcle, Vainilla"],
                durability: "6-8 horas"
            },
            {
                id: 16,
                name: "Leonie Maison Alhambra",
                category: "woman",
                price: 1850,
                image: "./img/leonie.png",
                description: "Fragancia floral suave y femenina, con un toque moderno y fresco.",
                features: ["Notas de salida: Bergamota, Grosella", "Notas de corazón: Rosa, Peonía", "Notas de fondo: Almizcle, Vainilla"],
                durability: "6-8 horas"
            },
            {
                id: 17,
                name: "Mayar Lattafa",
                category: "woman",
                price: 1700,
                image: "./img/mayar.png",
                description: "Un aroma frutal floral con notas jugosas y un fondo cremoso.",
                features: ["Notas de salida: Frutas rojas, Pera", "Notas de corazón: Flores, Vainilla", "Notas de fondo: Almizcle, Sándalo"],
                durability: "8-10 horas"
            },
            {
                id: 18,
                name: "Mayar Menta Lattafa",
                category: "woman",
                price: 1750,
                image: "./img/mayar-menta.png",
                description: "Mayar con un toque de menta fresca, ideal para días calurosos.",
                features: ["Notas de salida: Menta, Frutas cítricas", "Notas de corazón: Flores, Vainilla", "Notas de fondo: Almizcle, Sándalo"],
                durability: "6-8 horas"
            },
            {
                id: 19,
                name: "Haya Lattafa",
                category: "woman",
                price: 1650,
                image: "./img/haya.png",
                description: "Fragancia floral con notas de frutas y un fondo dulce y amaderado.",
                features: ["Notas de salida: Frutas tropicales", "Notas de corazón: Flores, Vainilla", "Notas de fondo: Almizcle, Sándalo"],
                durability: "6-8 horas"
            },
            {
                id: 20,
                name: "Her Confession Lattafa",
                category: "woman",
                price: 1950,
                image: "./img/her-confession.png",
                description: "Perfume oriental floral para la mujer misteriosa y seductora.",
                features: ["Notas de salida: Azafrán, Frutas", "Notas de corazón: Flores, Vainilla", "Notas de fondo: Ámbar, Almizcle"],
                durability: "10-12 horas"
            },
            // UNISEX
            {
                id: 21,
                name: "Hayaati Gold Elixir Lattafa",
                category: "unisex",
                price: 2100,
                image: "./img/hayaati-gold-elixir.png",
                description: "Elixir dorado con una mezcla de notas frescas y amaderadas, unisex.",
                features: ["Notas de salida: Manzana, Bergamota", "Notas de corazón: Vainilla, Canela", "Notas de fondo: Ámbar, Sándalo"],
                durability: "10-12 horas"
            },
            {
                id: 22,
                name: "Khamrah Lattafa",
                category: "unisex",
                price: 2000,
                image: "./img/khamrah.png",
                description: "Fragancia gourmand con notas de vainilla, canela y licor, cálida y acogedora.",
                features: ["Notas de salida: Canela, Vainilla", "Notas de corazón: Flor de naranjo, Almendra", "Notas de fondo: Ámbar, Sándalo"],
                durability: "12+ horas"
            },
            {
                id: 23,
                name: "Khamrah Qawa Lattafa",
                category: "unisex",
                price: 2050,
                image: "./img/khamrah-qawa.png",
                description: "Versión intensa de Khamrah con notas de café, para los amantes de lo fuerte y dulce.",
                features: ["Notas de salida: Café, Canela", "Notas de corazón: Vainilla, Flor de naranjo", "Notas de fondo: Ámbar, Sándalo"],
                durability: "12+ horas"
            },
            {
                id: 24,
                name: "La escencia de Karol G",
                category: "unisex",
                price: 2300,
                image: "./img/karol-g.png",
                description: "Fragancia inspirada en Karol G, con notas tropicales y vibrantes.",
                features: ["Notas de salida: Frutas tropicales, Cítricos", "Notas de corazón: Flores, Vainilla", "Notas de fondo: Ámbar, Maderas"],
                durability: "8-10 horas"
            }
        ];
        
        decantProducts = products.map(product => ({
            ...product,
            price: Math.round(product.price * 0.3),
            name: `${product.name} `
        }));
        
        // Renderizar todos los perfumes en la página de perfumes (sin badges)
        renderProducts(products, document.getElementById('perfumes-grid'), false);
        
        // Renderizar decants en su página (sin badges)
        renderProducts(decantProducts, document.getElementById('decant-grid'), false);
        
        // Para la página principal: mostrar solo Al noble waazer (hombre), Yara Candy (mujer), Khamrah Qawa (unisex) CON BADGES
        const featuredProducts = products.filter(p => 
            p.name === "Al Noble Waazer Lattafa" || 
            p.name === "Yara Candy Lattafa" || 
            p.name === "Khamrah Qawa Lattafa"
        );
        renderProducts(featuredProducts, document.querySelector('.products-grid'), true);
        
        // Para la página de promociones: asignar descuentos a los productos (sin badges)
        const promotionProducts = products.map(p => {
            // Crear una copia para no modificar el original
            const product = {...p};
            // Aplicar descuentos
            if (product.name === "Stallion 53 Linea Emper") {
                product.discount = 15;
                product.discountedPrice = Math.round(product.price * (1 - 0.15));
            } else if (product.name === "Yara Lattafa") {
                product.discount = 20;
                product.discountedPrice = Math.round(product.price * (1 - 0.20));
            } else if (product.name === "La escencia de Karol G") {
                product.discount = 25;
                product.discountedPrice = Math.round(product.price * (1 - 0.25));
            }
            return product;
        }).filter(p => p.discount); // Solo los que tienen descuento
        
        renderProducts(promotionProducts, document.getElementById('promotions-grid'), false);
    }

    function renderProducts(productsArray, container, showBadges = false) {
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

            let badgeHTML = '';
            if (showBadges) {
                // Solo en la página principal mostramos badges
                if (product.name === "Al Noble Waazer Lattafa") {
                    badgeHTML = '<div class="product-badge">Nuevo</div>';
                } else if (product.name === "Yara Candy Lattafa") {
                    badgeHTML = '<div class="product-badge">Más vendido</div>';
                } else if (product.name === "Khamrah Qawa Lattafa") {
                    badgeHTML = '<div class="product-badge">Exclusivo</div>';
                }
            }

            let priceHTML;
            if (product.discount) {
                priceHTML = `
                    <div class="product-price">
                        <span class="original-price">$${product.price.toLocaleString()}</span>
                        $<span class="discount-price">${product.discountedPrice.toLocaleString()}</span> MXN
                        <div class="discount-badge">-${product.discount}%</div>
                    </div>
                `;
            } else {
                priceHTML = `
                    <div class="product-price">$<span class="current-price">${product.price.toLocaleString()}</span> MXN</div>
                `;
            }

            productCard.innerHTML = `
                ${badgeHTML}
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
                    ${priceHTML}
                    <a href="#" class="btn view-detail">Ver Detalles</a>
                </div>
            `;

            container.appendChild(productCard);
        });
    }
    
    function setupEventListeners() {
        // Logo click event
        homeLogo.addEventListener('click', function(e) {
            e.preventDefault();
            const target = 'home';
            setCurrentScreen(target);
            showScreen(target);
            
            navLinks.forEach(l => l.classList.remove('nav-active'));
            document.querySelector('.nav-link[data-target="home"]').classList.add('nav-active');
        });
        
        // Footer logo click event
        footerLogo.addEventListener('click', function(e) {
            e.preventDefault();
            const target = 'home';
            setCurrentScreen(target);
            showScreen(target);
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
        renderProducts(filteredProducts, document.getElementById('perfumes-grid'), false);
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