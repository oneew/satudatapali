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
    <Box as="header" backgroundColor='teal.800' className={`header-container ${isSticky ? 'sticky' : ''}`}>
      <Flex justify="space-between" align="center" p={4}>
        <Box className="left-section" width='20%'>
          <Image src='/sdi2.png' width='20%'/>
          <span className="site-title poppins-bold">SDI</span>
          <span className="site-title poppins-light">.KAB.PALI</span>
        </Box>

        <Box className="middle-section">
          <NavLink />
        </Box>

        <Box className='right-section'>

        </Box>
      </Flex>
    </Box>
  )
}

export default Header;