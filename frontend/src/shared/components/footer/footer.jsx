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
      <Flex
      className="footer-top"
      
      >
        {/* Left Section */}
        <Stack spacing={2} className="footer-section">
          <HStack>
            <Image src="shared/images/pali.png" alt="Logo" className="main-logo" />
            <Image src="shared/images/diskominfo.png" alt="Logo" className="main-logo" />
          </HStack>
          <Text as="h6" className="footer-heading poppins-semibold">
            DATA-Ku di PALI
          </Text>
          <Link as='a' href="#" className="footer-link">
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
        <Stack spacing={3} minW="200px">
          <Text className="footer-heading poppins-semibold">
            Telusuri Sumber Data Lainnya
          </Text>
          <Stack spacing={1}>
            <Link as='a' href="https://sumsel.bps.go.id/id" target="_blank" className="footer-link">
              BPS Sumsel
            </Link>
            <Link as='a' href="https://data.go.id/home" target="_blank" className="footer-link">
              Satu Data Indonesia
            </Link>
            <Link href="#" className="footer-link">
              News
            </Link>
          </Stack>
        </Stack>

        {/* Right Section */}
        <Stack spacing={3} minW="200px">
          <Text className="footer-heading poppins-semibold">
            Ikuti Kami
          </Text>
          <Stack spacing={1}>
            <Link href="#" className="footer-link">
              Instagram
            </Link>
            <Link href="#" className="footer-link">
              Facebook
            </Link>
          </Stack>
        </Stack>
      </Flex>

      {/* Divider */}
      <Divider className="footer-divider" my={6} />

      {/* Bottom Section */}
      <Box bg="teal.800" py={3}>
        <Flex
          bg="teal.800"
          className="footer-bottom"
          gap={4}
        >
          <Text className="footer-bottom-text">
            © 2024 <strong>DISKOMINFOSTAPER Kab. PALI</strong>.
          </Text>
          <Text className="footer-bottom-text">Versi 1.0.0</Text>
        </Flex>
      </Box>
    </Box>
  );
}

export default Footer;
