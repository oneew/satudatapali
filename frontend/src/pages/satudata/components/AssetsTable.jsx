import {
  Box,
  IconButton,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Text,
  Checkbox,
  CheckboxGroup,
  Spinner,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  FormControl,
  FormLabel,
  Tooltip,
  Icon,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
// --- PERBAIKAN DI SINI ---
import { GrView } from "react-icons/gr"; // Icon dari Grommet-Icons
import { 
  FiRefreshCw, 
  FiDownload, 
  FiInfo,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEdit,
  FiTrash2
} from "react-icons/fi"; // Icon dari Feather Icons
import { MdDeleteForever } from "react-icons/md"; // Icon dari Material Design
import { FaCheckCircle, FaUndoAlt } from "react-icons/fa"; // Icon dari Font Awesome
// --- AKHIR PERBAIKAN ---

import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

import CustomAlert from "./custom alert/CustomAlert";

const AssetsTable = ({ files, onDelete }) => {
  const { user, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [fileId, setFileId] = useState(null);
  const [dialogbody, setDialogBody] = useState("");
  const [dialogheader, setDialogHeader] = useState("");
  const { isOpen: isIntegrationOpen, onOpen: onIntegrationOpen, onClose: onIntegrationClose } = useDisclosure();
  const [selectedSystems, setSelectedSystems] = useState(['splp', 'sipd']);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncResults, setSyncResults] = useState(null);
  const [kodepemda, setKodepemda] = useState('1612');
  const [sipdData, setSipdData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const toast = useToast();

  const DeleteClicked = (fileId) => {
    setIsOpen(true);
    setFileId(fileId);
    setDialogHeader("Hapus Data");
    setDialogBody(
      "File ini akan dihapus secara permanen dari Server, apakah anda yakin?"
    );
  };

  const VerifyClicked = (fileId) => {
    setIsOpen(true);
    setFileId(fileId);
    setDialogHeader("Verifikasi Data");
    setDialogBody("Verifikasi Data?");
  };

  const RejectClicked = (fileId) => {
    setIsOpen(true);
    setFileId(fileId);
    setDialogHeader("Tolak Data");
    setDialogBody("Tolak Data dan Kembalikan ke Operator?");
  };

  const onClose = () => {
    setIsOpen(false);
    setFileId(null);
    setDialogBody("");
  };

  const handleDelete = () => {
    if (fileId) {
      onDelete(fileId);
      onClose();
    }
  };

  const handleVerify = async () => {
    if (fileId) {
      try {
        const response = await axios.post(`/v1/files/verify/${fileId}`, {}, {
          headers: {Authorization: `Bearer ${token}`}
        });
        if (response.status === 200) {
          toast({
            title: "Data Berhasil Di Verifikasi",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
          // Refresh the files list
          window.location.reload();
        }
      } catch (error) {
        toast({
          title: "Gagal Verifikasi Data",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      } finally {
        onClose();
      }
    }
  };

  const handleReject = async () => {
    if (fileId) {
      try {
        const response = await axios.post(`/v1/files/reject/${fileId}`, {}, {
          headers: {Authorization: `Bearer ${token}`}
        });
        if (response.status === 200) {
          toast({
            title: "Data Berhasil Ditolak",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
          // Refresh the files list
          window.location.reload();
        }
      } catch (error) {
        toast({
          title: "Gagal Tolak Data",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      } finally {
        onClose();
      }
    }
  };

  const downloadFile = async (id) => {
    try {
      const response = await axios.get(`/v1/download/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `file_${id}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("Error downloading file", err);
      toast({
        title: "Gagal mengunduh file",
        description: "Terjadi kesalahan saat mengunduh file",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Integration functions
  const handleSyncSingle = async (fileId) => {
    if (selectedSystems.length === 0) {
      toast({
        title: 'Tidak ada sistem yang dipilih',
        description: 'Silakan pilih setidaknya satu sistem untuk disinkronkan',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSyncing(true);
    setSyncProgress(0);
    setSyncResults(null);

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setSyncProgress(prev => Math.min(prev + 10, 90));
      }, 300);

      const response = await axios.post(`/v1/integration/sync/${fileId}`,
        { targets: selectedSystems },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      clearInterval(interval);
      setSyncProgress(100);
      
      setSyncResults(response.data);
      
      toast({
        title: response.data.success ? 'Sinkronisasi berhasil' : 'Sinkronisasi selesai dengan beberapa kesalahan',
        description: response.data.message,
        status: response.data.success ? 'success' : 'warning',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      clearInterval(interval);
      setSyncProgress(0);
      
      toast({
        title: 'Sinkronisasi gagal',
        description: error.message || 'Terjadi kesalahan saat sinkronisasi',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Handle fetching data from SIPD
  const handleFetchSipdData = async (type) => {
    setIsFetching(true);
    setSipdData(null);
    
    try {
      let response;
      if (type === 'final') {
        response = await axios.get(`/v1/integration/sipd/final?kodepemda=${kodepemda}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else if (type === 'reference') {
        response = await axios.get(`/v1/integration/sipd/reference?kodepemda=${kodepemda}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // For regular data, we'll use final data as default
        response = await axios.get(`/v1/integration/sipd/final?kodepemda=${kodepemda}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setSipdData({ type, data: response.data });
      
      toast({
        title: 'Data berhasil diambil',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Gagal mengambil data',
        description: error.message || 'Terjadi kesalahan saat mengambil data',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsFetching(false);
    }
  };

  // Get status badge based on verification status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Sudah Verifikasi':
        return <Badge colorScheme="green">Terverifikasi</Badge>;
      case 'Belum Verifikasi':
        return <Badge colorScheme="yellow">Belum Diverifikasi</Badge>;
      case 'Ditolak':
        return <Badge colorScheme="red">Ditolak</Badge>;
      default:
        return <Badge colorScheme="gray">Unknown</Badge>;
    }
  };

  // Get action buttons based on user role and file status
  const getActionButtons = (file) => {
    if (user.role === "Admin" || user.role === "admin") {
      if (file.StatusVerifikasi === "Belum Verifikasi") {
        return (
          <Flex gap={2}>
            <Tooltip label="Verifikasi" placement="top">
              <IconButton
                icon={<FiCheckCircle />}
                colorScheme="green"
                size="sm"
                onClick={() => VerifyClicked(file._id)}
                aria-label="Verifikasi"
              />
            </Tooltip>
            <Tooltip label="Tolak" placement="top">
              <IconButton
                icon={<FiXCircle />}
                colorScheme="red"
                size="sm"
                onClick={() => RejectClicked(file._id)}
                aria-label="Tolak"
              />
            </Tooltip>
            <Tooltip label="Edit" placement="top">
              <IconButton
                icon={<FiEdit />}
                colorScheme="blue"
                size="sm"
                onClick={() => {
                  // Implement edit functionality
                }}
                aria-label="Edit"
              />
            </Tooltip>
            <Tooltip label="Hapus" placement="top">
              <IconButton
                icon={<FiTrash2 />}
                colorScheme="red"
                variant="outline"
                size="sm"
                onClick={() => DeleteClicked(file._id)}
                aria-label="Hapus"
              />
            </Tooltip>
            <Tooltip label="Download" placement="top">
              <IconButton
                icon={<FiDownload />}
                colorScheme="teal"
                size="sm"
                onClick={() => downloadFile(file._id)}
                aria-label="Download"
              />
            </Tooltip>
          </Flex>
        );
      } else if (file.StatusVerifikasi === "Sudah Verifikasi") {
        return (
          <Flex gap={2}>
            <Tooltip label="Download" placement="top">
              <IconButton
                icon={<FiDownload />}
                colorScheme="teal"
                size="sm"
                onClick={() => downloadFile(file._id)}
                aria-label="Download"
              />
            </Tooltip>
            <Tooltip label="Sinkronisasi" placement="top">
              <IconButton
                icon={<FiRefreshCw />}
                colorScheme="purple"
                size="sm"
                onClick={() => {
                  setFileId(file._id);
                  onIntegrationOpen();
                }}
                aria-label="Sinkronisasi"
              />
            </Tooltip>
            <Tooltip label="Hapus" placement="top">
              <IconButton
                icon={<FiTrash2 />}
                colorScheme="red"
                variant="outline"
                size="sm"
                onClick={() => DeleteClicked(file._id)}
                aria-label="Hapus"
              />
            </Tooltip>
          </Flex>
        );
      } else {
        return (
          <Flex gap={2}>
            <Tooltip label="Download" placement="top">
              <IconButton
                icon={<FiDownload />}
                colorScheme="teal"
                size="sm"
                onClick={() => downloadFile(file._id)}
                aria-label="Download"
              />
            </Tooltip>
            <Tooltip label="Hapus" placement="top">
              <IconButton
                icon={<FiTrash2 />}
                colorScheme="red"
                variant="outline"
                size="sm"
                onClick={() => DeleteClicked(file._id)}
                aria-label="Hapus"
              />
            </Tooltip>
          </Flex>
        );
      }
    } else if (user.role === "Operator") {
      if (file.StatusVerifikasi === "Ditolak") {
        return (
          <Flex gap={2}>
            <Tooltip label="Edit" placement="top">
              <IconButton
                icon={<FiEdit />}
                colorScheme="blue"
                size="sm"
                onClick={() => {
                  // Implement edit functionality
                }}
                aria-label="Edit"
              />
            </Tooltip>
            <Tooltip label="Hapus" placement="top">
              <IconButton
                icon={<FiTrash2 />}
                colorScheme="red"
                variant="outline"
                size="sm"
                onClick={() => DeleteClicked(file._id)}
                aria-label="Hapus"
              />
            </Tooltip>
          </Flex>
        );
      } else {
        return (
          <Flex gap={2}>
            <Tooltip label="Download" placement="top">
              <IconButton
                icon={<FiDownload />}
                colorScheme="teal"
                size="sm"
                onClick={() => downloadFile(file._id)}
                aria-label="Download"
              />
            </Tooltip>
            <Tooltip label="Hapus" placement="top">
              <IconButton
                icon={<FiTrash2 />}
                colorScheme="red"
                variant="outline"
                size="sm"
                onClick={() => DeleteClicked(file._id)}
                aria-label="Hapus"
              />
            </Tooltip>
          </Flex>
        );
      }
    }
    return null;
  };

  return (
    <Box className="assets-table" overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nama File</Th>
            <Th>Tema Dataset</Th>
            <Th>Produsen</Th>
            <Th>Tipe File</Th>
            <Th>Status</Th>
            <Th>Tanggal Upload</Th>
            <Th>Aksi</Th>
          </Tr>
        </Thead>
        <Tbody>
          {files.map((file) => (
            <Tr key={file._id}>
              <Td>
                <Text fontWeight="semibold">{file.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  {file.filename}
                </Text>
              </Td>
              <Td>{file.temadataset}</Td>
              <Td>{file.metaData.produsen}</Td>
              <Td>
                <Badge colorScheme="blue">{file.fileType}</Badge>
              </Td>
              <Td>{getStatusBadge(file.StatusVerifikasi)}</Td>
              <Td>
                {new Date(file.metaData.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Td>
              <Td className="action-buttons">
                {getActionButtons(file)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Alert Modal */}
      <CustomAlert
        isOpen={isOpen}
        onClose={onClose}
        dialogbody={dialogbody}
        dialogheader={dialogheader}
        onConfirm={
          dialogheader === "Hapus Data"
            ? handleDelete
            : dialogheader === "Verifikasi Data"
            ? handleVerify
            : handleReject
        }
      />

      {/* Integration Modal */}
      <Modal isOpen={isIntegrationOpen} onClose={onIntegrationClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sinkronisasi Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Tabs variant="enclosed">
              <TabList mb="1em">
                <Tab>Sinkronisasi</Tab>
                <Tab>Operasi SIPD</Tab>
              </TabList>
              <TabPanels>
                {/* Sinkronisasi Panel */}
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Text>
                      Pilih sistem eksternal untuk menyinkronkan file ini:
                    </Text>
                    
                    <CheckboxGroup 
                      value={selectedSystems} 
                      onChange={setSelectedSystems}
                    >
                      <VStack align="start" spacing={2}>
                        <Checkbox value="splp">SPLP Satu Data Indonesia</Checkbox>
                        <Checkbox value="sipd">SIPD E-Walidata</Checkbox>
                      </VStack>
                    </CheckboxGroup>
                    
                    {isSyncing ? (
                      <VStack spacing={4}>
                        <Text>Sedang menyinkronkan...</Text>
                        <Progress value={syncProgress} hasStripe isAnimated width="100%" colorScheme="teal" />
                      </VStack>
                    ) : syncResults ? (
                      <Box p={4} bg={syncResults.success ? "green.50" : "red.50"} borderRadius="md">
                        <Text fontWeight="bold" color={syncResults.success ? "green.700" : "red.700"}>
                          {syncResults.success ? "Sinkronisasi Berhasil!" : "Sinkronisasi Gagal!"}
                        </Text>
                        <Text mt={2}>{syncResults.message}</Text>
                        {syncResults.results && (
                          <Box mt={2}>
                            <Text fontWeight="semibold">Detail:</Text>
                            {syncResults.results.map((result, index) => (
                              <Box key={index} p={2} my={1} borderWidth="1px" borderRadius="md" bg={result.success ? "green.100" : "red.100"}>
                                <Text fontWeight="medium">{result.system?.toUpperCase() || 'SISTEM'}</Text>
                                <Text fontSize="sm">{result.message}</Text>
                                {result.error && (
                                  <Text color="red.700" fontSize="xs">Error: {result.error}</Text>
                                )}
                              </Box>
                            ))}
                          </Box>
                        )}
                      </Box>
                    ) : (
                      <Button 
                        leftIcon={<FiRefreshCw />}
                        colorScheme="teal" 
                        onClick={() => handleSyncSingle(fileId)}
                        width="100%"
                      >
                        Sinkron File dengan Sistem Eksternal
                      </Button>
                    )}
                  </VStack>
                </TabPanel>
                
                {/* Operasi SIPD Panel */}
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>Kode Pemda</FormLabel>
                      <Input 
                        value={kodepemda} 
                        onChange={(e) => setKodepemda(e.target.value)} 
                        placeholder="Masukkan kode pemda"
                      />
                    </FormControl>
                    
                    <Flex gap={2} wrap="wrap">
                      <Button 
                        leftIcon={<FiDownload />}
                        colorScheme="blue" 
                        onClick={() => handleFetchSipdData('regular')}
                        isLoading={isFetching}
                        loadingText="Mengambil"
                        size="sm"
                      >
                        Data SIPD
                      </Button>
                      <Button 
                        leftIcon={<FiCheckCircle />}
                        colorScheme="green" 
                        onClick={() => handleFetchSipdData('final')}
                        isLoading={isFetching}
                        loadingText="Mengambil"
                        size="sm"
                      >
                        Data Final
                      </Button>
                      <Button 
                        leftIcon={<FiInfo />}
                        colorScheme="orange" 
                        onClick={() => handleFetchSipdData('reference')}
                        isLoading={isFetching}
                        loadingText="Mengambil"
                        size="sm"
                      >
                        Data Referensi
                      </Button>
                    </Flex>
                    
                    {isFetching && (
                      <Flex justify="center" align="center" py={4}>
                        <Spinner size="lg" />
                        <Text ml={3}>Mengambil data dari SIPD...</Text>
                      </Flex>
                    )}
                    
                    {sipdData && (
                      <Box mt={4}>
                        <Text fontWeight="bold" mb={2}>
                          {sipdData.type === 'final' ? 'Data Final SIPD' : 
                           sipdData.type === 'reference' ? 'Data Referensi SIPD' : 'Data SIPD'}
                        </Text>
                        <Box maxH="200px" overflowY="auto" p={2} borderWidth="1px" borderRadius="md" bg="gray.50">
                          <pre style={{ fontSize: '0.8em' }}>
                            {JSON.stringify(sipdData.data, null, 2)}
                          </pre>
                        </Box>
                      </Box>
                    )}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AssetsTable;