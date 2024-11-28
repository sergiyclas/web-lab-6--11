import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_LINK;

export async function loginUser(email, password) {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Login failed");
    }
}

export async function registerUser(userData) {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Register error:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Registration failed");
    }
}
