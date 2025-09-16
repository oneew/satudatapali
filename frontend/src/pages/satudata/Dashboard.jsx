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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
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

const Dashboard = () => {
  const { user, token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: null });
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();

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
    <Box className="dashboard-page">
      {/* Header */}
      <Flex className="dashboard-header">
        <Heading as="h1" className="dashboardlogo">
          Dashboard Satu Data
        </Heading>
        
        <InputGroup width={{ base: "100%", md: "50%" }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Cari file, tema, atau produsen..."
            size="lg"
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
          />
        </InputGroup>
        
        <Flex className="profile" gap={4}>
          <Text className="user-text">Selamat Datang, {" " + user.user}</Text>
          <LogoutButton />
        </Flex>
      </Flex>

      {/* Quick Access Section */}
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={6}
        className="quick-access"
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

      {/* SIPD Integration Panel for Admin */}
      {(user.role === "Admin" || user.role === "admin") && (
        <Box mt={6}>
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontSize="lg" fontWeight="bold">Panel Integrasi SIPD</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <SipdIntegrationPanel />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      )}

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={modalContent}
      />

      {/* Assets Table */}
      <AssetsTable files={filteredFiles} onDelete={handleDelete} />
    </Box>
  );
};

export default Dashboard;