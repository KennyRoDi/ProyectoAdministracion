// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Mock users database (normally this would be in a backend)
const MOCK_USERS = [
    {
        id: 1,
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        name: 'Grettel'
    },
    {
        id: 2,
        username: 'user',
        password: 'user123',
        role: 'customer',
        name: 'Camila'
    }
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for stored user session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (username, password) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const foundUser = MOCK_USERS.find(
            u => u.username === username && u.password === password
        );

        if (foundUser) {
            const { password: _, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem('user', JSON.stringify(userWithoutPassword));
            return { success: true };
        }

        return { success: false, error: 'Usuario o contraseña incorrectos' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const isAdmin = () => user?.role === 'admin';

    return (
        <AuthContext.Provider
            value={{ user, login, logout, isAdmin, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};