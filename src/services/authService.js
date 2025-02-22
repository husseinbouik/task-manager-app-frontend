import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; 

const authService = {
    async register(name, email, password) {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, {
                name: name,
                email: email,
                password: password,
                password_confirmation: password
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    async login(email, password) {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                email: email,
                password: password
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('token'); // Clear token from local storage
    }
};

export default authService;