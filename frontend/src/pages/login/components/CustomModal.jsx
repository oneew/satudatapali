import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Link,
  Box,
  Image,
  VStack,
} from "@chakra-ui/react";
import logoPali from "/pali.png";

function CustomModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent 
        borderRadius="2xl" 
        overflow="hidden"
        boxShadow="2xl"
      >
        <ModalHeader 
          bg="green.500" 
          color="white"
          textAlign="center"
          py={6}
        >
          <VStack spacing={3}>
            <Image 
              src={logoPali} 
              alt="Logo Satu Data PALI" 
              boxSize="50px"
              borderRadius="full"
              border="2px solid"
              borderColor="white"
            />
            <Text fontSize="2xl" fontWeight="bold">
              Satu Data PALI
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody py={8} px={6}>
          <Text fontSize="lg" color="gray.700" textAlign="center" mb={6}>
            Jika Anda Belum Punya Akun
          </Text>
          <Box 
            bg="gray.50" 
            borderRadius="lg" 
            p={6}
            border="1px solid"
            borderColor="gray.200"
          >
            <Text className="text" mb={4}>
              Anda harus mendaftarkan diri melalui email resmi{" "}
              <Link 
                color="green.500" 
                fontWeight="semibold"
                href="mailto:diskominfo@pallikab.go.id"
              >
                diskominfo@pallikab.go.id
              </Link>{" "}
              untuk mendapatkan akses Dashboard ke Satu Data PALI.
            </Text>
            <Text className="text">
              Persyaratan untuk mendaftarkan diri akan diinformasikan lebih lanjut
              pada update selanjutnya.
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter bg="gray.50" justifyContent="center" py={4}>
          <Button 
            onClick={onClose}
            bg="green.500"
            color="white"
            size="md"
            fontWeight="bold"
            borderRadius="lg"
            px={8}
            _hover={{
              bg: "green.600",
              transform: "translateY(-2px)",
            }}
            transition="all 0.3s ease"
          >
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;