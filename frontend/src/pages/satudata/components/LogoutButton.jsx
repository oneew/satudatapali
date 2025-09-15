import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { Button, Link } from '@chakra-ui/react';


function LogoutButton() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/satudata');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

  return (
        <Button colorScheme='red' variant={'outline'} onClick={handleLogout}>Logout</Button>
  )
}

export default LogoutButton