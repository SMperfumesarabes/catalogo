document.addEventListener('DOMContentLoaded', function() {
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
    
    let cart = [];

    function navigateTo(screenId) {
        searchInput.value = '';
        
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if(link.getAttribute('data-target') === screenId) {
                link.classList.add('nav-active');
            }
        });

        screens.forEach(screen => {
            screen.classList.remove('active');
            if(screen.id === screenId) {
                screen.classList.add('active');
                window.scrollTo(0, 0);
            }
        });

        nav.classList.remove('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            navigateTo(target);
        });
    });

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('home');
    });

    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('perfumes');
        });
    }

    if (viewCollectionBtn) {
        viewCollectionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('promotions');
            setTimeout(() => {
                const promotionsSection = document.getElementById('promotions-grid');
                promotionsSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });
    }

    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    if (backToProducts) {
        backToProducts.addEventListener('click', () => {
            navigateTo('perfumes');
        });
    }

    const perfumesInventory = {
        "Lattafa Raghba for Men": {
            name: "Lattafa Raghba for Men",
            category: "Hombre",
            price: 1850,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia oriental amaderada con notas de oud, vainilla y azúcar quemada. Perfecta para eventos nocturnos y ocasiones especiales.",
            tones: ["Oud", "Vainilla", "Azúcar quemada", "Ámbar", "Maderas"],
            topNotes: ["Azafrán", "Pimienta"],
            duration: "24 horas"
        },
        "Lattafa Fakhar Black": {
            name: "Lattafa Fakhar Black",
            category: "Hombre",
            price: 1650,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Elegante fragancia con un toque fresco de bergamota combinada con notas cálidas de ámbar y madera de cedro.",
            tones: ["Bergamota", "Ámbar", "Cedro", "Musk", "Vetiver"],
            topNotes: ["Bergamota", "Lavanda"],
            duration: "18 horas"
        },
        "Rasasi Hawas for Him": {
            name: "Rasasi Hawas for Him",
            category: "Hombre",
            price: 2100,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia acuática con notas frescas de manzana y cardamomo, perfecta para el uso diario.",
            tones: ["Manzana", "Cardamomo", "Ámbar", "Maderas", "Musk"],
            topNotes: ["Manzana", "Cardamomo"],
            duration: "20 horas"
        },
        "Ajmal Kuro": {
            name: "Ajmal Kuro",
            category: "Hombre",
            price: 1950,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia intensa con notas especiadas y amaderadas, ideal para hombres que buscan una presencia impactante.",
            tones: ["Pimienta", "Lavanda", "Vetiver", "Ámbar", "Cuero"],
            topNotes: ["Pimienta negra", "Lavanda"],
            duration: "22 horas"
        },
        "Ard Al Zaafaran Dirham Oud": {
            name: "Ard Al Zaafaran Dirham Oud",
            category: "Hombre",
            price: 2200,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Lujosa fragancia con notas de oud y especias orientales, para el hombre sofisticado.",
            tones: ["Oud", "Azafrán", "Rosa", "Ámbar", "Maderas"],
            topNotes: ["Azafrán", "Pimienta"],
            duration: "24+ horas"
        },
        "Lattafa Asad": {
            name: "Lattafa Asad",
            category: "Hombre",
            price: 1750,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia especiada con notas de pimienta y lavanda, con un fondo amaderado y ámbrado.",
            tones: ["Pimienta", "Lavanda", "Vainilla", "Ámbar", "Maderas"],
            topNotes: ["Pimienta", "Lavanda"],
            duration: "20 horas"
        },
        "Rasasi La Yuqawam Pour Homme": {
            name: "Rasasi La Yuqawam Pour Homme",
            category: "Hombre",
            price: 2400,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia de cuero y frutas con un toque de frescura cítrica y profundidad amaderada.",
            tones: ["Frambuesa", "Pera", "Azafrán", "Cuero", "Vetiver"],
            topNotes: ["Frambuesa", "Peras"],
            duration: "24 horas"
        },
        "Ajmal Dahn Al Oudh Al Shams": {
            name: "Ajmal Dahn Al Oudh Al Shams",
            category: "Hombre",
            price: 2600,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia premium con oud de alta calidad y notas florales, para ocasiones especiales.",
            tones: ["Oud", "Rosa", "Azafrán", "Ámbar", "Maderas"],
            topNotes: ["Azafrán", "Rosa"],
            duration: "24+ horas"
        },
        "Afnan Supremacy Silver": {
            name: "Afnan Supremacy Silver",
            category: "Hombre",
            price: 2300,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia amaderada y especiada con un toque fresco de bergamota y notas cálidas de ámbar.",
            tones: ["Bergamota", "Pimienta", "Vetiver", "Ámbar", "Maderas"],
            topNotes: ["Bergamota", "Pimienta"],
            duration: "22 horas"
        },
        "Lattafa Qaed Al Fursan": {
            name: "Lattafa Qaed Al Fursan",
            category: "Hombre",
            price: 1800,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia fresca y frutal con notas de piña y manzana, ideal para el día a día.",
            tones: ["Piña", "Manzana", "Musk", "Ámbar", "Maderas"],
            topNotes: ["Piña", "Manzana"],
            duration: "18 horas"
        },
        "Lattafa Yara": {
            name: "Lattafa Yara",
            category: "Mujer",
            price: 1650,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia floral y frutal con notas de frutos rojos y flores blancas, femenina y elegante.",
            tones: ["Frutas rojas", "Fresia", "Vainilla", "Almizcle", "Sándalo"],
            topNotes: ["Frutas rojas", "Fresia"],
            duration: "20 horas"
        },
        "Lattafa Raghba for Women": {
            name: "Lattafa Raghba for Women",
            category: "Mujer",
            price: 1750,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia oriental cálida con notas de vainilla y oud, perfecta para noches especiales.",
            tones: ["Vainilla", "Oud", "Ámbar", "Almizcle", "Sándalo"],
            topNotes: ["Vainilla", "Oud"],
            duration: "24 horas"
        },
        "Rasasi Hawas for Her": {
            name: "Rasasi Hawas for Her",
            category: "Mujer",
            price: 1900,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia floral acuática con notas de peonía y lirio de los valles, fresca y femenina.",
            tones: ["Peonía", "Lirio", "Almizcle", "Ámbar", "Maderas"],
            topNotes: ["Peonía", "Lirio"],
            duration: "18 horas"
        },
        "Ajmal Wisal Dhahab": {
            name: "Ajmal Wisal Dhahab",
            category: "Mujer",
            price: 2200,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia floral intensa con notas de rosa y jazmín, con un toque dorado de azafrán.",
            tones: ["Rosa", "Jazmín", "Azafrán", "Ámbar", "Maderas"],
            topNotes: ["Rosa", "Jazmín"],
            duration: "22 horas"
        },
        "Lattafa Fakhar Rose": {
            name: "Lattafa Fakhar Rose",
            category: "Mujer",
            price: 1700,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia floral con notas de rosa y frutas, elegante y sofisticada.",
            tones: ["Rosa", "Frambuesa", "Vainilla", "Ámbar", "Musk"],
            topNotes: ["Rosa", "Frambuesa"],
            duration: "20 horas"
        },
        "Ard Al Zaafaran Dirham Wardi": {
            name: "Ard Al Zaafaran Dirham Wardi",
            category: "Mujer",
            price: 2000,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia floral oriental con notas de rosa y oud, con un toque de dulzura.",
            tones: ["Rosa", "Oud", "Vainilla", "Ámbar", "Maderas"],
            topNotes: ["Rosa", "Oud"],
            duration: "24 horas"
        },
        "Ajmal Sacrifice for Her": {
            name: "Ajmal Sacrifice for Her",
            category: "Mujer",
            price: 2300,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia floral intensa con notas de jazmín y gardenia, con un fondo amaderado.",
            tones: ["Jazmín", "Gardenia", "Vainilla", "Sándalo", "Ámbar"],
            topNotes: ["Jazmín", "Gardenia"],
            duration: "22 horas"
        },
        "Rasasi Rumz Al Rasasi 9453 Femme": {
            name: "Rasasi Rumz Al Rasasi 9453 Femme",
            category: "Mujer",
            price: 2100,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia floral frutal con notas de pera y peonía, fresca y moderna.",
            tones: ["Pera", "Peonía", "Almizcle", "Vainilla", "Maderas"],
            topNotes: ["Pera", "Peonía"],
            duration: "18 horas"
        },
        "Lattafa Emaan": {
            name: "Lattafa Emaan",
            category: "Mujer",
            price: 1800,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia floral con notas de jazmín y lirio, delicada y femenina.",
            tones: ["Jazmín", "Lirio", "Vainilla", "Ámbar", "Musk"],
            topNotes: ["Jazmín", "Lirio"],
            duration: "20 horas"
        },
        "Khaltat Al Arabia Royal Blends": {
            name: "Khaltat Al Arabia Royal Blends",
            category: "Mujer",
            price: 2500,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia floral intensa con notas de rosa y azafrán, con un toque de dulzura.",
            tones: ["Rosa", "Azafrán", "Vainilla", "Ámbar", "Musk"],
            topNotes: ["Rosa", "Azafrán"],
            duration: "24+ horas"
        },
        "Swiss Arabian Shaghaf Oud": {
            name: "Swiss Arabian Shaghaf Oud",
            category: "Unisex",
            price: 2100,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia oriental con notas de oud y rosas, intensa y sofisticada.",
            tones: ["Oud", "Rosas", "Azafrán", "Ámbar", "Maderas"],
            topNotes: ["Oud", "Rosas"],
            duration: "24+ horas"
        },
        "Ajmal Amber Wood": {
            name: "Ajmal Amber Wood",
            category: "Unisex",
            price: 1950,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia amaderada con notas de ámbar y pachulí, cálida y envolvente.",
            tones: ["Ámbar", "Pachulí", "Vetiver", "Musk", "Sándalo"],
            topNotes: ["Ámbar", "Pachulí"],
            duration: "22 horas"
        },
        "Lattafa Oud Mood": {
            name: "Lattafa Oud Mood",
            category: "Unisex",
            price: 1800,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia de oud con notas especiadas y florales, misteriosa y atractiva.",
            tones: ["Oud", "Azafrán", "Rosa", "Vainilla", "Maderas"],
            topNotes: ["Oud", "Azafrán"],
            duration: "24 horas"
        },
        "Rasasi La Yuqawam Ambergris Showers": {
            name: "Rasasi La Yuqawam Ambergris Showers",
            category: "Unisex",
            price: 2300,
            image: "https://via.placeholder.com/300x400?text=Perfume+Arab",
            description: "Fragancia acuática con notas de ámbar gris y maderas, fresca y duradera.",
            tones: ["Ámbar gris", "Maderas", "Musk", "Vetiver", "Algas"],
            topNotes: ["Ámbar gris", "Maderas"],
            duration: "20 horas"
        }
    };

    function renderPerfumes(category = 'all', searchTerm = '') {
        perfumesGrid.innerHTML = '';
        
        Object.values(perfumesInventory).forEach(perfume => {
            if (category !== 'all' && perfume.category !== getCategoryName(category)) return;
            
            if (searchTerm && !perfume.name.toLowerCase().includes(searchTerm.toLowerCase())) return;
            
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

    function renderPromotions() {
        const promotionPerfumes = [
            "Lattafa Asad",
            "Ard Al Zaafaran Dirham Wardi",
            "Swiss Arabian Shaghaf Oud"
        ];
        
        promotionsGrid.innerHTML = '';
        
        promotionPerfumes.forEach(name => {
            const perfume = perfumesInventory[name];
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card animate-slide-up';
            productCard.dataset.name = perfume.name;
            
            productCard.innerHTML = `
                <div class="product-badge">${name === "Lattafa Asad" ? "25% OFF" : name === "Ard Al Zaafaran Dirham Wardi" ? "20% OFF" : "15% OFF"}</div>
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
                        ${name === "Lattafa Asad" ? `<span class="original-price">$1,750</span>` : ''}
                        ${name === "Ard Al Zaafaran Dirham Wardi" ? `<span class="original-price">$2,000</span>` : ''}
                        ${name === "Swiss Arabian Shaghaf Oud" ? `<span class="original-price">$2,100</span>` : ''}
                        <span class="discount-price">$${(name === "Lattafa Asad" ? perfume.price * 0.75 : name === "Ard Al Zaafaran Dirham Wardi" ? perfume.price * 0.8 : perfume.price * 0.85).toLocaleString('es-MX')}</span> MXN
                    </div>
                    <a href="#" class="btn view-detail">Ver Detalles</a>
                </div>
            `;
            
            promotionsGrid.appendChild(productCard);
        });
    }

    function showProductDetail(productName) {
        const perfume = perfumesInventory[productName];
        const isDecantPage = document.querySelector('.nav-link[data-target="decant"].nav-active');
        
        detailContainer.innerHTML = `
            <div class="detail-image-container">
                <img src="${perfume.image}" alt="${perfume.name}" class="detail-image">
            </div>
            <div class="detail-info">
                <span class="detail-category">${perfume.category}${isDecantPage ? ' - 30ml' : ''}</span>
                <h1>${perfume.name}</h1>
                <div class="detail-price">$${isDecantPage ? '350' : perfume.price.toLocaleString('es-MX')} MXN</div>
                <p class="detail-description">${isDecantPage ? 'Versión decantada de 30ml con atomizador moderno. ' : ''}${perfume.description}</p>
                
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
                
                <button class="btn add-to-cart-detail" data-name="${perfume.name}">Añadir al Carrito</button>
            </div>
        `;
        
        const detailImage = document.querySelector('.detail-image');
        detailImage.addEventListener('click', () => {
            detailImage.classList.toggle('zoomed');
        });
        
        document.querySelector('.add-to-cart-detail').addEventListener('click', () => {
            addToCart({
                ...perfume,
                price: isDecantPage ? 350 : perfume.price
            });
        });
        
        navigateTo('product-detail');
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.name === product.name);
        
        if (existingItem) {
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

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
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
        
        // Calcular envío
        const shippingCost = subtotal >= 1000 ? 0 : 150;
        const total = subtotal + shippingCost;
        
        cartSubtotal.textContent = `$${subtotal.toLocaleString('es-MX')} MXN`;
        shippingFee.textContent = shippingCost === 0 ? 'Gratis' : `$${shippingCost} MXN`;
        cartTotal.textContent = `$${total.toLocaleString('es-MX')} MXN`;
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                if(cart[index].quantity > 1) {
                    cart[index].quantity--;
                    updateCart();
                }
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                cart[index].quantity++;
                updateCart();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    function getCategoryName(category) {
        switch(category) {
            case 'man': return 'Hombre';
            case 'woman': return 'Mujer';
            case 'unisex': return 'Unisex';
            default: return '';
        }
    }

    function handleProductAction(e) {
        const target = e.target;
        
        if (target.classList.contains('view-detail') || target.classList.contains('view-detail-btn')) {
            e.preventDefault();
            const productCard = target.closest('.product-card');
            const productName = productCard.dataset.name;
            showProductDetail(productName);
        }
        else if (target.classList.contains('add-to-cart') || target.classList.contains('add-to-cart-detail')) {
            const productCard = target.closest('.product-card');
            if (!productCard) return;
            
            const productName = productCard.dataset.name;
            const perfume = perfumesInventory[productName];
            const isDecantPage = document.querySelector('.nav-link[data-target="decant"].nav-active');
            
            addToCart({
                ...perfume,
                price: isDecantPage ? 350 : perfume.price
            });
        }
    }

    function init() {
        renderPerfumes();
        renderDecant();
        renderPromotions();
        
        // Event delegation for product actions
        document.addEventListener('click', handleProductAction);

        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const category = button.getAttribute('data-category');
                renderPerfumes(category);
            });
        });

        searchInput.addEventListener('input', () => {
            const category = document.querySelector('.filter-btn.active')?.getAttribute('data-category') || 'all';
            renderPerfumes(category, searchInput.value);
        });

        document.querySelector('.checkout-btn').addEventListener('click', () => {
            if(cart.length === 0) return;
            
            const phoneNumber = "526621383780";
            let message = "Carrito de Compra:\n\n";
            
            cart.forEach(item => {
                message += `• ${item.name} (${item.quantity} unidad${item.quantity > 1 ? 'es' : ''}) - ${(item.price * item.quantity).toLocaleString('es-MX')} MXN\n`;
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

        document.querySelector('.contact-form form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            e.target.reset();
        });

        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
            }
        });

        updateCart();
    }

    init();
});