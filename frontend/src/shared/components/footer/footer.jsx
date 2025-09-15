import React from "react";
import {
  Box,
  Flex,
  Link,
  Text,
  Stack,
  Icon,
  Divider,
  Image,
  HStack,
} from "@chakra-ui/react";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import { BsBrowserChrome } from "react-icons/bs";

import "./footerStyle.css";
import "../../../index.css";

function Footer() {
  return (
    <Box className="footer">
      {/* Top Section */}
      <Flex className="footer-top">
        {/* Left Section */}
        <Stack spacing={4} className="footer-section">
          <HStack spacing={4}>
            <Image src="/sdi2.png" alt="Logo" className="main-logo" />
            <Image src="/diskominfo.png" alt="Logo" className="main-logo" />
          </HStack>
          <Text as="h6" className="footer-heading poppins-semibold">
            DATA-Ku di PALI
          </Text>
          <Link href="#" className="footer-link">
            Tentang
          </Link>
          <Link href="#" className="footer-link">
            Ketentuan Penggunaan
          </Link>
          <Link href="#" className="footer-link">
            Kebijakan Privasi
          </Link>
        </Stack>

        {/* Middle Right Section */}
        <Stack spacing={4} className="footer-section">
          <Text className="footer-heading poppins-semibold">
            Telusuri Sumber Data Lainnya
          </Text>
          <Stack spacing={2}>
            <Link 
              as='a' 
              href="https://sumsel.bps.go.id/id" 
              target="_blank" 
              className="footer-link"
            >
              BPS Sumsel
            </Link>
            <Link 
              as='a' 
              href="https://data.go.id/home" 
              target="_blank" 
              className="footer-link"
            >
              Satu Data Indonesia
            </Link>
            <Link 
              as='a' 
              href="https://gis-pbb.palikab.go.id/" 
              target="_blank" 
              className="footer-link"
            >
              Satu Peta Pali
            </Link>
          </Stack>
        </Stack>

        {/* Right Section */}
        <Stack spacing={4} className="footer-section">
          <Text className="footer-heading poppins-semibold">
            Ikuti Kami
          </Text>
          <Stack spacing={2}>
            <Link 
              as='a' 
              href="https://instagram.com" 
              target="_blank" 
              className="footer-link"
            >
              Instagram
            </Link>
            <Link 
              as='a' 
              href="https://facebook.com" 
              target="_blank" 
              className="footer-link"
            >
              Facebook
            </Link>
            <Link 
              as='a' 
              href="https://youtube.com" 
              target="_blank" 
              className="footer-link"
            >
              YouTube
            </Link>
          </Stack>
          
          <HStack className="social-icons" mt={2}>
            <Link 
              as='a' 
              href="https://facebook.com" 
              target="_blank" 
              className="social-icon"
            >
              <Icon as={FaFacebook} />
            </Link>
            <Link 
              as='a' 
              href="https://instagram.com" 
              target="_blank" 
              className="social-icon"
            >
              <Icon as={FaInstagram} />
            </Link>
            <Link 
              as='a' 
              href="https://youtube.com" 
              target="_blank" 
              className="social-icon"
            >
              <Icon as={FaYoutube} />
            </Link>
          </HStack>
        </Stack>
      </Flex>

      {/* Divider */}
      <Divider className="footer-divider" />

      {/* Bottom Section */}
      <Box className="footer-bottom">
        <Text className="footer-bottom-text">
          © 2024 <strong>DISKOMINFOSTAPER Kab. PALI</strong>.
        </Text>
        <Text className="footer-bottom-text">Versi 1.0.0</Text>
      </Box>
    </Box>
  );
}

export default Footer;