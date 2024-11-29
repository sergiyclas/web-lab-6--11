import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import {registerUser} from "../../lib/authorization.js";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && password) {
            try {
                const user = await registerUser({ email, password }); // Виклик API для реєстрації
                localStorage.setItem('user', JSON.stringify(user)); // Збереження користувача
                navigate('/'); // Перехід на головну сторінку
                window.location.reload();
            } catch (err) {
                setError(err.message); // Виведення помилки
            }
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button>
            </form>
        </Box>
    );
};

export default Register;
