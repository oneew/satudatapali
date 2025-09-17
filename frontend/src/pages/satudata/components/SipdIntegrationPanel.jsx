import React, { useState } from 'react';
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
  Progress,
  useToast,
  Input,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Divider,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Flex,
  Icon,
  Spinner,
  Select,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { 
  FiRefreshCw, 
  FiDownload, 
  FiCheckCircle, 
  FiInfo, 
  FiXCircle,
  FiPlay,
  FiDatabase,
  FiFileText,
  FiCalendar,
  FiUser,
  FiClock,
  FiTag,
  FiMapPin
} from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

const SipdIntegrationPanel = () => {
  const { token } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncResults, setSyncResults] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [sipdData, setSipdData] = useState(null);
  const [kodepemda, setKodepemda] = useState('1612');
  const [operationType, setOperationType] = useState('regular');
  const [disableData, setDisableData] = useState({ id_dataset: '', alasan: '' });
  const toast = useToast();

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

  // Render data table based on the type of data fetched
  const renderSipdDataTable = () => {
    if (!sipdData || !sipdData.data) return null;

    const { type, data } = sipdData;

    if (type === 'reference') {
      // Render reference data (usually simpler structure)
      return (
        <Card mt={4}>
          <CardHeader>
            <Heading size="md">Data Referensi SIPD</Heading>
          </CardHeader>
          <CardBody>
            <Box maxH="300px" overflowY="auto">
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </Box>
          </CardBody>
        </Card>
      );
    }

    // For final and regular data, try to render as a table
    if (data.data && Array.isArray(data.data)) {
      const dataArray = data.data;
      
      // Try to determine columns from the first item
      const firstItem = dataArray[0];
      if (!firstItem) {
        return (
          <Alert status="info" mt={4}>
            <AlertIcon />
            <AlertTitle>Tidak ada data</AlertTitle>
            <AlertDescription>Data kosong dari SIPD</AlertDescription>
          </Alert>
        );
      }

      // Map SIPD field names to more readable labels
      const fieldLabels = {
        id_dataset: 'ID Dataset',
        nama_dataset: 'Nama Dataset',
        tema_dataset: 'Tema',
        produsen_data: 'Produsen',
        cakupan_data: 'Cakupan',
        frekuensi_data: 'Frekuensi',
        dimensi_data: 'Dimensi',
        nama_file: 'Nama File',
        tipe_file: 'Tipe File',
        publik: 'Publik',
        status_verifikasi: 'Status Verifikasi',
        tanggal_dibuat: 'Tanggal Dibuat',
        tanggal_diubah: 'Tanggal Diubah'
      };

      // Get columns from the first item
      const columns = Object.keys(firstItem);

      return (
        <Card mt={4}>
          <CardHeader>
            <Heading size="md">
              {type === 'final' ? 'Data Final SIPD' : 'Data SIPD'}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Menampilkan {dataArray.length} dataset
            </Text>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    {columns.map((col, index) => (
                      <Th key={index}>{fieldLabels[col] || col}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {dataArray.slice(0, 10).map((item, rowIndex) => (
                    <Tr key={rowIndex}>
                      {columns.map((col, colIndex) => (
                        <Td key={colIndex}>
                          {typeof item[col] === 'object' 
                            ? JSON.stringify(item[col]) 
                            : String(item[col] || '')}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            {dataArray.length > 10 && (
              <Text fontSize="sm" color="gray.500" mt={2}>
                Menampilkan 10 dari {dataArray.length} dataset. Gunakan API untuk melihat semua data.
              </Text>
            )}
          </CardBody>
        </Card>
      );
    }

    // Fallback to raw data display
    return (
      <Card mt={4}>
        <CardHeader>
          <Heading size="md">
            {type === 'final' ? 'Data Final SIPD' : 'Data SIPD'}
          </Heading>
        </CardHeader>
        <CardBody>
          <Box maxH="300px" overflowY="auto">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Box>
        </CardBody>
      </Card>
    );
  };

  // Render summary cards for quick overview
  const renderDataSummary = () => {
    if (!sipdData || !sipdData.data) return null;

    const { type, data } = sipdData;
    
    // For reference data, show basic info
    if (type === 'reference') {
      return (
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mt={4}>
          <Card>
            <CardBody>
              <Flex align="center">
                <Icon as={FiInfo} w={8} h={8} color="blue.500" />
                <Box ml={3}>
                  <Text fontWeight="bold">Data Referensi</Text>
                  <Text fontSize="sm">Tipe data referensi</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </Grid>
      );
    }

    // For final/regular data, try to extract summary info
    if (data.data && Array.isArray(data.data)) {
      const dataArray = data.data;
      const totalDatasets = dataArray.length;
      
      // Try to get some statistics if possible
      let publicDatasets = 0;
      let privateDatasets = 0;
      const themes = {};
      const producers = {};
      
      dataArray.forEach(item => {
        // Count public vs private datasets
        if (item.publik && item.publik.toLowerCase() === 'ya') {
          publicDatasets++;
        } else if (item.publik) {
          privateDatasets++;
        }
        
        // Count datasets by theme
        if (item.tema_dataset) {
          themes[item.tema_dataset] = (themes[item.tema_dataset] || 0) + 1;
        }
        
        // Count datasets by producer
        if (item.produsen_data) {
          producers[item.produsen_data] = (producers[item.produsen_data] || 0) + 1;
        }
      });

      // Get the most common theme and producer
      const mostCommonTheme = Object.keys(themes).reduce((a, b) => themes[a] > themes[b] ? a : b, '');
      const mostCommonProducer = Object.keys(producers).reduce((a, b) => producers[a] > producers[b] ? a : b, '');

      return (
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4} mt={4}>
          <Card>
            <CardBody>
              <Flex align="center">
                <Icon as={FiDatabase} w={8} h={8} color="green.500" />
                <Box ml={3}>
                  <Text fontWeight="bold">{totalDatasets}</Text>
                  <Text fontSize="sm">Total Dataset</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <Flex align="center">
                <Icon as={FiFileText} w={8} h={8} color="blue.500" />
                <Box ml={3}>
                  <Text fontWeight="bold">{publicDatasets}</Text>
                  <Text fontSize="sm">Dataset Publik</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <Flex align="center">
                <Icon as={FiUser} w={8} h={8} color="orange.500" />
                <Box ml={3}>
                  <Text fontWeight="bold">{privateDatasets}</Text>
                  <Text fontSize="sm">Dataset Private</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <Flex align="center">
                <Icon as={FiTag} w={8} h={8} color="purple.500" />
                <Box ml={3}>
                  <Text fontWeight="bold">{mostCommonTheme || 'N/A'}</Text>
                  <Text fontSize="sm">Tema Terbanyak</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </Grid>
      );
    }

    return null;
  };

  return (
    <Box className="sipd-integration-panel" p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4}>Integrasi SIPD</Text>
      
      <Tabs variant="enclosed">
        <TabList mb="1em">
          <Tab>Sinkronisasi</Tab>
          <Tab>Operasi SIPD</Tab>
          <Tab>Disable Dataset</Tab>
        </TabList>
        <TabPanels>
          {/* Sinkronisasi Panel */}
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {isSyncing ? (
                <VStack spacing={4}>
                  <Text>Sedang menyinkronkan...</Text>
                  <Progress value={syncProgress} hasStripe isAnimated width="100%" colorScheme="teal" />
                </VStack>
              ) : syncResults ? (
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
                              <Text fontWeight="medium">{result.system?.toUpperCase() || 'SIPD'}</Text>
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
              ) : (
                <VStack spacing={4} align="stretch">
                  <Button 
                    leftIcon={<FiPlay />}
                    colorScheme="teal" 
                    onClick={handleSyncAll}
                    width="100%"
                  >
                    Sinkron Semua File dengan SIPD
                  </Button>
                  <Text fontSize="sm" color="gray.500">
                    Menyinkronkan semua file yang telah diverifikasi dengan sistem SIPD E-Walidata
                  </Text>
                </VStack>
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
              
              <HStack spacing={2} wrap="wrap">
                <Button 
                  leftIcon={<FiDownload />}
                  colorScheme="blue" 
                  onClick={() => handleFetchSipdData('regular')}
                  isLoading={isFetching && operationType === 'regular'}
                  loadingText="Mengambil"
                  size="sm"
                >
                  Data SIPD
                </Button>
                <Button 
                  leftIcon={<FiCheckCircle />}
                  colorScheme="green" 
                  onClick={() => handleFetchSipdData('final')}
                  isLoading={isFetching && operationType === 'final'}
                  loadingText="Mengambil"
                  size="sm"
                >
                  Data Final
                </Button>
                <Button 
                  leftIcon={<FiInfo />}
                  colorScheme="orange" 
                  onClick={() => handleFetchSipdData('reference')}
                  isLoading={isFetching && operationType === 'reference'}
                  loadingText="Mengambil"
                  size="sm"
                >
                  Data Referensi
                </Button>
              </HStack>
              
              {isFetching && (
                <Flex justify="center" align="center" py={4}>
                  <Spinner size="lg" />
                  <Text ml={3}>Mengambil data dari SIPD...</Text>
                </Flex>
              )}
              
              {renderDataSummary()}
              {renderSipdDataTable()}
              
              <Divider />
              
              <Box>
                <Text fontWeight="semibold" mb={2}>Status Koneksi:</Text>
                <Badge colorScheme="green">Terhubung ke SIPD E-Walidata</Badge>
              </Box>
            </VStack>
          </TabPanel>
          
          {/* Disable Dataset Panel */}
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>ID Dataset</FormLabel>
                <Input 
                  value={disableData.id_dataset}
                  onChange={(e) => setDisableData({...disableData, id_dataset: e.target.value})}
                  placeholder="Masukkan ID dataset"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Alasan Disable</FormLabel>
                <Input 
                  value={disableData.alasan}
                  onChange={(e) => setDisableData({...disableData, alasan: e.target.value})}
                  placeholder="Masukkan alasan disable"
                />
              </FormControl>
              
              <Button 
                leftIcon={<FiXCircle />}
                colorScheme="red" 
                onClick={handleSendDisableRequest}
                width="100%"
              >
                Kirim Permintaan Disable
              </Button>
              
              <Alert status="info" mt={4}>
                <AlertIcon />
                <Box>
                  <AlertTitle>Informasi</AlertTitle>
                  <AlertDescription>
                    Gunakan fitur ini untuk menonaktifkan dataset di sistem SIPD E-Walidata. 
                    Pastikan Anda memiliki otorisasi yang tepat sebelum mengirim permintaan.
                  </AlertDescription>
                </Box>
              </Alert>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SipdIntegrationPanel;