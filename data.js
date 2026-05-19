// FoodHub Pakistan - Restaurant and Menu Data

// Restaurants Data
const restaurants = [
    {
        id: 1,
        name: 'Cheezious',
        cuisine: 'Pizza & Burgers',
        rating: 4.8,
        reviews: 1250,
        image: '../images/restaurants/cheezious.png',
        description: 'Premium pizzas and gourmet burgers'
    },
    {
        id: 2,
        name: 'Ranchers',
        cuisine: 'Chicken & BBQ',
        rating: 4.6,
        reviews: 980,
        image: '../images/restaurants/ranchers.png',
        description: 'Delicious grilled chicken and BBQ'
    },
    {
        id: 3,
        name: 'KFC',
        cuisine: 'Fried Chicken',
        rating: 4.7,
        reviews: 2100,
        image: '../images/restaurants/kfc.png',
        description: 'Original recipe fried chicken'
    },
    {
        id: 4,
        name: "McDonald's",
        cuisine: 'Burgers & Fries',
        rating: 4.5,
        reviews: 1850,
        image: '../images/restaurants/mcdonalds.png',
        description: 'Fast food classics'
    },
    {
        id: 5,
        name: 'Pizza Hut',
        cuisine: 'Pizza',
        rating: 4.4,
        reviews: 1600,
        image: '../images/restaurants/pizzahut.png',
        description: 'Delicious pizzas with fresh ingredients'
    },
    {
        id: 6,
        name: "Domino's",
        cuisine: 'Pizza & Sides',
        rating: 4.5,
        reviews: 1450,
        image: '../images/restaurants/dominos.png',
        description: 'Hot pizzas delivered fast'
    },
    {
        id: 7,
        name: "Hardee's",
        cuisine: 'Burgers & Chicken',
        rating: 4.3,
        reviews: 920,
        image: '../images/restaurants/hardees.png',
        description: 'Flame-grilled burgers and chicken'
    },
    {
        id: 8,
        name: 'OPTP',
        cuisine: 'Pakistani Fast Food',
        rating: 4.6,
        reviews: 1100,
        image: '../images/restaurants/optp.png',
        description: 'Traditional Pakistani fast food'
    },
    {
        id: 9,
        name: 'Burger Lab',
        cuisine: 'Gourmet Burgers',
        rating: 4.7,
        reviews: 850,
        image: '../images/restaurants/burgerlab.png',
        description: 'Artisanal and experimental burgers'
    },
    {
        id: 10,
        name: 'Foodpanda',
        cuisine: 'Multi-Cuisine',
        rating: 4.4,
        reviews: 1300,
        image: '../images/restaurants/foodpanda.png',
        description: 'Wide variety of cuisines'
    }
];

