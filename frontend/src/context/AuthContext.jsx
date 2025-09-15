import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

    const autoLogin = async () => {
        const userData = localStorage.getItem("userData");
        try {
            const { token, id, user, role } = JSON.parse(userData);
            setToken(token);
            setUser({id, user, role});
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;

          } catch (error) {
            console.error(error);
          }
        };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post("/v1/users/login", {
        username,
        password,
      });
      const { id: id, token: token, user: user, role: role } = response.data;
      setToken(token);

      localStorage.setItem("userData", JSON.stringify({ token, user, id, role }));
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      setUser({id, user, role}); // or setUser ({ username }); if you want to store just the user info
    } catch (error) {
      throw new Error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("userData");
    axios.defaults.headers.common["Authorization"] = null;
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, autoLogin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
