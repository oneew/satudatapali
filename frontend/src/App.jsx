import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Header from "./shared/components/header/header";
import Footer from "./shared/components/footer/footer";

import "./App.css";
import Home from "./pages/home/Home.jsx";
import OpenData from "./pages/open data/OpenData";
import Login from "./pages/login/Login.jsx";
import Detail from "./pages/open data/Detail.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/satudata/Dashboard.jsx';
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/opendata" element={<OpenData />} />
              <Route path="/dataset/:id" element={<Detail />} />
              <Route path="/satudata" element={<Login />} />
              <Route 
                path="satudata/dashboard" 
                element={
                    <ProtectedRoute element={<Dashboard />} />
                } 
            />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
