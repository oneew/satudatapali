import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Heading,
  useBreakpointValue,
  InputGroup,
  InputLeftElement,
  Image,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { MdLock } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import CustomModal from "./components/CustomModal";
import logoPali from "/pali.png";

function Login() {
  const navigate = useNavigate();
  const { login, autoLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userdata = localStorage.getItem("userData");
    if (userdata) {
    autoLogin();
    navigate('/satudata/dashboard');} else {
      return undefined;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
        setError(null); // Reset error state

        try {
            await login(username, password);
            navigate('/satudata/dashboard'); // Adjust based on your routing
        } catch (err) {
          if (err.response) {
            setError(err.response.data.message || "An error occurred. Please try again.");
        } else if (err.request) {
            // The request was made but no response was received
            setError("No response from the server. Please check your network connection.");
        } else {
            // Something happened in setting up the request that triggered an Error
            setError(err.message);
        }
        }
};

    const HandleModalOpen = () => {
      setShowModal(true);
    };
    const HandleModalClose = () => {
      setShowModal(false)
      };

  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
      bg="white"
      p={4}
    >
      <Box
        bg="green.500"
        p={8}
        borderRadius="2xl"
        boxShadow="2xl"
        width="100%"
        maxWidth="450px"
        textAlign="center"
      >
        {/* Logo and Title Section */}
        <VStack spacing={6} mb={6}>
          <HStack spacing={4} justify="center">
            <Image 
              src={logoPali} 
              alt="Logo Satu Data PALI" 
              height="10rem"
              width="auto"
            />
          </HStack>
          <Box>
            <Heading as="h1" size="xl" color="white" fontWeight="bold">
              SatuData PALI
            </Heading>
          </Box>
        </VStack>

        {/* Login Form */}
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={5} align="stretch">
            {error && (
              <Box 
                bg="red.50" 
                borderRadius="md" 
                p={3} 
                mb={4}
              >
                <Text color="red.500" fontSize="sm" textAlign="center">
                  {error}
                </Text>
              </Box>
            )}

            <FormControl isRequired>
              <FormLabel htmlFor="username" color="white" fontWeight="medium">
                Username
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaUser color="green.500" />}
                />
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username Anda"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  bg="white"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "green.500",
                    boxShadow: "0 0 0 1px green.500",
                  }}
                  py={6}
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="password" color="white" fontWeight="medium">
                Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdLock color="green.500" />}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg="white"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "green.500",
                    boxShadow: "0 0 0 1px green.500",
                  }}
                  py={6}
                />
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              bg="white"
              color="green.500"
              size="lg"
              fontSize="md"
              fontWeight="bold"
              borderRadius="lg"
              mt={4}
              py={6}
              _hover={{
                bg: "green.100",
                transform: "translateY(-2px)",
                boxShadow: "lg"
              }}
              _active={{
                transform: "translateY(0)",
              }}
              transition="all 0.3s ease"
              boxShadow="md"
            >
              Masuk
            </Button>
          </VStack>
        </Box>
      </Box>
      <CustomModal isOpen={showModal} onClose={HandleModalClose} />
    </Flex>
  );
}

export default Login;