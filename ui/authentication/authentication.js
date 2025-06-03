window.auth = {
    async handleLogin(event) {
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
                navigateTo('main_screen');
            } else {
                alert('Login Failed: ' + result.message);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    },

    async handleRegister(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('ui/authentication/login/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            });
            const result = await response.json();
            if (result.success) {
                alert('Registration Successful: ' + JSON.stringify(result.user));
                navigateTo('main_screen');
            } else {
                alert('Registration Failed: ' + result.message);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
};