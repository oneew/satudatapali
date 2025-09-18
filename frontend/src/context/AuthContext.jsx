import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedToken = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');
                const storedRole = localStorage.getItem('role');
                
                if (storedToken) {
                    setToken(storedToken);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                }
                
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
                
                if (storedRole) {
                    setRole(storedRole);
                }
            } catch (error) {
                console.error("Error initializing auth state:", error);
                // Clear potentially corrupted data
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('role');
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // Update axios headers and localStorage when token changes
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    // Update localStorage when user or role changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
        
        if (role) {
            localStorage.setItem('role', role);
        } else {
            localStorage.removeItem('role');
        }
    }, [user, role]);

    const login = (newToken, userData, userRole) => {
        setToken(newToken);
        setUser(userData);
        setRole(userRole);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setRole(null);
        // Remove all auth data from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            token, 
            role, 
            login, 
            logout, 
            isLoading 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
};