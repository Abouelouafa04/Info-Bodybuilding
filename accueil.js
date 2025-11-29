    // JavaScript to toggle the visibility of the search box
    function toggleSearchBox() {
        const searchBox = document.getElementById('search-box');
        searchBox.classList.toggle('visible');
    }





document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.stars .star');
    let selected = 0;
    stars.forEach((star, idx) => {
        star.addEventListener('mouseover', () => {
            stars.forEach((s, i) => s.classList.toggle('selected', i <= idx));
        });
        star.addEventListener('mouseout', () => {
            stars.forEach((s, i) => s.classList.toggle('selected', i < selected));
        });
        star.addEventListener('click', () => {
            selected = idx + 1;
            stars.forEach((s, i) => s.classList.toggle('selected', i < selected));
        });
    });

    

    // Feedback form
    const form = document.getElementById('feedbackForm');
    const thankYou = document.getElementById('thankYouMessage');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        form.style.display = 'none';
        thankYou.classList.remove('hidden');
    });
});
