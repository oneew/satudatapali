import React from 'react';
import { Box, Container, Stack, Text, Image, HStack, VStack, Divider, Link } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import logoPali from '/pali.png';
import './footerStyle.css';

const Footer = () => {
  return (
    <Box className="footer">
      <Container maxW="container.xl" py={10}>
        <Stack 
          direction={{ base: 'column', md: 'row' }} 
          spacing={8} 
          justify="space-between"
          className="footer-top"
        >
          {/* Logo and Description */}
          <VStack spacing={4} align="flex-start" className="footer-section">
            <HStack>
              <Image src={logoPali} boxSize="50px" alt="Logo PALI" className="main-logo" />
              <Text fontSize="lg" fontWeight="bold" color="white" className="footer-logo-heading">
                Satu Data PALI
              </Text>
            </HStack>
            <Text fontSize="sm" className="footer-subtext">
              Dikelola oleh Dinas Komunikasi dan Informatika,<br />
              Statistik dan Persandian Kabupaten PALI.
            </Text>
          </VStack>

          {/* Contact Information */}
          <VStack spacing={2} align="flex-start" className="footer-section">
            <Text fontWeight="bold" color="white" className="footer-heading">
              Kontak Kami
            </Text>
            <HStack>
              <FaMapMarkerAlt />
              <Text fontSize="sm" className="footer-link">
                Jl. Merdeka, Talang Ubi, PALI
              </Text>
            </HStack>
            <HStack>
              <FaPhone />
              <Text fontSize="sm" className="footer-link">
                (0713) XXX XXX
              </Text>
            </HStack>
            <HStack>
              <FaEnvelope />
              <Text fontSize="sm" className="footer-link">
                diskominfo@palikab.go.id
              </Text>
            </HStack>
          </VStack>
          
          {/* Related Links */}
          <VStack spacing={2} align="flex-start" className="footer-section">
            <Text fontWeight="bold" color="white" className="footer-heading">
              Tautan Terkait
            </Text>
            <Link href="#" fontSize="sm" className="footer-link">
              Portal Pemkab PALI
            </Link>
            <Link href="#" fontSize="sm" className="footer-link">
              Satu Data Indonesia
            </Link>
            <Link href="#" fontSize="sm" className="footer-link">
              Kementerian Kominfo
            </Link>
            <Link href="#" fontSize="sm" className="footer-link">
              BPS Kabupaten PALI
            </Link>
          </VStack>

          {/* Social Media */}
          <VStack spacing={2} align="flex-start" className="footer-section">
            <Text fontWeight="bold" color="white" className="footer-heading">
              Ikuti Kami
            </Text>
            <HStack className="social-icons">
              <Link href="#" className="social-icon">
                <FaFacebook />
              </Link>
              <Link href="#" className="social-icon">
                <FaTwitter />
              </Link>
              <Link href="#" className="social-icon">
                <FaInstagram />
              </Link>
              <Link href="#" className="social-icon">
                <FaGlobe />
              </Link>
            </HStack>
          </VStack>
        </Stack>
      </Container>
      
      <Divider className="footer-divider" />
      
      <Box py={4} className="footer-bottom">
        <Text className="footer-bottom-text">
          © {new Date().getFullYear()} Dinas Komunikasi dan Informatika Kabupaten PALI. All rights reserved.
        </Text>
        <Text className="footer-bottom-text">
          Support by <Link href="#" color="yellow.400" fontWeight="semibold">Kominfo PALI</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;