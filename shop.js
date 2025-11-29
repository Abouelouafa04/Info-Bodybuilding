// بيانات المنتجات
const products = [
    { 
        id: 1,
        img: 'photos/01.jpeg', 
        title: 'Whey Protein 1kg', 
        price: '350.00 Dhs', 
        oldPrice: '400.00 Dhs',
        newPrice: '350.00 Dhs',
        discount: '-12%',
        stars: '★★★★★ (24)',
        description: 'Whey Protein عالي الجودة لبناء العضلات والتعافي السريع بعد التمرين. Contient 24g de protéines par portion pour une récupération optimale.',
        category: 'protein',
        featured: true
    },
    { 
        id: 2,
        img: 'photos/02.jpeg', 
        title: 'Creatine Monohydrate', 
        price: '200.00 Dhs', 
        stars: '★★★★☆ (18)',
        description: 'كرياتين مونوهيدرات نقي لزيادة القوة والكتلة العضلية. Améliore les performances et la force musculaire.',
        category: 'creatine',
        featured: true
    },
    { 
        id: 3,
        img: 'photos/03.jpeg', 
        title: 'Pre-Workout Energizer', 
        oldPrice: '300.00 Dhs', 
        newPrice: '250.00 Dhs', 
        discount: '-17%',
        description: 'مكمل قبل التمرين لزيادة الطاقة والتركيز أثناء التدريب. Formule avancée pour des entraînements intenses.',
        category: 'pre-workout',
        featured: false
    },
    { 
        id: 4,
        img: 'photos/04.jpeg', 
        title: 'BCAA Amino Acids', 
        price: '280.00 Dhs',
        description: 'أحماض أمينية متفرعة السلسلة للتعافي ومنع هدم العضلات. Ratio 2:1:1 optimal pour la récupération.',
        category: 'amino',
        featured: true
    },
    { 
        id: 5,
        img: 'photos/05.jpeg', 
        title: 'Mass Gainer 3kg', 
        oldPrice: '450.00 Dhs', 
        newPrice: '380.00 Dhs', 
        discount: '-16%',
        description: 'مكمل لزيادة الوزن والعضلات للسعرات الحرارية العالية. Idéal pour la prise de masse musculaire.',
        category: 'mass-gainer',
        featured: false
    },
    { 
        id: 6,
        img: 'photos/06.jpeg', 
        title: 'Vitamin D3 + K2', 
        price: '150.00 Dhs',
        description: 'مكمل فيتامين د3 وك2 لصحة العظام والمناعة. Soutient la santé osseuse et immunitaire.',
        category: 'vitamins',
        featured: true
    },
    { 
        id: 7,
        img: 'photos/07.jpeg', 
        title: 'Glutamine Powder', 
        oldPrice: '220.00 Dhs', 
        newPrice: '180.00 Dhs', 
        discount: '-18%',
        description: 'جلوتامين لتعافي العضلات وصحة الجهاز الهضمي. Essentiel pour la récupération musculaire.',
        category: 'amino',
        featured: false
    },
    { 
        id: 8,
        img: 'photos/08.jpeg', 
        title: 'Fat Burner', 
        price: '320.00 Dhs',
        description: 'مكمل حارق للدهون لتعزيز التمثيل الغذائي. Aide à la perte de poids et au métabolisme.',
        category: 'fat-burner',
        featured: true
    },
    { 
        id: 9,
        img: 'photos/09.jpeg', 
        title: 'ZMA Supplement', 
        price: '190.00 Dhs',
        description: 'مكمل زنك وماغنسيوم لتحسين النوم والتعافي. Améliore la qualité du sommeil et la récupération.',
        category: 'minerals',
        featured: false
    },
    { 
        id: 10,
        img: 'photos/10.jpeg', 
        title: 'Casein Protein', 
        oldPrice: '420.00 Dhs', 
        newPrice: '360.00 Dhs', 
        discount: '-14%',
        description: 'بروتين كازين بطيء الامتصاص مثالي قبل النوم. Protéine à libération lente pour la nuit.',
        category: 'protein',
        featured: true
    },
    { 
        id: 11,
        img: 'photos/11.jpeg', 
        title: 'Testosterone Booster', 
        price: '290.00 Dhs',
        description: 'معزز طبيعي للتستوستيرون لزيادة الأداء. Soutient la production naturelle de testostérone.',
        category: 'hormonal',
        featured: false
    },
    { 
        id: 12,
        img: 'photos/12.jpeg', 
        title: 'Omega-3 Fish Oil', 
        price: '120.00 Dhs',
        description: 'زيت السمك أوميغا-3 لصحة القلب والمفاصل. Essentiel pour la santé cardiovasculaire.',
        category: 'omega',
        featured: true
    }
];

