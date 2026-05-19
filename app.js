// FoodHub Pakistan - Main Application

// Global variables
let currentFilter = 'all';
let currentSort = 'name';
let currentSearchQuery = '';
let darkMode = false;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    renderRestaurants();
    cart.updateCartUI();
});

function initializeApp() {
    // Load dark mode preference
    darkMode = localStorage.getItem('foodhub_darkmode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }

    // Initialize modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Cart toggle
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', openCartModal);
    }

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderMenu();
        });
    });

    // Sort dropdown
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderMenu();
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Dark mode toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Scroll to top button
    window.addEventListener('scroll', handleScrollToTop);

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const isOpen = answer.style.display === 'block';

                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                });

                // Toggle current item
                answer.style.display = isOpen ? 'none' : 'block';
            });
        }
    });

    // Input validation
    const contactInputs = ['contactName', 'contactEmail', 'contactSubject', 'contactMessage'];
    contactInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('blur', () => validateField(inputId));
            input.addEventListener('input', () => validateField(inputId));
        }
    });
}

function renderRestaurants() {
    const restaurantsContainer = document.querySelector('.restaurants-grid');
    if (!restaurantsContainer) return;

    restaurantsContainer.innerHTML = restaurants.map(restaurant => `
        <div class="restaurant-card">
            <div class="restaurant-image">
                <img src="${restaurant.image}" alt="${restaurant.name}">
                <div class="restaurant-overlay">
                    <button class="view-menu-btn" onclick="viewRestaurantMenu(${restaurant.id})">
                        View Menu
                    </button>
                </div>
            </div>
            <div class="restaurant-info">
                <h3>${restaurant.name}</h3>
                <p class="cuisine">${restaurant.cuisine}</p>
                <div class="restaurant-rating">
                    <span class="rating">${restaurant.rating} <i class="fas fa-star"></i></span>
                    <span class="reviews">(${restaurant.reviews} reviews)</span>
                </div>
                <p class="description">${restaurant.description}</p>
            </div>
        </div>
    `).join('');
}

function renderMenu() {
    const menuContainer = document.querySelector('.menu-grid');
    if (!menuContainer) return;

    let filteredMenu = menuItems;

    // Apply search filter
    if (currentSearchQuery) {
        filteredMenu = filteredMenu.filter(item =>
            item.name.toLowerCase().includes(currentSearchQuery.toLowerCase())
        );
    }

    // Apply category filter
    if (currentFilter !== 'all') {
        filteredMenu = filteredMenu.filter(item => item.category === currentFilter);
    }

    // Apply sorting
    if (currentSort === 'price-low') {
        filteredMenu.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        filteredMenu.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'name') {
        filteredMenu.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (filteredMenu.length === 0) {
        menuContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No items found</p>';
        return;
    }

    menuContainer.innerHTML = filteredMenu.map(item => {
        const isFavorite = cart.isFavorite(item.id);
        const restaurant = restaurants.find(r => r.id === item.restaurantId);

        return `
            <div class="menu-card">
                <div class="menu-image">
                    <img src="${item.image}" alt="${item.name}">
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}"
                            onclick="toggleFavorite(${item.id}, '${item.name.replace(/'/g, "\\'")}', '${item.image.replace(/'/g, "\\'")}', ${item.price}, '${item.category}')">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="menu-info">
                    <p class="restaurant-name">${restaurant ? restaurant.name : 'Restaurant'}</p>
                    <h4>${item.name}</h4>
                    <p class="price">Rs. ${item.price.toLocaleString('en-PK')}</p>
                    <span class="category">${item.category}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addItemToCart(${item.id}, '${item.name.replace(/'/g, "\\'")}', '${item.image.replace(/'/g, "\\'")}', ${item.price}, '${item.category}')">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
    }).join('');
}

function renderDeals() {
    const dealsContainer = document.querySelector('.deals-grid');
    if (!dealsContainer) return;

    dealsContainer.innerHTML = deals.map(deal => `
        <div class="deal-card">
            <div class="deal-badge">${deal.discount} OFF</div>
            <h3>${deal.title}</h3>
            <p class="deal-description">${deal.description}</p>
            <p class="deal-restaurant">
                <i class="fas fa-store"></i> ${deal.restaurant}
            </p>
            <p class="deal-valid">Valid until ${new Date(deal.validUntil).toLocaleDateString('en-PK')}</p>
            <button class="deal-btn" onclick="applyDeal('${deal.title}')">
                Claim Deal
            </button>
        </div>
    `).join('');
}

function renderTestimonials() {
    const testimonialsContainer = document.querySelector('.testimonials-grid');
    if (!testimonialsContainer) return;

    testimonialsContainer.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <div class="testimonial-stars">
                ${'<i class="fas fa-star"></i>'.repeat(testimonial.rating)}
            </div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="${testimonial.name}">
                <div>
                    <h4>${testimonial.name}</h4>
                    <p>Verified Customer</p>
                </div>
            </div>
        </div>
    `).join('');
}

function renderFAQ() {
    const faqContainer = document.querySelector('.faq-container');
    if (!faqContainer) return;

    faqContainer.innerHTML = faqs.map(faq => `
        <div class="faq-item">
            <div class="faq-question">
                <h4>${faq.question}</h4>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer" style="display: none;">
                <p>${faq.answer}</p>
            </div>
        </div>
    `).join('');

    // Re-attach event listeners for FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const isOpen = answer.style.display === 'block';

                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                });

                answer.style.display = isOpen ? 'none' : 'block';
            });
        }
    });
}

