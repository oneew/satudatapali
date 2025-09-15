import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Button,
    Avatar,
    Image
} from "@chakra-ui/react";

import "./headerStyle.css";
import "../../../index.css";

import NavLink from './navLink';
import { Link } from 'react-router-dom';


function Header() {
    const [isSticky, setIsSticky] = useState(false);
    
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <Box as="header" className={`header-container ${isSticky ? 'sticky' : ''}`}>
      <Flex justify="space-between" align="center" p={{ base: 2, md: 4 }}>
        <Box className="left-section" width={{ base: '40%', sm: '30%', md: '20%' }}>
          <Flex className="logo-container">
            <Box className="logo-circle">SD</Box>
            <Box>
              <span className="site-title poppins-bold">SATU DATA</span>
              <br />
              <span className="site-title poppins-light">KAB. PALI</span>
            </Box>
          </Flex>
        </Box>

        <Box className="middle-section">
          <NavLink />
        </Box>

        <Box className='right-section'>
          {/* Add user profile or other icons here */}
        </Box>
      </Flex>
    </Box>
  )
}

export default Header;