// متغيرات عامة
let currentPage = 1;
const productsPerPage = 8;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let filteredProducts = [...products];

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    initializeShop();
    setupEventListeners();
    updateCartCounter();
});

// تهيئة المتجر
function initializeShop() {
    displayProducts();
    setupPagination();
    setupAutoSlider();
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // البحث
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }

    // إغلاق المودال بالنقر خارج المحتوى
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // إغلاق المودال بمفتاح ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // تأثير التمرير للهيدر
    window.addEventListener('scroll', handleHeaderScroll);
}

// عرض المنتجات
function displayProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    productGrid.innerHTML = '';

    if (productsToShow.length === 0) {
        productGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background-color: #fff; border-radius: 12px;">
                <i class="bi bi-search" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                <h3 style="color: #666; margin-bottom: 10px;">Aucun produit trouvé</h3>
                <p style="color: #999;">Essayez de modifier vos critères de recherche</p>
            </div>
        `;
        return;
    }

    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// إنشاء بطاقة المنتج
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Voir les détails de ${product.title}`);

    // جعل البطاقة قابلة للوصول باللوحة المفاتيح
    card.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProductModal(product.id);
        }
    });

    // Attach click listener to the card itself, but not on the button
    card.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart-btn')) return;
        openProductModal(product.id);
    });

    let priceHtml = '';
    if (product.oldPrice) {
        priceHtml = `
            <div class="price">
                <span class="old">${product.oldPrice}</span>
                <span class="new">${product.newPrice}</span>
                <span class="discount">${product.discount}</span>
            </div>
        `;
    } else {
        priceHtml = `<div class="price">${product.price}</div>`;
    }

    const starsHtml = product.stars ? `<div class="stars">${product.stars}</div>` : '';

    card.innerHTML = `
        <img src="${product.img}" alt="${product.title}" loading="lazy">
        ${product.discount ? `<span class="badge">Promo</span>` : ''}
        ${product.featured ? `<span class="badge" style="background-color: var(--primary-color);">Populaire</span>` : ''}
        <h3>${product.title}</h3>
        ${priceHtml}
        ${starsHtml}
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})" 
                aria-label="Ajouter ${product.title} au panier">
            <i class="bi bi-cart-plus"></i> Ajouter au panier
        </button>
    `;

    return card;
}

// إعداد التقسيم للصفحات
function setupPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHtml = '';

    // زر السابق
    if (currentPage > 1) {
        paginationHtml += `<button onclick="changePage(${currentPage - 1})" aria-label="Page précédente">
            <i class="bi bi-chevron-left"></i>
        </button>`;
    }

    // أرقام الصفحات
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHtml += `<button class="active" aria-label="Page ${i}, page actuelle" aria-current="page">${i}</button>`;
        } else {
            paginationHtml += `<button onclick="changePage(${i})" aria-label="Aller à la page ${i}">${i}</button>`;
        }
    }

    // زر التالي
    if (currentPage < totalPages) {
        paginationHtml += `<button onclick="changePage(${currentPage + 1})" aria-label="Page suivante">
            <i class="bi bi-chevron-right"></i>
        </button>`;
    }

    pagination.innerHTML = paginationHtml;
}

// تغيير الصفحة
function changePage(page) {
    currentPage = page;
    displayProducts();
    setupPagination();
    scrollToTop();
}

