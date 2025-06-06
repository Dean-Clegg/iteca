let currentScreen = 'main_screen';

async function loadScreen(screenId, queryParams = '') {
    try {
        let screenPath;
        if (screenId === 'main_screen') {
            screenPath = `ui/main/${screenId}.html`;
        } else if (screenId === 'login_screen') {
            screenPath = `ui/authentication/login/${screenId}.html`;
        } else if (screenId === 'register_screen') {
            screenPath = `ui/authentication/register/${screenId}.html`;
        } else if (screenId === 'product_detail') {
            screenPath = `ui/main/${screenId}.html`;
        } else if (screenId === 'cart_screen') {
            screenPath = `ui/profile/${screenId}.html`;
        } else if (screenId === 'admin_screen') {
            screenPath = `ui/profile/${screenId}.html`;
        } else if (screenId === 'orders_screen') {
            screenPath = `ui/profile/${screenId}.html`;
        } else {
            screenPath = `ui/main/main_screen.html`;
        }

        const response = await fetch(screenPath);
        if (!response.ok) throw new Error('Screen not found');
        document.getElementById('screen-container').innerHTML = await response.text();
        currentScreen = screenId;

        window.currentQueryParams = queryParams;

        if (screenId === 'main_screen') {
            attachMainScreenEvents();
        } else if (screenId === 'login_screen') {
            attachLoginScreenEvents();
        } else if (screenId === 'register_screen') {
            attachRegisterScreenEvents();
        } else if (screenId === 'product_detail') {
            attachProductDetailsEvents();
        }
    } catch (error) {
        console.error('Error loading screen:', error);
        document.getElementById('screen-container').innerHTML = '<p>Error loading screen</p>';
    }
}

function navigateTo(screenId) {
    const [baseScreen, queryString] = screenId.split('?');
    const queryParams = queryString ? `?${queryString}` : '';
    loadScreen(baseScreen, queryParams);
}

// Make navigateTo globally available
window.navigateTo = navigateTo;

function attachMainScreenEvents() {
    const loginButton = document.querySelector('button[onclick="navigateTo(\'login_screen\')"]');
    const registerButton = document.querySelector('button[onclick="navigateTo(\'register_screen\')"]');
    if (loginButton) {
        loginButton.onclick = () => navigateTo('login_screen');
    }
    if (registerButton) {
        registerButton.onclick = () => navigateTo('register_screen');
    }

    // Attach event listeners for product clicks
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.addEventListener('click', () => {
            const productId = product.getAttribute('data-product-id');
            navigateTo(`product_detail?id=${productId}`);
        });
    });
}

function attachLoginScreenEvents() {
    const form = document.getElementById('login-form');
    const backButton = document.querySelector('button[onclick="navigateTo(\'main_screen\')"]');
    if (form) {
        form.onsubmit = window.auth.handleLogin;
    }
    if (backButton) {
        backButton.onclick = () => navigateTo('main_screen');
    }
}

function attachRegisterScreenEvents() {
    const form = document.getElementById('register-form');
    const backButton = document.querySelector('button[onclick="navigateTo(\'main_screen\')"]');
    if (form) {
        form.onsubmit = window.auth.handleRegister;
    }
    if (backButton) {
        backButton.onclick = () => navigateTo('main_screen');
    }
}

function attachProductDetailsEvents() {
    // Add event listeners for product details page
    const backButton = document.querySelector('button[onclick="navigateTo(\'main_screen\')"]');
    if (backButton) {
        backButton.onclick = () => navigateTo('main_screen');
    }

    // Example: Load product details based on query parameter
    const queryParams = new URLSearchParams(window.currentQueryParams);
    const productId = queryParams.get('id');
    if (productId) {
        console.log(`Loading details for product ID: ${productId}`);
        // In a real app, fetch product details from the backend here
    }
}

// Load the initial screen
loadScreen('main_screen');