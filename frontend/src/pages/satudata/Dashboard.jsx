import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Text,
  Heading,
  useToast,
  Flex,
  Input,
} from "@chakra-ui/react";
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

const Dashboard = () => {
  const { user, token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: null });
  const [files, setFiles] = useState([]);
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
    const response = await axios.delete(`/v1/files/delete/${fileId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status == 200) {
      toast({
        title: "File deleted successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error deleting file",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSearch = (query) => {
    // Add search logic
  };

  return (
    <Box className="dashboard-page">
      {/* Header */}
      <Flex className="dashboard-header">
        <Heading as="h1" size="lg" className="dashboardlogo">
          Dashboard Satu Data
        </Heading>
        <Input placeholder="Cari File" size="lg" className="search-bar" />
        <Flex className="profile" gap={4}>
          <Text className="user-text"> Selamat Datang, {" " + user.user}</Text>
          <LogoutButton />
        </Flex>
      </Flex>

      {/* Quick Access Section */}
      <Flex flexDirection='column' alignItems='center'>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        width='1200px'
        gap={4}
        className="quick-access"
      >
        {user.role === "Admin" || user.role === "admin" ? (
          <QuickAccessCard
            title="Delete User"
            details="Klik di sini untuk Menghapus User"
            onOpen={() => handleOpenModal("Delete User", <DeleteUser />)}
          />
        ) : (
          <></>
        )}
        {user.role === "Admin" || user.role === "admin" ? (
          <QuickAccessCard
            title="Register User"
            details="Klik di sini untuk menambahkan User baru"
            onOpen={() => handleOpenModal("Register User", <RegisterUser />)}
          />
        ) : (
          <></>
        )}
        {user.role === "Operator" ? (
          <QuickAccessCard
            title="Edit Data"
            details="Klik di sini untuk ubah Data yang ada di Server"
            onOpen={() => handleOpenModal("Edit Data", <EditFile />)}
          />
        ) : (
          <></>
        )}
        {user.role === "Operator" ? (<QuickAccessCard
          title="Unggah Data"
          details="Klik di sini untuk Unggah Data ke Server"
          onOpen={() => handleOpenModal("Upload Data", <UploadData />)}
        />): <></>}
      </Grid>
      </Flex>
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={modalContent}
      />

      {/* Assets Table */}
      <AssetsTable files={files} onDelete={handleDelete} />
    </Box>
  );
};

export default Dashboard;
