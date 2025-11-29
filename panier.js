// إدارة سلة التسوق
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.init();
    }

    // تهيئة السلة
    init() {
        this.displayCart();
        this.updateCartCounter();
        this.setupEventListeners();
    }

    // تحميل السلة من localStorage
    loadCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    // حفظ السلة في localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    // تحديث عداد السلة
    updateCartCounter() {
        const cartCounter = document.getElementById('cart-counter');
        if (cartCounter) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            if (totalItems > 0) {
                cartCounter.textContent = totalItems > 99 ? '99+' : totalItems;
                cartCounter.style.display = 'flex';
            } else {
                cartCounter.style.display = 'none';
            }
        }
    }

    // عرض محتويات السلة
    displayCart() {
        const cartContent = document.getElementById('cart-content');
        if (!cartContent) return;

        if (this.cart.length === 0) {
            this.showEmptyCart();
            return;
        }

        this.showCartItems();
    }

    // عرض سلة فارغة
    showEmptyCart() {
        const cartContent = document.getElementById('cart-content');
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="bi bi-cart-x"></i>
                <h2>Votre panier est vide</h2>
                <p>Découvrez nos produits et commencez vos achats</p>
                <a href="shop.html" class="continue-shopping">
                    <i class="bi bi-arrow-left"></i> Continuer mes achats
                </a>
            </div>
        `;
    }

    // عرض عناصر السلة
    showCartItems() {
        const cartContent = document.getElementById('cart-content');
        const subtotal = this.calculateSubtotal();
        const shipping = subtotal > 599 ? 0 : 50;
        const total = subtotal + shipping;

        cartContent.innerHTML = `
            <div class="cart-content">
                <div class="cart-items">
                    <div class="cart-items-header">
                        <h3>Articles (${this.cart.length})</h3>
                    </div>
                    <div id="cart-items-list">
                        ${this.cart.map(item => this.createCartItemHTML(item)).join('')}
                    </div>
                </div>
                
                <div class="cart-summary">
                    <h3 class="summary-title">Résumé de la commande</h3>
                    <div class="summary-row">
                        <span>Sous-total:</span>
                        <span>${subtotal.toFixed(2)} Dhs</span>
                    </div>
                    <div class="summary-row">
                        <span>Livraison:</span>
                        <span>${shipping === 0 ? 'Gratuite' : shipping.toFixed(2) + ' Dhs'}</span>
                    </div>
                    ${shipping === 0 ? `
                    <div class="summary-row" style="color: var(--success-color); font-size: 0.9em;">
                        <span>Économisé sur la livraison!</span>
                    </div>
                    ` : `
                    <div class="summary-row" style="color: var(--gray-color); font-size: 0.9em;">
                        <span>Plus que ${(599 - subtotal).toFixed(2)} Dhs pour la livraison gratuite</span>
                    </div>
                    `}
                    <div class="summary-row summary-total">
                        <span>Total:</span>
                        <span>${total.toFixed(2)} Dhs</span>
                    </div>
                    <button class="checkout-btn" onclick="cartManager.checkout()" 
                            ${this.cart.length === 0 ? 'disabled' : ''}>
                        <i class="bi bi-lock-fill"></i> Procéder au paiement
                    </button>
                    <div style="text-align: center; margin-top: 15px;">
                        <img src="INFO-BODYBUILDING-PHOTOS/paiement-securise.png" 
                             alt="Paiement sécurisé" 
                             style="height: 30px; opacity: 0.7;">
                        <p style="font-size: 0.8em; color: var(--gray-color); margin-top: 5px;">
                            Paiement 100% sécurisé
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    // إنشاء HTML لعنصر السلة
    createCartItemHTML(item) {
        const price = this.parsePrice(item.price);
        const total = price * item.quantity;

        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-image">
                    <img src="${item.img}" alt="${item.title}" loading="lazy">
                </div>
                <div class="item-details">
                    <h3>${item.title}</h3>
                    <div class="item-price">${item.price}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="cartManager.decreaseQuantity(${item.id})" 
                            aria-label="Diminuer la quantité">
                        <i class="bi bi-dash"></i>
                    </button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10"
                           onchange="cartManager.updateQuantity(${item.id}, this.value)"
                           aria-label="Quantité de ${item.title}">
                    <button class="quantity-btn" onclick="cartManager.increaseQuantity(${item.id})"
                            aria-label="Augmenter la quantité">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
                <div class="item-total">
                    <strong>${total.toFixed(2)} Dhs</strong>
                </div>
                <button class="remove-btn" onclick="cartManager.removeItem(${item.id})"
                        aria-label="Supprimer ${item.title} du panier">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
    }

    // تحليل السعر من النص
    parsePrice(priceText) {
        const priceMatch = priceText.match(/(\d+[.,]\d+)/);
        if (priceMatch) {
            return parseFloat(priceMatch[1].replace(',', '.'));
        }
        return 0;
    }

    // حساب المجموع الجزئي
    calculateSubtotal() {
        return this.cart.reduce((total, item) => {
            const price = this.parsePrice(item.price);
            return total + (price * item.quantity);
        }, 0);
    }

    // زيادة كمية المنتج
    increaseQuantity(productId) {
        const item = this.cart.find(item => item.id === productId);
        if (item && item.quantity < 10) {
            item.quantity++;
            this.saveCart();
            this.displayCart();
            this.updateCartCounter();
            this.showToast('Quantité mise à jour', 'success');
        }
    }

    // تقليل كمية المنتج
    decreaseQuantity(productId) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (item.quantity > 1) {
                item.quantity--;
                this.saveCart();
                this.displayCart();
                this.updateCartCounter();
                this.showToast('Quantité mise à jour', 'success');
            } else {
                this.removeItem(productId);
            }
        }
    }

    // تحديث الكمية مباشرة
    updateQuantity(productId, newQuantity) {
        const quantity = parseInt(newQuantity);
        if (isNaN(quantity) || quantity < 1 || quantity > 10) return;

        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
            this.displayCart();
            this.updateCartCounter();
            this.showToast('Quantité mise à jour', 'success');
        }
    }

    // إزالة منتج من السلة
    removeItem(productId) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet article de votre panier ?')) {
            this.cart = this.cart.filter(item => item.id !== productId);
            this.saveCart();
            this.displayCart();
            this.updateCartCounter();
            this.showToast('Article supprimé du panier', 'success');
        }
    }

    // إفراغ السلة
    clearCart() {
        if (this.cart.length === 0) return;
        
        if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
            this.cart = [];
            this.saveCart();
            this.displayCart();
            this.updateCartCounter();
            this.showToast('Panier vidé', 'success');
        }
    }

    // إتمام الشراء
    checkout() {
        if (this.cart.length === 0) {
            this.showToast('Votre panier est vide', 'error');
            return;
        }

        // محاكاة عملية الدفع
        this.showToast('Redirection vers le paiement...', 'success');
        
        // هنا يمكن إضافة التكامل مع بوابة الدفع
        setTimeout(() => {
            alert('Fonctionnalité de paiement en cours de développement');
        }, 1000);
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // إغلاق الإشعارات تلقائياً
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('toast')) {
                this.hideToast();
            }
        });

        // تحديث السلة عند التحميل
        window.addEventListener('storage', () => {
            this.cart = this.loadCart();
            this.displayCart();
            this.updateCartCounter();
        });
    }

    // عرض الإشعارات
    showToast(message, type = 'success') {
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
            this.hideToast();
        }, 3000);
    }

    // إخفاء الإشعار
    hideToast() {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.className = 'toast';
        }
    }
}


let cartManager;

document.addEventListener('DOMContentLoaded', function() {
    cartManager = new CartManager();
});

window.cartManager = cartManager;