window.User = class User {
    constructor(id, userName, email, role) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.role = role;
    }

    static fromJSON(json) {
        return new User(
            json.id || null,
            json.userName || null,
            json.email || null,
            json.role || null,
        );
    }

    toJSON() {
        return {
            id: this.id,
            userName: this.userName,
            email: this.email,
            role: this.role,
        };
    }

    isValid() {
        return this.email && typeof this.email === 'string' && this.email.includes('@');
    }
}