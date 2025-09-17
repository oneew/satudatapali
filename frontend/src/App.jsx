import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Header from "./shared/components/header/header";
import Footer from "./shared/components/footer/footer";

import "./App.css";
import "./shared/styles/global.css";
import Home from "./pages/home/Home.jsx";
import OpenData from "./pages/open data/OpenData";
import Login from "./pages/login/Login.jsx";
import Detail from "./pages/open data/Detail.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/satudata/Dashboard.jsx';
import PriorityData from './pages/priority-data/PriorityData.jsx';
import { AuthProvider } from "./context/AuthContext.jsx";

// Custom component to conditionally render Footer
const ConditionalFooter = () => {
  const location = useLocation();
  
  // Don't show footer on login page and dashboard
  if (location.pathname.startsWith('/satudata')) {
    return null;
  }
  
  return <Footer />;
};

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
              <Route path="/prioritas" element={<PriorityData />} />
              <Route path="/satudata" element={<Login />} />
              <Route 
                path="satudata/dashboard" 
                element={
                    <ProtectedRoute element={<Dashboard />} />
                } 
            />
            </Routes>
          </main>
          <ConditionalFooter />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;