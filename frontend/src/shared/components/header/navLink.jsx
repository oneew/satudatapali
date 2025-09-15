import React from 'react';
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useLocation, Link } from 'react-router-dom';

import { RiHome5Line } from "react-icons/ri";
import { RiPieChart2Line } from "react-icons/ri";
import { FiBox } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

import './headerStyle.css'
import '../../../index.css'

function NavLink() {
    const location = useLocation();

  return (
    <ButtonGroup 
      spacing={2} 
      align="center"
    >
      <Link to={"/"}>
        <Button 
          color='white' 
          variant='ghost' 
          className={`nav-button poppins-medium ${location.pathname === '/' ? 'nav-button-active' : ''}`}
          leftIcon={<RiHome5Line />}
        >
          Beranda
        </Button>
      </Link>

      <Link to={"/opendata"}>
        <Button 
          color='white'
          variant='ghost' 
          className={`nav-button poppins-medium ${location.pathname === '/opendata' ? 'nav-button-active' : ''}`}
          leftIcon={<RiPieChart2Line />}>
          Data Terbuka
        </Button>
      </Link>

      <Link to={"/satudata"}>
        <Button 
          color='white'
          variant='ghost' 
          className={`nav-button poppins-medium ${location.pathname === '/satudata' ? 'nav-button-active' : ''}`}
          leftIcon={<FiBox />}>
          Satu Data
        </Button>
      </Link>

      <a href='https://gis-pbb.palikab.go.id/' target='_blank' rel='noopener noreferrer'>
        <Button 
          color='white'
          variant='ghost'
          className="nav-button poppins-medium"
          leftIcon={<IoSettingsOutline />}>
          Satu Peta
        </Button>
      </a>
    </ButtonGroup>
  )
}

export default NavLink;