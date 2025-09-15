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
} from "@chakra-ui/react";
import axios from "axios";
import { 
  GrView, 
  FiRefreshCw, 
  FiDownload, 
  FiInfo,
  FiCheckCircle,
  FiXCircle,
  FiClock
} from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";

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
      }, 200);

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

  const handleSyncAll = async () => {
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
        setSyncProgress(prev => Math.min(prev + 5, 95));
      }, 300);

      const response = await axios.post(`/v1/integration/sync-all`,
        { targets: selectedSystems, limit: 100 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      clearInterval(interval);
      setSyncProgress(100);
      
      setSyncResults(response.data);
      
      toast({
        title: response.data.success ? 'Sinkronisasi massal berhasil' : 'Sinkronisasi massal selesai dengan beberapa kesalahan',
        description: response.data.message,
        status: response.data.success ? 'success' : 'warning',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      clearInterval(interval);
      setSyncProgress(0);
      
      toast({
        title: 'Sinkronisasi massal gagal',
        description: error.message || 'Terjadi kesalahan saat sinkronisasi massal',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // SIPD specific functions
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
        response = await axios.get(`/v1/integration/fetch/sipd/data?kodepemda=${kodepemda}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setSipdData(response.data);
      
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

  // Function to get status badge based on verification status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Sudah Verifikasi':
        return <Badge colorScheme="green" fontSize="0.8em"><Icon as={FiCheckCircle} mr={1} />Terverifikasi</Badge>;
      case 'Ditolak':
        return <Badge colorScheme="red" fontSize="0.8em"><Icon as={FiXCircle} mr={1} />Ditolak</Badge>;
      case 'Belum Verifikasi':
      default:
        return <Badge colorScheme="yellow" fontSize="0.8em"><Icon as={FiClock} mr={1} />Menunggu</Badge>;
    }
  };

  const verifyData = async (id) => {};

  return (
    <Box className="assets-table">
      <Box mb={4} textAlign="right">
        <Button 
          leftIcon={<FiRefreshCw />} 
          colorScheme="teal" 
          onClick={handleSyncAll}
          size="sm"
          mr={2}
        >
          Sinkron Semua
        </Button>
        <Button 
          leftIcon={<FiDownload />} 
          colorScheme="blue" 
          onClick={onIntegrationOpen}
          size="sm"
        >
          Data SIPD
        </Button>
      </Box>
      <Box overflowX="auto">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Nama Data</Th>
              <Th>Tipe File</Th>
              <Th>Data Publik</Th>
              <Th>Tanggal Unggah</Th>
              {user.role === "Admin" ? (
                <Th>Terakhir Diubah</Th>
              ) : (
                <Th>Status</Th>
              )}
              {user.role === "Admin" ||
              user.role === "admin" ||
              user.role === "Operator" ? (
                <Th>Aksi</Th>
              ) : user.role === "Validator" ? (
                <>
                  <Th>Verifikasi</Th>
                  <Th>Tolak</Th>
                </>
              ) : null}
              <Th>Lihat</Th>
              {(user.role === "Admin" || user.role === "admin" || user.role === "Operator") && (
                <Th>Integrasi</Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {files.map((file) => (
              <Tr key={file._id}>
                <Td>
                  <Text fontWeight="medium">{file.name}</Text>
                  <Text fontSize="sm" color="gray.500">{file.temadataset}</Text>
                </Td>
                <Td>
                  <Badge colorScheme="blue">{file.fileType}</Badge>
                </Td>
                <Td>
                  {file.isPublic ? (
                    <Badge colorScheme="green">Ya</Badge>
                  ) : (
                    <Badge colorScheme="red">Tidak</Badge>
                  )}
                </Td>
                <Td>
                  {new Date(file.metaData.createdAt).toLocaleDateString("id", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Td>
                {user.role === "Admin" ? (
                  <Td>
                    {new Date(file.metaData.updatedAt).toLocaleDateString("id", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Td>
                ) : (
                  <Td>{getStatusBadge(file.StatusVerifikasi)}</Td>
                )}
                {user.role === "Admin" ||
                user.role === "admin" ||
                user.role === "Operator" ? (
                  <Td>
                    <IconButton
                      icon={<MdDeleteForever />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => DeleteClicked(file._id)}
                      aria-label="Hapus file"
                    />
                  </Td>
                ) : (
                  <>
                    <Td>
                      <IconButton
                        icon={<FaCheckCircle />}
                        colorScheme="green"
                        size="sm"
                        onClick={() => VerifyClicked(file._id)}
                        aria-label="Verifikasi data"
                      />
                    </Td>
                    <Td>
                      <IconButton
                        icon={<FaUndoAlt />}
                        colorScheme="red"
                        size="sm"
                        onClick={() => RejectClicked(file._id)}
                        aria-label="Tolak data"
                      />
                    </Td>
                  </>
                )}
                <Td>
                  <Tooltip label="Lihat file" placement="top">
                    <IconButton
                      icon={<GrView />}
                      colorScheme="gray"
                      size="sm"
                      onClick={() => downloadFile(file._id)}
                      aria-label="Lihat file"
                    />
                  </Tooltip>
                </Td>
                {(user.role === "Admin" || user.role === "admin" || user.role === "Operator") && (
                  <Td>
                    <Tooltip label="Integrasi data" placement="top">
                      <IconButton
                        icon={<FiRefreshCw />}
                        colorScheme="teal"
                        size="sm"
                        onClick={() => {
                          setFileId(file._id);
                          onIntegrationOpen();
                        }}
                        aria-label="Integrasi data"
                      />
                    </Tooltip>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <CustomAlert
        onClose={onClose}
        isOpen={isOpen}
        onDelete={handleDelete}
        onVerify={handleVerify}
        onReject={handleReject}
        DialogBody={dialogbody}
        DialogHeader={dialogheader}
      />
      
      {/* Integration Modal */}
      <Modal isOpen={isIntegrationOpen} onClose={onIntegrationClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Integrasi Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Tabs>
              <TabList>
                <Tab>Sinkronisasi</Tab>
                <Tab>Operasi SIPD</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {isSyncing ? (
                    <VStack spacing={4}>
                      <Text>Sedang menyinkronkan...</Text>
                      <Progress value={syncProgress} hasStripe isAnimated width="100%" colorScheme="teal" />
                      <Spinner color="teal.500" />
                    </VStack>
                  ) : syncResults ? (
                    <VStack spacing={4} align="start">
                      <Text fontWeight="bold">{syncResults.message}</Text>
                      {syncResults.results && syncResults.results.map((result, index) => (
                        <Box key={index} p={3} borderWidth="1px" borderRadius="md" width="100%" bg={result.success ? "green.50" : "red.50"}>
                          <Text fontWeight="semibold">{result.system.toUpperCase()}:</Text>
                          <Text>{result.message}</Text>
                          {!result.success && (
                            <Text color="red.500" fontSize="sm" mt={1}>Error: {result.error}</Text>
                          )}
                        </Box>
                      ))}
                      <Button onClick={() => setSyncResults(null)} colorScheme="teal">Sinkron File Lain</Button>
                    </VStack>
                  ) : (
                    <VStack spacing={4} align="start">
                      <Text>Pilih sistem target untuk sinkronisasi:</Text>
                      <CheckboxGroup 
                        value={selectedSystems} 
                        onChange={setSelectedSystems}
                      >
                        <VStack align="start">
                          <Checkbox value="splp">SPLP Satu Data Indonesia</Checkbox>
                          <Checkbox value="sipd">SIPD e-walidata</Checkbox>
                        </VStack>
                      </CheckboxGroup>
                      <Button 
                        leftIcon={<FiRefreshCw />}
                        colorScheme="teal" 
                        onClick={() => handleSyncSingle(fileId)}
                        isDisabled={selectedSystems.length === 0}
                      >
                        Sinkron File Ini
                      </Button>
                    </VStack>
                  )}
                </TabPanel>
                <TabPanel>
                  <VStack spacing={4} align="start">
                    <FormControl>
                      <FormLabel>Kode Pemda</FormLabel>
                      <Input 
                        value={kodepemda} 
                        onChange={(e) => setKodepemda(e.target.value)} 
                        placeholder="Masukkan kode pemda"
                      />
                    </FormControl>
                    
                    <VStack spacing={2} width="100%">
                      <Button 
                        leftIcon={<FiDownload />}
                        colorScheme="blue" 
                        onClick={() => handleFetchSipdData('regular')}
                        isLoading={isFetching}
                        loadingText="Mengambil"
                        width="100%"
                      >
                        Ambil Data SIPD
                      </Button>
                      <Button 
                        leftIcon={<FiCheckCircle />}
                        colorScheme="green" 
                        onClick={() => handleFetchSipdData('final')}
                        isLoading={isFetching}
                        loadingText="Mengambil"
                        width="100%"
                      >
                        Ambil Data Final
                      </Button>
                      <Button 
                        leftIcon={<FiInfo />}
                        colorScheme="orange" 
                        onClick={() => handleFetchSipdData('reference')}
                        isLoading={isFetching}
                        loadingText="Mengambil"
                        width="100%"
                      >
                        Ambil Data Referensi
                      </Button>
                    </VStack>
                    
                    {sipdData && (
                      <Box borderWidth="1px" borderRadius="md" p={3} width="100%" bg="gray.50">
                        <Text fontWeight="bold" mb={2}>Data SIPD:</Text>
                        <Text fontSize="sm" whiteSpace="pre-wrap">{JSON.stringify(sipdData, null, 2)}</Text>
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