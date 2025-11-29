// Cart Counter Functionality
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const counters = document.querySelectorAll('.cart-counter');
    counters.forEach(counter => {
        counter.textContent = cart.length > 0 ? cart.length : '';
        counter.style.display = cart.length > 0 ? 'flex' : 'none';
    });
}

// Update cart counter when page loads
document.addEventListener('DOMContentLoaded', updateCartCounter);

// Listen for cart updates
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartCounter();
    }
});