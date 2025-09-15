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
} from "@chakra-ui/react";
import { MdLock } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import "../../shared/dist/css/bootstrap.min.css";
import CustomModal from "./components/CustomModal";

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.50"
    >
      <Box
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        w={["90%", "550px"]}
        boxSizing="border-box"
      >
        <VStack spacing={4} align="stretch">
          <Heading size="lg" textAlign="center">
            Masuk ke Satu Data PALI
          </Heading>

          {error && <Text color="red.500" textAlign="center">{error}</Text>}

          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="username">Username</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaUser color="gray.500" />}
                />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdLock color="gray.500" />}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              w="full"
              mt={6}
              className="btn btn-primary"
            >
              Login
            </Button>
          </form>

          <Box textAlign="center" mt={4}>
            <Button onClick={HandleModalOpen} className="text-primary">
              Belum Punya Akun?
            </Button>
          </Box>
        </VStack>
      </Box>
      <CustomModal isOpen={showModal} onClose={HandleModalClose} />
    </Box>
  );
}

export default Login;
