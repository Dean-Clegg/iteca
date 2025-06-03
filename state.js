import { User } from './models/user.js';

const state = {
    user: null,

    init() {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            this.user = User.fromJSON(JSON.parse(storedUser));
        }
    },

    setUser(user) {
        if (user && typeof user === 'object') {
            this.user = new User(
                user.id || null,
                user.userName || null,
                user.email || null,
                user.role || null
            );
            sessionStorage.setItem('user', JSON.stringify(this.user.toJSON()));
        } else {
            throw new Error('Invalid user object');
        }
    },

    getUser() {
        return this.user;
    },

    clearUser() {
        this.user = null;
        sessionStorage.removeItem('user');
    }
};

state.init();

export default state;