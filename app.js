let currentScreen = 'main_screen';

async function loadScreen(screenId) {
    try {
        let screenPath;
        if (screenId === 'main_screen') {
            screenPath = `ui/main/${screenId}.html`;
        } else if (screenId === 'login_screen') {
            screenPath = `ui/authentication/login/${screenId}.html`;
        } else if (screenId === 'register_screen')  {
            screenPath = `ui/authentication/register/${screenId}.html`;
        }
        else {
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
        } else if (screenId === 'register_screen') {
            attachRegisterScreenEvents();
        }
    } catch (error) {
        console.error('Error loading screen:', error);
        document.getElementById('screen-container').innerHTML = '<p>Error loading screen</p>';
    }
}

function navigateTo(screenId) {
    loadScreen(screenId);
}

function attachMainScreenEvents() {
    const loginButton = document.querySelector('button[onclick="navigateTo(\'login_screen\')"]');
    const registerButton = document.querySelector('button[onclick="navigateTo(\'register_screen\')"]');
    if (loginButton) {
        loginButton.onclick = () => navigateTo('login_screen');
    }
    if (registerButton) {
        registerButton.onclick = () => navigateTo('register_screen');
    }
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

// Load the initial screen
loadScreen('main_screen');