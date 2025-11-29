# Get all HTML files in the current directory
$htmlFiles = Get-ChildItem -Path . -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw

    # Update head section
    $newHead = @"
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>INFO-BODYBUILDING</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="accueil.css">
    <link rel="stylesheet" href="cart.css">
    <link rel="stylesheet" href="components.css">
    <link rel="stylesheet" href="responsive.css">
"@

    # Update header section
    $newHeader = @"
    <header id="main-header">
        <div class="logo-container">
            <a href="accueil.html"><img class="logo" src="accueil-photos/z01.jpg" alt="INFO-BODYBUILDING Logo"></a>
        </div>

        <nav class="navbar" id="navbar">
            <ul class="nav-links">
                <li><a class="active" href="workout.html">WORKOUTS</a></li>
                <li><a href="shop.html">SHOP</a></li>
                <li><a href="articles.html">ARTICLES</a></li>
            </ul>
        </nav>

        <div class="header-actions">
            <div class="action-icons">
                <a id="search-icon" href="#" class="icon-link" onclick="toggleSearchBox()">
                    <i class="bi bi-search"></i>
                </a>
                <a id="shop-icon" href="shop.html" class="icon-link" aria-label="Shopping cart">
                    <i class="bi bi-cart4"></i>
                    <span id="cart-counter" class="cart-counter"></span>
                </a>
                <a id="subscribe-icon" href="sing.html" class="icon-link">
                    <i class="bi bi-person-circle"></i>
                </a>
            </div>
            <div class="search-box" id="search-box">
                <input type="text" class="search-input" placeholder="Search...">
                <button class="search-button">
                    <i class="bi bi-search"></i>
                </button>
            </div>
        </div>
    </header>
"@

    # Update footer section
    $newFooter = @"
    <footer class="footer">
        <div class="footer-logo">
            <h1>INFO-BODYBUILDING</h1>
            <div class="social-icons">
                <a href="#" aria-label="Facebook" class="social-icon"><i class="bi bi-facebook"></i></a>
                <a href="#" aria-label="Instagram" class="social-icon"><i class="bi bi-instagram"></i></a>
                <a href="#" aria-label="LinkedIn" class="social-icon"><i class="bi bi-linkedin"></i></a>
                <a href="#" aria-label="GitHub" class="social-icon"><i class="bi bi-github"></i></a>
            </div>
        </div>
        <div class="footer-links">
            <div>
                <h3>Workout</h3>
                <ul>
                    <li><a href="exercices.html">Exercise</a></li>
                    <li><a href="programs.html">Programs</a></li>
                </ul>
            </div>
            <div>
                <h3>Shop</h3>
                <ul>
                    <li><a href="shop.html">Protein</a></li>
                    <li><a href="shop.html">Vitamin</a></li>
                    <li><a href="shop.html">Creatin</a></li>
                    <li><a href="shop.html">Pre-Workout</a></li>
                </ul>
            </div>
            <div>
                <h3>Articles</h3>
                <ul>
                    <li><a href="articles.html">Workout</a></li>
                    <li><a href="articles.html">Nutrition</a></li>
                    <li><a href="articles.html">Supplements</a></li>
                    <li><a href="articles.html">Tips</a></li>
                </ul>
            </div>
            <div>
                <h3>Support</h3>
                <ul>
                    <li><a href="#">Search</a></li>
                    <li><a href="sing.html">S'inscrire</a></li>
                </ul>
            </div>
        </div>
    </footer>

    <script src="accueil.js"></script>
    <script src="responsive.js"></script>
    <script src="cart-counter.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true
        });
    </script>
"@

    # Replace head section
    $content = $content -replace '<head>.*?</head>', $newHead

    # Replace header section
    $content = $content -replace '<header.*?</header>', $newHeader

    # Replace footer and scripts
    $content = $content -replace '<footer.*?</script>\s*</body>', $newFooter + "</body>"

    # Save the updated content
    $content | Set-Content $file.FullName -Force
}