// Menu Items Data
const menuItems = [
    // Cheezious
    { id: 101, restaurantId: 1, name: 'Margherita Pizza (Large)', category: 'Pizza', price: 890, image: 'https://via.placeholder.com/200x150?text=Margherita' },
    { id: 102, restaurantId: 1, name: 'Pepperoni Pizza (Large)', category: 'Pizza', price: 1090, image: 'https://via.placeholder.com/200x150?text=Pepperoni' },
    { id: 103, restaurantId: 1, name: 'Cheesy Burger', category: 'Burger', price: 450, image: 'https://via.placeholder.com/200x150?text=Cheesy+Burger' },
    { id: 104, restaurantId: 1, name: 'Fries (Large)', category: 'Fries', price: 250, image: 'https://via.placeholder.com/200x150?text=Fries' },

    // Ranchers
    { id: 201, restaurantId: 2, name: 'Grilled Chicken Platter', category: 'Chicken', price: 650, image: 'https://via.placeholder.com/200x150?text=Chicken+Platter' },
    { id: 202, restaurantId: 2, name: 'BBQ Chicken Wings', category: 'Chicken', price: 550, image: 'https://via.placeholder.com/200x150?text=BBQ+Wings' },
    { id: 203, restaurantId: 2, name: 'Mixed Grill', category: 'Grill', price: 850, image: 'https://via.placeholder.com/200x150?text=Mixed+Grill' },
    { id: 204, restaurantId: 2, name: 'Garlic Bread', category: 'Sides', price: 200, image: 'https://via.placeholder.com/200x150?text=Garlic+Bread' },

    // KFC
    { id: 301, restaurantId: 3, name: '6-Piece Fried Chicken', category: 'Chicken', price: 520, image: 'https://via.placeholder.com/200x150?text=KFC+Chicken' },
    { id: 302, restaurantId: 3, name: '12-Piece Fried Chicken', category: 'Chicken', price: 950, image: 'https://via.placeholder.com/200x150?text=12Pc+Chicken' },
    { id: 303, restaurantId: 3, name: 'Zinger Burger', category: 'Burger', price: 380, image: 'https://via.placeholder.com/200x150?text=Zinger' },
    { id: 304, restaurantId: 3, name: 'Popcorn Chicken', category: 'Chicken', price: 320, image: 'https://via.placeholder.com/200x150?text=Popcorn' },

    // McDonald's
    { id: 401, restaurantId: 4, name: 'Big Mac', category: 'Burger', price: 480, image: 'https://via.placeholder.com/200x150?text=Big+Mac' },
    { id: 402, restaurantId: 4, name: 'McSpicy', category: 'Burger', price: 420, image: 'https://via.placeholder.com/200x150?text=McSpicy' },
    { id: 403, restaurantId: 4, name: 'French Fries (Large)', category: 'Fries', price: 280, image: 'https://via.placeholder.com/200x150?text=Fries' },
    { id: 404, restaurantId: 4, name: 'Chicken McNuggets (6pcs)', category: 'Chicken', price: 350, image: 'https://via.placeholder.com/200x150?text=McNuggets' },

    // Pizza Hut
    { id: 501, restaurantId: 5, name: 'Super Supreme Pizza (Large)', category: 'Pizza', price: 1250, image: 'https://via.placeholder.com/200x150?text=Supreme' },
    { id: 502, restaurantId: 5, name: 'Meat Lovers Pizza (Large)', category: 'Pizza', price: 1150, image: 'https://via.placeholder.com/200x150?text=Meat+Lovers' },
    { id: 503, restaurantId: 5, name: 'Garlic Bread Sticks', category: 'Sides', price: 280, image: 'https://via.placeholder.com/200x150?text=Garlic+Sticks' },
    { id: 504, restaurantId: 5, name: 'Buffalo Chicken Wings', category: 'Chicken', price: 420, image: 'https://via.placeholder.com/200x150?text=Buffalo' },

    // Domino's
    { id: 601, restaurantId: 6, name: 'MeatZZa Pizza (Large)', category: 'Pizza', price: 1100, image: 'https://via.placeholder.com/200x150?text=MeatZZa' },
    { id: 602, restaurantId: 6, name: 'Veggie Pizza (Large)', category: 'Pizza', price: 890, image: 'https://via.placeholder.com/200x150?text=Veggie' },
    { id: 603, restaurantId: 6, name: 'Pasta Mania', category: 'Pasta', price: 620, image: 'https://via.placeholder.com/200x150?text=Pasta' },
    { id: 604, restaurantId: 6, name: 'Lava Cake', category: 'Dessert', price: 280, image: 'https://via.placeholder.com/200x150?text=Lava+Cake' },

    // Hardee's
    { id: 701, restaurantId: 7, name: 'Famous Star Burger', category: 'Burger', price: 460, image: 'https://via.placeholder.com/200x150?text=Famous+Star' },
    { id: 702, restaurantId: 7, name: 'Charbroiled Chicken Sandwich', category: 'Chicken', price: 420, image: 'https://via.placeholder.com/200x150?text=Chicken+Sandwich' },
    { id: 703, restaurantId: 7, name: 'Crispy Curly Fries (Large)', category: 'Fries', price: 270, image: 'https://via.placeholder.com/200x150?text=Curly+Fries' },
    { id: 704, restaurantId: 7, name: 'Natural Cut Fries', category: 'Fries', price: 250, image: 'https://via.placeholder.com/200x150?text=Natural+Fries' },

    // OPTP
    { id: 801, restaurantId: 8, name: 'Karahi Chicken', category: 'Pakistani', price: 580, image: 'https://via.placeholder.com/200x150?text=Karahi' },
    { id: 802, restaurantId: 8, name: 'Nihari', category: 'Pakistani', price: 420, image: 'https://via.placeholder.com/200x150?text=Nihari' },
    { id: 803, restaurantId: 8, name: 'Seekh Kebab', category: 'Pakistani', price: 350, image: 'https://via.placeholder.com/200x150?text=Seekh+Kebab' },
    { id: 804, restaurantId: 8, name: 'Biryani', category: 'Pakistani', price: 490, image: 'https://via.placeholder.com/200x150?text=Biryani' },

    // Burger Lab
    { id: 901, restaurantId: 9, name: 'Black Angus Burger', category: 'Burger', price: 750, image: 'https://via.placeholder.com/200x150?text=Angus' },
    { id: 902, restaurantId: 9, name: 'Truffle Burger', category: 'Burger', price: 890, image: 'https://via.placeholder.com/200x150?text=Truffle' },
    { id: 903, restaurantId: 9, name: 'Loaded Fries', category: 'Fries', price: 420, image: 'https://via.placeholder.com/200x150?text=Loaded+Fries' },
    { id: 904, restaurantId: 9, name: 'Craft Milkshake', category: 'Beverage', price: 280, image: 'https://via.placeholder.com/200x150?text=Milkshake' },

    // Foodpanda
    { id: 1001, restaurantId: 10, name: 'Biryani Special', category: 'Pakistani', price: 520, image: 'https://via.placeholder.com/200x150?text=Biryani' },
    { id: 1002, restaurantId: 10, name: 'Butter Chicken', category: 'Indian', price: 580, image: 'https://via.placeholder.com/200x150?text=Butter+Chicken' },
    { id: 1003, restaurantId: 10, name: 'Spring Rolls', category: 'Appetizer', price: 320, image: 'https://via.placeholder.com/200x150?text=Spring+Rolls' },
    { id: 1004, restaurantId: 10, name: 'Fried Rice', category: 'Rice', price: 380, image: 'https://via.placeholder.com/200x150?text=Fried+Rice' }
];

