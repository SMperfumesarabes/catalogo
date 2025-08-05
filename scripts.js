document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const navLinks = document.querySelectorAll('.nav-link');
    const screens = document.querySelectorAll('.screen');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const logoLink = document.querySelector('.logo-link');
    const cartIcon = document.querySelector('.cart-icon');
    const closeCart = document.querySelector('.close-cart');
    const cartModal = document.querySelector('.cart-modal');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const shippingFee = document.getElementById('shipping-fee');
    const cartCount = document.querySelector('.cart-count');
    const exploreBtn = document.getElementById('explore-btn');
    const searchInput = document.getElementById('search-input');
    const perfumesGrid = document.getElementById('perfumes-grid');
    const decantGrid = document.getElementById('decant-grid');
    const promotionsGrid = document.getElementById('promotions-grid');
    const detailContainer = document.getElementById('detail-content');
    const backToProducts = document.querySelector('.back-to-products');
    const viewCollectionBtn = document.getElementById('view-collection-btn');
    const policyLinks = document.querySelectorAll('.policy-link');
    const filterBar = document.querySelector('.filter-bar');
    
    let cart = [];

    // Navegación entre pantallas
    function navigateTo(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
            if(screen.id === screenId) screen.classList.add('active');
        });
        
        navLinks.forEach(link => {
            link.classList.toggle('nav-active', link.dataset.target === screenId);
        });
        
        window.scrollTo(0, 0);
    }

    // Eventos de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.target);
        });
    });

    menuToggle.addEventListener('click', () => nav.classList.toggle('active'));
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('home');
    });

    // Eventos específicos de botones
    if(exploreBtn) exploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('perfumes');
    });

    if(viewCollectionBtn) viewCollectionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('promotions');
    });

    // Carrito
    cartIcon.addEventListener('click', () => cartModal.classList.add('active'));
    closeCart.addEventListener('click', () => cartModal.classList.remove('active'));

    // Inventario de perfumes
    const perfumesInventory = {
        "Fakhar Lattafa": {
            name: "Fakhar Lattafa",
            category: "Hombre",
            price: 1129,
            image: "./img/Fakhar_Lattafa.png",
            description: "Fragancia oriental amaderada con notas de oud, vainilla y azúcar quemada.",
            tones: ["Aromático", "Amaderado", "Fresco Especiado"],
            topNotes: ["Manzana", "Bergamota"],
            duration: "Duradera"
        },
        "Fakhar Gold Lattafa": {
            name: "Fakhar Gold Lattafa",
            category: "Hombre",
            price: 949,
            image: "./img/Fakhar_Gold_Lattafa.png",
            description: "Elegante fragancia con un toque fresco de bergamota.",
            tones: ["Ámbar", "Nardos", "Floral Blanco"],
            topNotes: ["Toronja", "Pimienta Rosa"],
            duration: "Duradera"
        },
        "Asad Lattafa": {
            name: "Asad Lattafa",
            category: "Hombre",
            price: 1049,
            image: "./img/Asad_Lattafa.png",
            description: "Fragancia acuática con notas frescas de manzana y cardamomo.",
            tones: ["Ámbar", "Fresco Especiado", "Avainillado"],
            topNotes: ["Pimienta Negra", "Piña"],
            duration: "Duradera"
        },
        "Ameerat Al Arab Asdaaf": {
            name: "Ameerat Al Arab Asdaaf",
            category: "Hombre",
            price: 899,
            image: "./img/Ameerat_Al_Arab_Asdaaf.png",
            description: "Fragancia intensa con notas especiadas y amaderadas.",
            tones: ["Albahacar", "Cardamomo", "Menta"],
            topNotes: ["Jazmin", "Lavanda"],
            duration: "Duradera"
        },
        "Qaed Al Fursan Lattafa": {
            name: "Qaed Al Fursan Lattafa",
            category: "Hombre",
            price: 1029,
            image: "./img/Qaed_Al_Fursan_Lattafa.png",
            description: "Lujosa fragancia con notas de oud y especias orientales.",
            tones: ["Afrutados", "Dulce", "Tropical"],
            topNotes: ["Piña", "Azafran"],
            duration: "Duradera"
        },
        "Al Noble Wazeer Lattafa": {
            name: "Al Noble Wazeer Lattafa",
            category: "Hombre",
            price: 1149,
            image: "./img/Al_Noble_Wazeer_Lattafa.png",
            description: "Fragancia especiada con notas de pimienta y lavanda.",
            tones: ["Dulce", "Amaderado", "Aromático"],
            topNotes: ["Menta", "Naranja"],
            duration: "Duradera"
        },
        "Hayaati Gold Elixir Lattafa": {
            name: "Hayaati Gold Elixir Lattafa",
            category: "Hombre",
            price: 839,
            image: "./img/Hayaati_Gold_Elixir_Lattafa.png",
            description: "Fragancia de cuero y frutas con frescura cítrica.",
            tones: ["Cuero", "Cítrico", "Avainillado"],
            topNotes: ["Bergamota", "Toronja"],
            duration: "Duradera"
        },
        "Asad Zanzibar Lattafa": {
            name: "Asad Zanzibar Lattafa",
            category: "Hombre",
            price: 1139,
            image: "./img/Asad_Zanzibar_Lattafa.png",
            description: "Fragancia premium con oud de alta calidad.",
            tones: ["Avainillado", "Iris", "Atalcado"],
            topNotes: ["Lavanda", "Pimienta Negra"],
            duration: "Duradeara"
        },
        "Maahir Lattafa": {
            name: "Maahir Lattafa",
            category: "Hombre",
            price: 1119,
            image: "./img/Maahir_Lattafa.png",
            description: "Fragancia amaderada y especiada con bergamota.",
            tones: ["Atalcado", "Amaderado", "Avainillado"],
            topNotes: ["Durazno", "Bergamota"],
            duration: "Duradera"
        },
        "Stallion 53 Emper": {
            name: "Stallion 53",
            category: "Hombre",
            price: 1119,
            image: "./img/Stallion 53 Emper.png",
            description: "Fragancia fresca y frutal con notas de piña.",
            tones: ["Amaderado", "Atalcado", "Cuero"],
            topNotes: ["Sándalo", "Cuero"],
            duration: "Duradera"
        },
        "Lattafa Yara": {
            name: "Lattafa Yara",
            category: "Mujer",
            price: 1650,
            image: "./img/lattafa-yara.jpg",
            description: "Fragancia floral y frutal con notas de frutos rojos.",
            tones: ["Frutas rojas", "Fresia", "Vainilla"],
            topNotes: ["Frutas rojas", "Fresia"],
            duration: "20 horas"
        },
        "Swiss Arabian Shaghaf Oud": {
            name: "Swiss Arabian Shaghaf Oud",
            category: "Unisex",
            price: 2100,
            image: "./img/swiss-arabian-shaghaf.jpg",
            description: "Fragancia oriental con notas de oud y rosas.",
            tones: ["Oud", "Rosas", "Azafrán"],
            topNotes: ["Oud", "Rosas"],
            duration: "24+ horas"
        }
    };

    // Renderizar perfumes
    function renderPerfumes(category = 'all', searchTerm = '') {
        perfumesGrid.innerHTML = '';
        
        Object.values(perfumesInventory).forEach(perfume => {
            if(category !== 'all' && perfume.category !== getCategoryName(category)) return;
            if(searchTerm && !perfume.name.toLowerCase().includes(searchTerm.toLowerCase())) return;
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card animate-slide-up';
            productCard.dataset.name = perfume.name;
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${perfume.image}" alt="${perfume.name}">
                    <div class="product-actions">
                        <div class="action-btn"><i class="fas fa-heart"></i></div>
                        <div class="action-btn add-to-cart"><i class="fas fa-shopping-bag"></i></div>
                        <div class="action-btn view-detail-btn"><i class="fas fa-search"></i></div>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${perfume.category}</span>
                    <h3>${perfume.name}</h3>
                    <div class="product-price">$<span class="current-price">${perfume.price.toLocaleString('es-MX')}</span> MXN</div>
                    <a href="#" class="btn view-detail">Ver Detalles</a>
                </div>
            `;
            
            perfumesGrid.appendChild(productCard);
        });
    }

    // Renderizar decants
    function renderDecant() {
        decantGrid.innerHTML = '';
        
        Object.values(perfumesInventory).forEach(perfume => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card animate-slide-up';
            productCard.dataset.name = perfume.name;
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${perfume.image}" alt="${perfume.name}">
                    <div class="product-actions">
                        <div class="action-btn"><i class="fas fa-heart"></i></div>
                        <div class="action-btn add-to-cart"><i class="fas fa-shopping-bag"></i></div>
                        <div class="action-btn view-detail-btn"><i class="fas fa-search"></i></div>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${perfume.category} - 30ml</span>
                    <h3>${perfume.name}</h3>
                    <div class="product-price">$<span class="current-price">350</span> MXN</div>
                    <a href="#" class="btn view-detail">Ver Detalles</a>
                </div>
            `;
            
            decantGrid.appendChild(productCard);
        });
    }

    // Renderizar promociones
    function renderPromotions() {
        const promotionPerfumes = ["Fakhar Lattafa", "Lattafa Yara", "Swiss Arabian Shaghaf Oud"];
        promotionsGrid.innerHTML = '';
        
        promotionPerfumes.forEach(name => {
            const perfume = perfumesInventory[name];
            if(!perfume) return;
            
            const discount = name === "Fakhar Lattafa" ? 0.25 : name === "Lattafa Yara" ? 0.20 : 0.15;
            const discountedPrice = perfume.price * (1 - discount);
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card animate-slide-up';
            productCard.dataset.name = perfume.name;
            
            productCard.innerHTML = `
                <div class="product-badge">${Math.round(discount * 100)}% OFF</div>
                <div class="product-image">
                    <img src="${perfume.image}" alt="${perfume.name}">
                    <div class="product-actions">
                        <div class="action-btn"><i class="fas fa-heart"></i></div>
                        <div class="action-btn add-to-cart"><i class="fas fa-shopping-bag"></i></div>
                        <div class="action-btn view-detail-btn"><i class="fas fa-search"></i></div>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${perfume.category}</span>
                    <h3>${perfume.name}</h3>
                    <div class="product-price">
                        <span class="original-price">$${perfume.price.toLocaleString('es-MX')}</span>
                        <span class="discount-price">$${discountedPrice.toLocaleString('es-MX')}</span> MXN
                    </div>
                    <a href="#" class="btn view-detail">Ver Detalles</a>
                </div>
            `;
            
            promotionsGrid.appendChild(productCard);
        });
    }

    // Mostrar detalle del producto
    function showProductDetail(productName) {
        const perfume = perfumesInventory[productName];
        if(!perfume) return;
        
        const isDecantPage = document.querySelector('.nav-link[data-target="decant"].nav-active');
        const price = isDecantPage ? 350 : perfume.price;
        
        detailContainer.innerHTML = `
            <div class="detail-image-container">
                <img src="${perfume.image}" alt="${perfume.name}" class="detail-image">
            </div>
            <div class="detail-info">
                <span class="detail-category">${perfume.category}${isDecantPage ? ' - 30ml' : ''}</span>
                <h1>${perfume.name}</h1>
                <div class="detail-price">$${price.toLocaleString('es-MX')} MXN</div>
                <p class="detail-description">${perfume.description}</p>
                
                <div class="detail-features">
                    <div class="feature-card">
                        <h4>Notas Olfativas</h4>
                        <ul class="feature-list">
                            ${perfume.tones.map(tone => `<li>${tone}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="feature-card">
                        <h4>Notas de Salida</h4>
                        <ul class="feature-list">
                            ${perfume.topNotes.map(note => `<li>${note}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="feature-card">
                        <h4>Duración</h4>
                        <ul class="feature-list">
                            <li>${perfume.duration}</li>
                        </ul>
                    </div>
                </div>
                
                <button class="btn add-to-cart-detail">Añadir al Carrito</button>
            </div>
        `;
        
        document.querySelector('.add-to-cart-detail').addEventListener('click', () => {
            addToCart({
                ...perfume,
                price: isDecantPage ? 350 : perfume.price
            });
        });
        
        navigateTo('product-detail');
    }

    // Añadir al carrito
    function addToCart(product) {
        const existingItem = cart.find(item => item.name === product.name);
        
        if(existingItem) {
            existingItem.quantity++;
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

    // Actualizar carrito
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        
        if(cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
            cartSubtotal.textContent = '$0.00 MXN';
            cartTotal.textContent = '$0.00 MXN';
            cartCount.textContent = '0';
            shippingFee.textContent = 'Gratis';
            return;
        }
        
        let subtotal = 0;
        
        cart.forEach((item, index) => {
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
                    <div class="cart-item-price">$${item.price.toLocaleString('es-MX')} MXN</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                        <button class="remove-item" data-index="${index}"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        const shippingCost = subtotal >= 1000 ? 0 : 150;
        const total = subtotal + shippingCost;
        
        cartSubtotal.textContent = `$${subtotal.toLocaleString('es-MX')} MXN`;
        shippingFee.textContent = shippingCost === 0 ? 'Gratis' : `$${shippingCost} MXN`;
        cartTotal.textContent = `$${total.toLocaleString('es-MX')} MXN`;
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Eventos de cantidad
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                if(cart[index].quantity > 1) {
                    cart[index].quantity--;
                    updateCart();
                }
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                cart[index].quantity++;
                updateCart();
            });
        });
        
        // Eventos de eliminación
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Helper functions
    function getCategoryName(category) {
        const categories = {
            'man': 'Hombre',
            'woman': 'Mujer',
            'unisex': 'Unisex'
        };
        return categories[category] || '';
    }

    // Delegación de eventos para elementos dinámicos
    document.addEventListener('click', function(e) {
        // Ver Detalle
        if(e.target.classList.contains('view-detail') || 
           e.target.closest('.view-detail-btn')) {
            e.preventDefault();
            const productCard = e.target.closest('.product-card');
            if(productCard) showProductDetail(productCard.dataset.name);
        }
        
        // Añadir al carrito
        if(e.target.classList.contains('add-to-cart') || 
           e.target.closest('.add-to-cart')) {
            const productCard = e.target.closest('.product-card');
            if(productCard) {
                const perfume = perfumesInventory[productCard.dataset.name];
                const isDecantPage = document.querySelector('.nav-link[data-target="decant"].nav-active');
                
                if(perfume) {
                    addToCart({
                        ...perfume,
                        price: isDecantPage ? 350 : perfume.price
                    });
                }
            }
        }
    });

    // Botón Volver
    if(backToProducts) {
        backToProducts.addEventListener('click', () => {
            navigateTo('perfumes');
        });
    }

    // Filtros y búsqueda
    if(filterBar) {
        filterBar.addEventListener('click', (e) => {
            if(e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.toggle('active', btn === e.target);
                });
                renderPerfumes(e.target.dataset.category);
            }
        });
    }

    if(searchInput) {
        searchInput.addEventListener('input', () => {
            const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
            renderPerfumes(activeCategory, searchInput.value);
        });
    }

    // Checkout
    document.querySelector('.checkout-btn')?.addEventListener('click', () => {
        if(cart.length === 0) return;
        
        const phoneNumber = "526621383780";
        let message = "Carrito de Compra:\n\n";
        
        cart.forEach(item => {
            message += `• ${item.name} (${item.quantity} unidad${item.quantity > 1 ? 'es' : ''}) - $${(item.price * item.quantity).toLocaleString('es-MX')} MXN\n`;
        });
        
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shippingCost = subtotal >= 1000 ? 0 : 150;
        const total = subtotal + shippingCost;
        
        message += `\nSubtotal: $${subtotal.toLocaleString('es-MX')} MXN`;
        message += `\nEnv\u00edo: ${shippingCost === 0 ? 'Gratis' : '$' + shippingCost + ' MXN'}`;
        message += `\nTotal: $${total.toLocaleString('es-MX')} MXN`;
        
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        cart = [];
        updateCart();
        cartModal.classList.remove('active');
    });

    // Inicialización
    function init() {
        renderPerfumes();
        renderDecant();
        renderPromotions();
        updateCart();
        
        // Políticas de WhatsApp
        policyLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const policy = link.dataset.policy;
                const messages = {
                    'garantia': 'Garantía de Calidad',
                    'durabilidad': 'Durabilidad del Olor',
                    'certificacion': 'Certificación',
                    'envio': 'Envío Seguro'
                };
                
                if(messages[policy]) {
                    const message = `Hola! Quisiera saber más acerca de su política de ${messages[policy]}`;
                    window.open(`https://wa.me/526621383780?text=${encodeURIComponent(message)}`, '_blank');
                }
            });
        });
    }

    init();
});