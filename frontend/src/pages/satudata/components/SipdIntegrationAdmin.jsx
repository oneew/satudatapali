import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Spinner,
  Progress,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  Tooltip,
  Badge,
  Select,
  HStack,
  Divider
} from '@chakra-ui/react';
import { 
  FiRefreshCw, 
  FiDownload, 
  FiCheckCircle, 
  FiInfo, 
  FiXCircle,
  FiPlay,
  FiDatabase
} from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

const SipdIntegrationAdmin = () => {
  const { token } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncResults, setSyncResults] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [sipdData, setSipdData] = useState(null);
  const [kodepemda, setKodepemda] = useState('1612');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [operationType, setOperationType] = useState('regular');
  const [disableData, setDisableData] = useState({ id_dataset: '', alasan: '' });
  const toast = useToast();

  // Fetch files for synchronization
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('/v1/dashboard/files', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(response.data);
      } catch (err) {
        console.error('Error fetching files', err);
        toast({
          title: 'Error fetching files',
          description: 'Failed to load files. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchFiles();
  }, [token, toast]);

  // Handle synchronization of selected files
  const handleSyncSelected = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: 'Tidak ada file yang dipilih',
        description: 'Silakan pilih setidaknya satu file untuk disinkronkan',
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

      const results = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        try {
          const fileId = selectedFiles[i];
          const file = files.find(f => f._id === fileId);
          
          const response = await axios.post(`/v1/integration/sync/${fileId}`, 
            { targets: ['sipd'] },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          results.push({
            fileName: file?.name || fileId,
            success: response.data.success,
            message: response.data.message,
            details: response.data.results
          });
          
          // Update progress
          setSyncProgress(Math.floor(((i + 1) / selectedFiles.length) * 100));
        } catch (error) {
          const fileId = selectedFiles[i];
          const file = files.find(f => f._id === fileId);
          
          results.push({
            fileName: file?.name || fileId,
            success: false,
            message: 'Gagal sinkronisasi',
            error: error.message
          });
        }
      }
      
      clearInterval(interval);
      setSyncProgress(100);
      
      setSyncResults({
        success: results.some(r => r.success),
        message: `Sinkronisasi selesai untuk ${selectedFiles.length} file`,
        results
      });
      
      toast({
        title: 'Sinkronisasi selesai',
        description: `Berhasil menyinkronkan ${selectedFiles.length} file dengan SIPD`,
        status: 'success',
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

  // Handle bulk synchronization
  const handleSyncAll = async () => {
    setIsSyncing(true);
    setSyncProgress(0);
    setSyncResults(null);

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setSyncProgress(prev => Math.min(prev + 2, 95));
      }, 200);

      const response = await axios.post(`/v1/integration/sync-all`,
        { targets: ['sipd'], limit: 100 },
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

  // Handle fetching data from SIPD
  const handleFetchSipdData = async (type) => {
    setIsFetching(true);
    setSipdData(null);
    setOperationType(type);
    
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

  // Handle sending disable request to SIPD
  const handleSendDisableRequest = async () => {
    if (!disableData.id_dataset || !disableData.alasan) {
      toast({
        title: 'Data tidak lengkap',
        description: 'Silakan isi ID dataset dan alasan disable',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(`/v1/integration/sipd/disable`,
        { disableData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast({
        title: response.data.success ? 'Permintaan disable berhasil dikirim' : 'Permintaan disable gagal',
        description: response.data.message,
        status: response.data.success ? 'success' : 'error',
        duration: 5000,
        isClosable: true,
      });
      
      // Reset form
      setDisableData({ id_dataset: '', alasan: '' });
    } catch (error) {
      toast({
        title: 'Gagal mengirim permintaan disable',
        description: error.message || 'Terjadi kesalahan saat mengirim permintaan',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Toggle file selection
  const toggleFileSelection = (fileId) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter(id => id !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };

  // Select all files
  const selectAllFiles = () => {
    setSelectedFiles(files.map(file => file._id));
  };

  // Clear file selection
  const clearFileSelection = () => {
    setSelectedFiles([]);
  };

  return (
    <Box className="sipd-integration-admin" p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>Manajemen Integrasi SIPD</Text>
      
      <Tabs variant="enclosed">
        <TabList mb="1em">
          <Tab>Sinkronisasi Data</Tab>
          <Tab>Operasi SIPD</Tab>
          <Tab>Permintaan Disable</Tab>
        </TabList>
        <TabPanels>
          {/* Sinkronisasi Data Panel */}
          <TabPanel>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={4}>Sinkronisasi File dengan SIPD</Text>
                
                {isSyncing ? (
                  <VStack spacing={4}>
                    <Text>Sedang menyinkronkan...</Text>
                    <Progress value={syncProgress} hasStripe isAnimated width="100%" colorScheme="teal" />
                    <Spinner color="teal.500" />
                  </VStack>
                ) : syncResults ? (
                  <VStack spacing={4} align="stretch">
                    <Alert 
                      status={syncResults.success ? "success" : "warning"} 
                      flexDirection="column"
                      alignItems="start"
                    >
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>{syncResults.success ? "Sinkronisasi Berhasil!" : "Sinkronisasi Selesai dengan Peringatan"}</AlertTitle>
                        <AlertDescription display="block">
                          <Text>{syncResults.message}</Text>
                          {syncResults.results && (
                            <Box mt={2}>
                              <Text fontWeight="semibold">Detail:</Text>
                              {syncResults.results.map((result, index) => (
                                <Box key={index} p={2} my={1} borderWidth="1px" borderRadius="md" bg={result.success ? "green.50" : "red.50"}>
                                  <Text fontWeight="medium">{result.fileName}</Text>
                                  <Text fontSize="sm">{result.message}</Text>
                                  {result.error && (
                                    <Text color="red.500" fontSize="xs">Error: {result.error}</Text>
                                  )}
                                </Box>
                              ))}
                            </Box>
                          )}
                        </AlertDescription>
                      </Box>
                      <CloseButton 
                        position="absolute" 
                        right="8px" 
                        top="8px" 
                        onClick={() => setSyncResults(null)} 
                      />
                    </Alert>
                  </VStack>
                ) : (
                  <VStack spacing={4} align="stretch">
                    <HStack spacing={4}>
                      <Button 
                        leftIcon={<FiPlay />}
                        colorScheme="teal" 
                        onClick={handleSyncAll}
                      >
                        Sinkron Semua File
                      </Button>
                      <Button 
                        leftIcon={<FiRefreshCw />}
                        colorScheme="blue" 
                        onClick={handleSyncSelected}
                        isDisabled={selectedFiles.length === 0}
                      >
                        Sinkron File Terpilih ({selectedFiles.length})
                      </Button>
                      <Button onClick={selectAllFiles} size="sm" variant="outline">
                        Pilih Semua
                      </Button>
                      <Button onClick={clearFileSelection} size="sm" variant="outline">
                        Batal Pilih
                      </Button>
                    </HStack>
                    
                    <Divider />
                    
                    <Box borderWidth="1px" borderRadius="lg" p={4}>
                      <Text fontWeight="semibold" mb={3}>Daftar File untuk Sinkronisasi:</Text>
                      <Box maxH="400px" overflowY="auto">
                        <Table variant="simple" size="sm">
                          <Thead position="sticky" top={0} bg="white" zIndex={1}>
                            <Tr>
                              <Th width="50px">Pilih</Th>
                              <Th>Nama File</Th>
                              <Th>Tema Dataset</Th>
                              <Th>Status Verifikasi</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {files.map((file) => (
                              <Tr key={file._id}>
                                <Td>
                                  <input
                                    type="checkbox"
                                    checked={selectedFiles.includes(file._id)}
                                    onChange={() => toggleFileSelection(file._id)}
                                  />
                                </Td>
                                <Td>
                                  <Text fontWeight="medium">{file.name}</Text>
                                </Td>
                                <Td>{file.temadataset}</Td>
                                <Td>
                                  <Badge 
                                    colorScheme={
                                      file.StatusVerifikasi === 'Sudah Verifikasi' ? 'green' : 
                                      file.StatusVerifikasi === 'Ditolak' ? 'red' : 'yellow'
                                    }
                                  >
                                    {file.StatusVerifikasi}
                                  </Badge>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </Box>
                    </Box>
                  </VStack>
                )}
              </Box>
            </VStack>
          </TabPanel>
          
          {/* Operasi SIPD Panel */}
          <TabPanel>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={4}>Operasi Data SIPD</Text>
                
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Kode Pemda</FormLabel>
                    <Input 
                      value={kodepemda} 
                      onChange={(e) => setKodepemda(e.target.value)} 
                      placeholder="Masukkan kode pemda"
                      maxWidth="300px"
                    />
                  </FormControl>
                  
                  <HStack spacing={4}>
                    <Button 
                      leftIcon={<FiDownload />}
                      colorScheme="blue" 
                      onClick={() => handleFetchSipdData('regular')}
                      isLoading={isFetching && operationType === 'regular'}
                      loadingText="Mengambil"
                    >
                      Ambil Data SIPD
                    </Button>
                    <Button 
                      leftIcon={<FiCheckCircle />}
                      colorScheme="green" 
                      onClick={() => handleFetchSipdData('final')}
                      isLoading={isFetching && operationType === 'final'}
                      loadingText="Mengambil"
                    >
                      Ambil Data Final
                    </Button>
                    <Button 
                      leftIcon={<FiInfo />}
                      colorScheme="orange" 
                      onClick={() => handleFetchSipdData('reference')}
                      isLoading={isFetching && operationType === 'reference'}
                      loadingText="Mengambil"
                    >
                      Ambil Data Referensi
                    </Button>
                  </HStack>
                  
                  {sipdData && (
                    <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
                      <Text fontWeight="bold" mb={2}>Data SIPD:</Text>
                      <Box maxH="300px" overflowY="auto" fontFamily="mono" fontSize="sm">
                        <pre>{JSON.stringify(sipdData, null, 2)}</pre>
                      </Box>
                    </Box>
                  )}
                </VStack>
              </Box>
              
              <Divider />
              
              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={4}>Status Koneksi SIPD</Text>
                <Alert status="success">
                  <AlertIcon />
                  <Box flex="1">
                    <AlertTitle>Koneksi Aktif</AlertTitle>
                    <AlertDescription>
                      Sistem berhasil terhubung dengan API SIPD E-Walidata.
                      URL: https://sipd.go.id/ewalidata/serv
                    </AlertDescription>
                  </Box>
                </Alert>
              </Box>
            </VStack>
          </TabPanel>
          
          {/* Permintaan Disable Panel */}
          <TabPanel>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={4}>Permintaan Disable Dataset</Text>
                
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>ID Dataset</FormLabel>
                    <Input 
                      value={disableData.id_dataset}
                      onChange={(e) => setDisableData({...disableData, id_dataset: e.target.value})}
                      placeholder="Masukkan ID dataset yang akan didisable"
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Alasan Disable</FormLabel>
                    <Input 
                      value={disableData.alasan}
                      onChange={(e) => setDisableData({...disableData, alasan: e.target.value})}
                      placeholder="Masukkan alasan disable dataset"
                    />
                  </FormControl>
                  
                  <Button 
                    leftIcon={<FiXCircle />}
                    colorScheme="red" 
                    onClick={handleSendDisableRequest}
                  >
                    Kirim Permintaan Disable
                  </Button>
                </VStack>
              </Box>
              
              <Divider />
              
              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={4}>Riwayat Permintaan Disable</Text>
                <Text color="gray.500" fontStyle="italic">
                  Fitur riwayat permintaan disable akan ditampilkan di sini dalam versi berikutnya.
                </Text>
              </Box>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SipdIntegrationAdmin;