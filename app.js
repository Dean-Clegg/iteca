let currentScreen = 'main_screen';

async function loadScreen(screenId) {
    try {
        let screenPath;
        if (screenId === 'main_screen') {
            screenPath = `ui/main/${screenId}.html`;
        } else if (screenId === 'login_screen') {
            screenPath = `ui/authentication/login/${screenId}.html`;
        } else {
            screenPath = `ui/main/${screenId}.html`;
        }
        const response = await fetch(screenPath);
        if (!response.ok) throw new Error('Screen not found');
        document.getElementById('screen-container').innerHTML = await response.text();
        currentScreen = screenId;
        if (screenId === 'main_screen') {
            attachMainScreenEvents();
        } else if (screenId === 'login_screen') {
            attachLoginScreenEvents();
        }
    } catch (error) {
        console.error('Error loading screen:', error);
        document.getElementById('screen-container').innerHTML = '<p>Error loading screen</p>';
    }
}

function navigateTo(screenId) {
    loadScreen(screenId);
}

async function testPHP() {
    try {
        const response = await fetch('ui/authentication/login/test.php', {
            method: 'GET'
        });
        const result = await response.json();
        alert('Test PHP Result: ' + JSON.stringify(result));
    } catch (error) {
        alert('Test PHP Error: ' + error.message);
    }
}

function attachMainScreenEvents() {
    const loginButton = document.querySelector('button[onclick="navigateTo(\'login_screen\')"]');
    if (loginButton) {
        loginButton.onclick = () => navigateTo('login_screen');
    }
}

function attachLoginScreenEvents() {
    const form = document.getElementById('login-form');
    if (form) {
        form.onsubmit = handleLogin;
    }
    const backButton = document.querySelector('button[onclick="navigateTo(\'main_screen\')"]');
    if (backButton) {
        backButton.onclick = () => navigateTo('main_screen');
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('ui/authentication/login/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });
        const result = await response.json();
        if (result.success) {
            alert('Login Successful: ' + JSON.stringify(result.user));
            navigateTo('main_screen'); // Navigate after successful login
        } else {
            alert('Login Failed: ' + result.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Load the initial screen
loadScreen('main_screen');