function viewRestaurantMenu(restaurantId) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;

    currentFilter = 'all';
    currentSearchQuery = '';

    // Filter menu items for this restaurant
    const restaurantItems = menuItems.filter(item => item.restaurantId === restaurantId);

    const menuContainer = document.querySelector('.menu-grid');
    if (menuContainer) {
        menuContainer.innerHTML = restaurantItems.map(item => {
            const isFavorite = cart.isFavorite(item.id);

            return `
                <div class="menu-card">
                    <div class="menu-image">
                        <img src="${item.image}" alt="${item.name}">
                        <button class="favorite-btn ${isFavorite ? 'active' : ''}"
                                onclick="toggleFavorite(${item.id}, '${item.name.replace(/'/g, "\\'")}', '${item.image.replace(/'/g, "\\'")}', ${item.price}, '${item.category}')">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                    <div class="menu-info">
                        <p class="restaurant-name">${restaurant.name}</p>
                        <h4>${item.name}</h4>
                        <p class="price">Rs. ${item.price.toLocaleString('en-PK')}</p>
                        <span class="category">${item.category}</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addItemToCart(${item.id}, '${item.name.replace(/'/g, "\\'")}', '${item.image.replace(/'/g, "\\'")}', ${item.price}, '${item.category}')">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            `;
        }).join('');
    }

    scrollToElement('compare');
}

function handleSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    currentSearchQuery = searchInput.value;
    renderMenu();
    scrollToElement('compare');
}

function addItemToCart(id, name, image, price, category) {
    const item = {
        id: id,
        name: name,
        image: image,
        price: price,
        category: category
    };

    cart.addItem(item);
}

function toggleFavorite(id, name, image, price, category) {
    const item = {
        id: id,
        name: name,
        image: image,
        price: price,
        category: category
    };

    const btn = event.target.closest('.favorite-btn');

    if (cart.isFavorite(id)) {
        cart.removeFromFavorites(id);
        btn.classList.remove('active');
        cart.showNotification(`${name} removed from favorites!`);
    } else {
        cart.addToFavorites(item);
        btn.classList.add('active');
    }
}

function applyDeal(dealTitle) {
    alert(`Deal "${dealTitle}" has been applied! Browse our menu to order now.`);
    scrollToElement('compare');
}

function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('foodhub_darkmode', darkMode);

    const toggle = document.querySelector('.dark-mode-toggle');
    if (toggle) {
        toggle.innerHTML = darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

function handleScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) return;

    if (window.scrollY > 300) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        if (target !== '#') {
            scrollToElement(target.substring(1));
        }
    });
});

// Check all elements are loaded and render them
window.addEventListener('load', function() {
    renderMenu();
    renderDeals();
    renderTestimonials();
    renderFAQ();
});
