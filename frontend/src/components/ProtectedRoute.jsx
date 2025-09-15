import {React, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ProtectedRoute = ({ element }) => {
    const { user } = useAuth();
    
    // If the user is not authenticated, redirect to the login page
    return user ? element : <Navigate to="/satudata" replace />;
};

export default ProtectedRoute;