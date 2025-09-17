import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Text,
  Heading,
  useToast,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Container,
} from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import "./Dashboard.css";

import LogoutButton from "./components/LogoutButton";
import QuickAccessCard from "./components/QuickAccessCard";
import AssetsTable from "./components/AssetsTable";
import CustomModal from "./components/CustomModal";
import RegisterUser from "./components/RegisterUser";
import DeleteUser from "./components/DeleteUser";
import UploadData from "./components/UploadData";
import EditFile from "./components/EditFile";
import SipdIntegrationPanel from "./components/SipdIntegrationPanel";
import Sidebar from "./components/Sidebar";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: null });
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("/v1/dashboard/files", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(response.data);
      } catch (err) {
        console.error("Error fetching files", err);
        toast({
          title: "Error fetching files",
          description: "Failed to load files. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchFiles();
  }, [token, toast]);

  const handleOpenModal = (title, body) => {
    setModalContent({ title, body });
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (fileId) => {
    try {
      const response = await axios.delete(`/v1/files/delete/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.status === 200) {
        // Remove the deleted file from the state
        setFiles(files.filter(file => file._id !== fileId));
        
        toast({
          title: "File deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to delete file");
      }
    } catch (error) {
      toast({
        title: "Error deleting file",
        description: error.message || "Failed to delete file. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter files based on search term
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.temadataset.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.metaData.produsen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Flex minH="100vh" bg="gray.50">
      {/* Sidebar for larger screens */}
      <Box display={{ base: 'none', md: 'block' }} w="240px" flexShrink={0}>
        <Sidebar />
      </Box>
      
      {/* Mobile menu button */}
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        position="fixed"
        top="20px"
        left="20px"
        zIndex="1000"
        colorScheme="teal"
        borderRadius="full"
        boxShadow="md"
      />
      
      {/* Mobile sidebar drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="240px">
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex alignItems="center">
              <Box
                bg="teal.500"
                borderRadius="md"
                p={2}
                mr={3}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="lg" fontWeight="bold" color="white">
                  SD
                </Text>
              </Box>
              <Text>Admin Panel</Text>
            </Flex>
          </DrawerHeader>
          <DrawerBody p={0}>
            <Sidebar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      
      {/* Main content */}
      <Box 
        flex="1" 
        ml={{ base: 0, md: "240px" }} 
        mt={{ base: "60px", md: 0 }}
        bg="gray.50"
        minH="100vh"
        transition="margin 0.3s ease"
      >
        <Box 
          bg="white" 
          boxShadow="sm" 
          py={4} 
          px={6}
          position="sticky"
          top="0"
          zIndex="999"
        >
          <Flex 
            justify="space-between" 
            align="center" 
            flexWrap="wrap"
            gap={4}
          >
            <Heading as="h1" size="lg" color="teal.600">
              Dashboard Admin
            </Heading>
            
            <InputGroup maxW="400px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Cari file, tema, atau produsen..."
                value={searchTerm}
                onChange={handleSearch}
                bg="gray.50"
                borderRadius="lg"
                borderColor="gray.200"
                _focus={{
                  borderColor: "teal.500",
                  boxShadow: "0 0 0 1px teal.500",
                }}
              />
            </InputGroup>
            
            <Flex align="center" gap={4}>
              <Box textAlign="right">
                <Text fontWeight="semibold" color="gray.700">
                  {user.user}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {user.role === "Admin" || user.role === "admin" ? "Administrator" : "Operator"}
                </Text>
              </Box>
              <LogoutButton />
            </Flex>
          </Flex>
        </Box>

        <Container maxW="container.xl" py={6}>
          {/* Quick Access Section */}
          <Box mb={8}>
            <Heading as="h2" size="md" mb={4} color="gray.700">
              Akses Cepat
            </Heading>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
              gap={6}
            >
              {user.role === "Admin" || user.role === "admin" ? (
                <>
                  <QuickAccessCard
                    title="Hapus Pengguna"
                    details="Klik untuk menghapus pengguna dari sistem"
                    onOpen={() => handleOpenModal("Hapus Pengguna", <DeleteUser />)}
                  />
                  <QuickAccessCard
                    title="Daftar Pengguna"
                    details="Klik untuk menambahkan pengguna baru"
                    onOpen={() => handleOpenModal("Daftar Pengguna", <RegisterUser />)}
                  />
                </>
              ) : null}
              
              {user.role === "Operator" && (
                <>
                  <QuickAccessCard
                    title="Edit Data"
                    details="Klik untuk mengubah data yang ada di server"
                    onOpen={() => handleOpenModal("Edit Data", <EditFile />)}
                  />
                  <QuickAccessCard
                    title="Unggah Data"
                    details="Klik untuk mengunggah data baru ke server"
                    onOpen={() => handleOpenModal("Unggah Data", <UploadData />)}
                  />
                </>
              )}
            </Grid>
          </Box>

          {/* SIPD Integration Panel for Admin */}
          {(user.role === "Admin" || user.role === "admin") && (
            <Box mb={8}>
              <Heading as="h2" size="md" mb={4} color="gray.700">
                Integrasi SIPD
              </Heading>
              <Box bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
                <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem border="none">
                    <h2>
                      <AccordionButton 
                        py={4} 
                        px={6} 
                        _hover={{ bg: "teal.50" }}
                        borderRadius="lg"
                      >
                        <Box flex="1" textAlign="left">
                          <Text fontSize="lg" fontWeight="bold">Panel Integrasi SIPD</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={6} px={6}>
                      <SipdIntegrationPanel />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Box>
          )}

          <CustomModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            content={modalContent}
          />

          {/* Assets Table */}
          <Box>
            <Heading as="h2" size="md" mb={4} color="gray.700">
              Data File
            </Heading>
            <Box bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200" p={2}>
              <AssetsTable files={filteredFiles} onDelete={handleDelete} />
            </Box>
          </Box>
        </Container>
      </Box>
    </Flex>
  );
};

export default Dashboard;