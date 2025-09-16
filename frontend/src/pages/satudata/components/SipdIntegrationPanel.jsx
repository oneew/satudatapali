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
  Badge
} from '@chakra-ui/react';
import { 
  FiRefreshCw, 
  FiDownload, 
  FiCheckCircle, 
  FiInfo, 
  FiXCircle,
  FiPlay
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
        // For regular data, we need a datasetId, but we'll use a placeholder
        response = await axios.get(`/v1/integration/sipd/final?kodepemda=${kodepemda}`, {
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
              
              {sipdData && (
                <Box borderWidth="1px" borderRadius="md" p={3} bg="gray.50">
                  <Text fontWeight="bold" mb={2}>Data SIPD:</Text>
                  <Box maxH="200px" overflowY="auto" fontFamily="mono" fontSize="xs">
                    <pre>{JSON.stringify(sipdData, null, 2)}</pre>
                  </Box>
                </Box>
              )}
              
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
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SipdIntegrationPanel;