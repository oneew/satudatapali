import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Box, Flex, Button, Image, HStack, Container, IconButton, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import logoPali from '/pali.png';
import './headerStyle.css';

const Header = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (location.pathname.startsWith('/satudata')) {
    return null;
  }

  const navLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/opendata', label: 'Data' },
    { to: '/instansi', label: 'Instansi' },
    { to: '/prioritas', label: 'Data Prioritas' },
    { to: '/rencana-aksi', label: 'Rencana Aksi' }
  ];

  return (
    <Box
      bg="white"
      py={3}
      px={{ base: 4, md: 8 }}
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="1100"
    >
      <Container maxW="container.xl">
        <Flex alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <Link to="/">
            <HStack>
              <Image src={logoPali} alt="Logo Satu Data PALI" boxSize="45px" />
              <Box fontWeight="bold" fontSize="lg" color="teal.700">
                Satu Data PALI
              </Box>
            </HStack>
          </Link>

          {/* Desktop Navigation */}
          <HStack as="nav" spacing={{ base: 4, md: 6 }} display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <NavLink 
                key={link.to} 
                to={link.to} 
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {link.label}
              </NavLink>
            ))}
          </HStack>

          {/* Mobile Navigation Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="ghost"
            color="teal.700"
          />

          {/* Login Button */}
          <Link to="/satudata">
            <Button 
              colorScheme="teal" 
              variant="solid" 
              size="sm"
              display={{ base: 'none', md: 'flex' }}
            >
              Masuk
            </Button>
          </Link>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <Image src={logoPali} alt="Logo Satu Data PALI" boxSize="40px" />
              <Box fontWeight="bold" fontSize="lg" color="teal.700">
                Satu Data PALI
              </Box>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              {navLinks.map((link) => (
                <NavLink 
                  key={link.to} 
                  to={link.to} 
                  className={({ isActive }) => (isActive ? 'nav-link active mobile' : 'nav-link mobile')}
                  onClick={onClose}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/satudata" onClick={onClose}>
                <Button colorScheme="teal" variant="solid" width="100%">
                  Masuk
                </Button>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;