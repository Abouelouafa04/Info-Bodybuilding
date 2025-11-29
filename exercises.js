// Global JavaScript for exercise pages

// Toggle search box visibility
function toggleSearchBox() {
    const searchBox = document.getElementById('search-box');
    searchBox.classList.toggle('visible');
    
    // Focus on input when search box is shown
    if (searchBox.classList.contains('visible')) {
        setTimeout(() => {
            document.querySelector('.search-input').focus();
        }, 100);
    }
}

// Close search box when clicking outside
document.addEventListener('click', function(event) {
    const searchBox = document.getElementById('search-box');
    const searchIcon = document.getElementById('search-icon');
    
    if (searchBox && searchIcon) {
        const isClickInsideSearchBox = searchBox.contains(event.target);
        const isClickOnSearchIcon = searchIcon.contains(event.target);
        
        if (!isClickInsideSearchBox && !isClickOnSearchIcon && searchBox.classList.contains('visible')) {
            searchBox.classList.remove('visible');
        }
    }
});

// Handle search functionality
function handleSearch(event) {
    if (event) {
        event.preventDefault();
    }
    
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm) {
        // In a real application, this would send the search term to a server
        // For now, we'll just show an alert and log to console
        alert(`Searching for: ${searchTerm}`);
        console.log(`Search term: ${searchTerm}`);
        
        // Clear the input
        searchInput.value = '';
        
        // Hide the search box
        document.getElementById('search-box').classList.remove('visible');
    }
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to search button
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }
    
    // Add event listener to search input for Enter key
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                handleSearch(event);
            }
        });
    }
    
    // Add click event to exercise cards to show details
    const exerciseCards = document.querySelectorAll('.work');
    exerciseCards.forEach(card => {
        card.addEventListener('click', function() {
            const exerciseName = this.querySelector('.desc p').textContent;
            if (exerciseName.trim()) {
                // In a real application, this would navigate to an exercise detail page
                // For now, we'll just show an alert
                alert(`Selected exercise: ${exerciseName}`);
            }
        });
    });
    
    // Back to top functionality
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Image loading enhancement
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading="lazy" for better performance
        img.setAttribute('loading', 'lazy');
        
        // Handle image loading errors
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
            this.alt = 'Image not available';
        });
        
        // Remove loading animation once image is loaded
        img.addEventListener('load', function() {
            this.style.background = 'none';
            this.style.animation = 'none';
        });
    });
    
    // Fix image src encoding (existing functionality)
    (function(){
        document.querySelectorAll('img').forEach(function(img){
            var s = img.getAttribute('src'); 
            if(!s) return; 
            s = s.replace(/\\\\/g,'/'); 
            try{ 
                img.src = encodeURI(s); 
            } catch(e) {
                console.error('Error encoding image URL:', e);
            }
        });
    })();
    
    // Add page-specific title if not already set
    const pageTitle = document.querySelector('title');
    if (pageTitle && pageTitle.textContent.includes('Exercises')) {
        const muscleGroup = window.location.pathname.split('.')[0].split('/').pop();
        if (muscleGroup && muscleGroup !== 'exercices') {
            const formattedName = muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1);
            pageTitle.textContent = `${formattedName} Exercises — INFO-BODYBUILDING`;
            
            // Also update the main heading if it exists
            const mainHeading = document.querySelector('.page-title');
            if (mainHeading) {
                mainHeading.textContent = `${formattedName} Exercises`;
            }
        }
    }
});

// Utility function to format exercise names
function formatExerciseName(name) {
    return name
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}