// frontend/src/pages/login/Login.jsx (Revised)
import React, { useState, useContext } from "react"; // 1. Tambahkan import useContext
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // 2. Impor AuthContext
import CustomModal from "./components/CustomModal";
import paliImage from "/pali.png";
import "./login.css"; // Import custom CSS

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext); // 3. Gunakan useContext di sini
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/v1/users/login", {
        username,
        password,
      });
      const { token, user, role } = response.data;
      login(token, user, role);
      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login Gagal! Periksa kembali username dan password Anda.";
      setModalMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => setModalMessage("");

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-30 animate-pulse"></div>
            <img 
              src={paliImage} 
              alt="PALI Logo" 
              className="login-logo relative"
            />
          </div>
          <h2 className="login-title">
            Satu Data PALI
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="login-input"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="login-input"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </div>
              ) : (
                "Masuk"
              )}
            </button>
          </div>
        </form>
        <div className="text-center pt-4">
          <Link to="/" className="login-link">
            ← Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
      {modalMessage && <CustomModal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}

export default Login;