// Deals and Offers
const deals = [
    {
        id: 1,
        title: 'Pizza Party Deal',
        description: 'Buy 2 Large Pizzas, Get 1 Free',
        discount: '33%',
        restaurant: 'Cheezious',
        validUntil: '2026-05-30'
    },
    {
        id: 2,
        title: 'Chicken Combo',
        description: '12-Piece Chicken + Fries + Drinks',
        discount: '25%',
        restaurant: 'KFC',
        validUntil: '2026-05-28'
    },
    {
        id: 3,
        title: 'Burger Bonanza',
        description: 'Buy 1 Burger, Get 1 at 50% Off',
        discount: '50%',
        restaurant: "McDonald's",
        validUntil: '2026-05-25'
    },
    {
        id: 4,
        title: 'BBQ Special',
        description: 'Grilled Chicken Platter + 2 Drinks',
        discount: '20%',
        restaurant: 'Ranchers',
        validUntil: '2026-05-29'
    },
    {
        id: 5,
        title: 'Weekend Special',
        description: 'Any Large Pizza + Garlic Bread',
        discount: '30%',
        restaurant: "Domino's",
        validUntil: '2026-05-26'
    },
    {
        id: 6,
        title: 'Family Feast',
        description: 'Mix & Match 4 Items',
        discount: '40%',
        restaurant: 'Pizza Hut',
        validUntil: '2026-05-27'
    }
];

// Testimonials
const testimonials = [
    {
        id: 1,
        name: 'Ahmed Hassan',
        text: 'FoodHub Pakistan has made my life so much easier. I can compare prices from all restaurants in one place!',
        rating: 5,
        image: 'https://via.placeholder.com/80x80?text=User1'
    },
    {
        id: 2,
        name: 'Fatima Khan',
        text: 'Amazing app! I found the best deals and saved so much money on my orders. Highly recommended!',
        rating: 5,
        image: 'https://via.placeholder.com/80x80?text=User2'
    },
    {
        id: 3,
        name: 'Ali Raza',
        text: 'The interface is super clean and easy to use. Great platform for comparing prices.',
        rating: 4,
        image: 'https://via.placeholder.com/80x80?text=User3'
    },
    {
        id: 4,
        name: 'Sara Ahmed',
        text: 'Love the cart feature and the ability to save favorites. FoodHub is my go-to platform!',
        rating: 5,
        image: 'https://via.placeholder.com/80x80?text=User4'
    }
];

// FAQ Data
const faqs = [
    {
        id: 1,
        question: 'How does FoodHub Pakistan work?',
        answer: 'FoodHub Pakistan is a platform that aggregates menus from your favorite fast food restaurants. Browse restaurants, compare prices, add items to your cart, and place your order. Our platform makes it easy to find the best deals all in one place.'
    },
    {
        id: 2,
        question: 'Which restaurants are available?',
        answer: 'We have partnered with 10 major fast-food chains including Cheezious, Ranchers, KFC, McDonald\'s, Pizza Hut, Domino\'s, Hardee\'s, OPTP, Burger Lab, and Foodpanda. More restaurants are being added regularly.'
    },
    {
        id: 3,
        question: 'How do I compare prices?',
        answer: 'Visit the "Compare Prices" section to see side-by-side pricing for similar menu items across different restaurants. You can filter by category and sort by price to find the best deals.'
    },
    {
        id: 4,
        question: 'Is my payment information secure?',
        answer: 'Your payment information is encrypted and secure. We use industry-standard security protocols to protect your data. You can also save your favorite payment methods for faster checkout.'
    },
    {
        id: 5,
        question: 'Can I save my favorite items?',
        answer: 'Yes! Click the heart icon on any menu item to add it to your favorites. Your favorites are saved in your browser\'s local storage and will be available when you return.'
    },
    {
        id: 6,
        question: 'What is the delivery time?',
        answer: 'Delivery times vary by restaurant and your location. Most orders are delivered within 30-45 minutes. You can see the estimated delivery time during checkout.'
    },
    {
        id: 7,
        question: 'Can I track my order?',
        answer: 'Yes, once you place an order, you\'ll receive a tracking link in your email. You can track your order in real-time and see the delivery status.'
    },
    {
        id: 8,
        question: 'What if I have an issue with my order?',
        answer: 'If you encounter any issues with your order, please contact our customer support team via the contact form or call our hotline. We\'re here to help 24/7.'
    }
];