// التمرير للأعلى
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// فتح مودال المنتج
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modal-content');

    if (!modal || !modalContent) return;

    let priceHtml = '';
    if (product.oldPrice) {
        priceHtml = `
            <div class="product-modal-price">
                <span class="old" style="font-size: 1.2rem;">${product.oldPrice}</span>
                <span class="new" style="font-size: 1.8rem;">${product.newPrice}</span>
                <span class="discount" style="font-size: 1rem;">${product.discount}</span>
            </div>
        `;
    } else {
        priceHtml = `<div class="product-modal-price" style="font-size: 1.8rem;">${product.price}</div>`;
    }

    modalContent.innerHTML = `
        <div class="product-modal-image">
            <img src="${product.img}" alt="${product.title}">
        </div>
        <div class="product-modal-details">
            <h2 class="product-modal-title" id="modal-title">${product.title}</h2>
            ${priceHtml}
            <div class="product-modal-description">
                <p>${product.description}</p>
            </div>
            <div class="quantity-selector">
                <label for="quantity">Quantité:</label>
                <button class="quantity-btn" onclick="decreaseQuantity()" aria-label="Diminuer la quantité">-</button>
                <input type="number" id="quantity" class="quantity-input" value="1" min="1" max="10" 
                       aria-label="Quantité du produit">
                <button class="quantity-btn" onclick="increaseQuantity()" aria-label="Augmenter la quantité">+</button>
            </div>
            <button class="add-to-cart-btn" onclick="addToCartFromModal(${product.id})" 
                    aria-label="Ajouter au panier">
                <i class="bi bi-cart-plus"></i> Ajouter au Panier
            </button>
        </div>
    `;

    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // إضافة مستمعي الأحداث للأزرار
    document.getElementById('quantity').addEventListener('change', validateQuantity);
}

// إغلاق المودال
function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
}

// إدارة الكمية في المودال
function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput && parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput && parseInt(quantityInput.value) < 10) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    }
}

function validateQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        let value = parseInt(quantityInput.value);
        if (isNaN(value) || value < 1) quantityInput.value = 1;
        if (value > 10) quantityInput.value = 10;
    }
}

// إضافة إلى السلة من المودال
function addToCartFromModal(productId) {
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    addToCart(productId, quantity);
    closeModal();
}

// إضافة إلى السلة
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.newPrice || product.price,
            img: product.img,
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    showToast(`${product.title} ajouté au panier!`, 'success');
}

// تحديث عداد السلة
function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            cartCounter.textContent = totalItems > 99 ? '99+' : totalItems;
            cartCounter.style.display = 'flex';
        } else {
            cartCounter.style.display = 'none';
        }
    }
}

// عرض الإشعارات
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = 'toast show';
    
    if (type === 'success') {
        toast.style.background = 'var(--success-color)';
    } else if (type === 'error') {
        toast.style.background = 'var(--danger-color)';
    }

    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// البحث عن المنتجات
function handleSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    if (searchTerm === '') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    displayProducts();
    setupPagination();
}

// تبديل مربع البحث
function toggleSearchBox() {
    const searchBox = document.getElementById('search-box');
    if (searchBox) {
        searchBox.classList.toggle('visible');
        if (searchBox.classList.contains('visible')) {
            const searchInput = searchBox.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
    }
}

// إدارة تمرير الهيدر
function handleHeaderScroll() {
    const header = document.getElementById('main-header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
}

// السلايدر التلقائي
function setupAutoSlider() {
    let currentSlide = 1;
    const totalSlides = 3;
    
    setInterval(() => {
        currentSlide = currentSlide % totalSlides + 1;
        document.getElementById(`slide${currentSlide}`).checked = true;
    }, 5000);
}

// تصفية المنتجات حسب الفئة
function filterProducts(category) {
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => 
            product.category === category
        );
    }
    
    currentPage = 1;
    displayProducts();
    setupPagination();
}

// Helper function to manage active state for filter buttons
function setActive(clickedButton) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => button.classList.remove('active'));
    clickedButton.classList.add('active');
}

window.changePage = changePage;
window.openProductModal = openProductModal;
window.closeModal = closeModal;
window.decreaseQuantity = decreaseQuantity;
window.increaseQuantity = increaseQuantity;
window.validateQuantity = validateQuantity;
window.addToCart = addToCart;
window.addToCartFromModal = addToCartFromModal;
window.toggleSearchBox = toggleSearchBox;
window.filterProducts = filterProducts;
window.setActive = setActive;