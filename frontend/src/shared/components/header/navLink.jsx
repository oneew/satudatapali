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
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();

  return (
    <ButtonGroup 
      direction={{ base: 'column', md: 'row' }} // Stack vertically on small screens, horizontally on medium and up
      spacing={2} 
      align="center"
    >
      <Link to={"/"}>
      <Button 
      color='white' 
      variant='ghost' 
      className="nav-button poppins-medium"
      isActive={location.pathname === '/'}
      leftIcon={<RiHome5Line />}
      >Dashboard Pali</Button>
      </Link>

      <Link to={"/opendata"}>
      <Button 
      color='white'
      variant='ghost' 
      className="nav-button poppins-medium"
      isActive={location.pathname === '/opendata'}
      leftIcon={<RiPieChart2Line />}>
        Open Data Pali</Button>
      </Link>

      <Link to={"/satudata"}>
      <Button 
      color='white'
      variant='ghost' 
      className="nav-button poppins-medium"
      isActive={location.pathname === '/satudata'}
      leftIcon={<FiBox />}>
        Satu Data Pali</Button>
      </Link>

      <a href='https://gis-pbb.palikab.go.id/' target='_blank' rel='noopener noreferrer'>
      <Button 
      color='white'
      variant='ghost'
      className="nav-button poppins-medium"
      leftIcon={<IoSettingsOutline />}>
        Satu Peta Pali</Button>
      </a>
    
    </ButtonGroup>
  )
}

export default NavLink