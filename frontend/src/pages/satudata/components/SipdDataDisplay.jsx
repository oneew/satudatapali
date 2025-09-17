import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Grid,
  GridItem,
  Icon,
  Flex,
  Badge,
  useToast,
  Input,
  FormControl,
  FormLabel,
  HStack
} from '@chakra-ui/react';
import { FiDatabase, FiFileText, FiUser, FiTag, FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const SipdDataDisplay = () => {
  const { token } = useAuth();
  const [sipdData, setSipdData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [kodepemda, setKodepemda] = useState('1612');
  const toast = useToast();

  // Fetch SIPD data
  const fetchSipdData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/v1/integration/sipd/final?kodepemda=${kodepemda}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Check if the response is successful
      if (response.data && response.data.success) {
        setSipdData(response.data);
      } else {
        // Handle case where response is not successful
        const errorMessage = response.data?.message || 'Failed to fetch SIPD data';
        setError(errorMessage);
        toast({
          title: 'Error fetching SIPD data',
          description: errorMessage,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      // Handle network errors or other exceptions
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch SIPD data';
      setError(errorMessage);
      toast({
        title: 'Error fetching SIPD data',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSipdData();
  }, []);

  // Handle refresh
  const handleRefresh = () => {
    fetchSipdData();
  };

  // Render summary cards
  const renderSummaryCards = () => {
    if (!sipdData || !sipdData.data || !Array.isArray(sipdData.data)) return null;
    
    const dataArray = sipdData.data;
    const totalDatasets = dataArray.length;
    
    // Calculate statistics
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
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4} mb={6}>
        <GridItem>
          <Card>
            <CardBody>
              <Flex align="center">
                <Icon as={FiDatabase} w={8} h={8} color="green.500" />
                <Box ml={3}>
                  <Text fontWeight="bold" fontSize="2xl">{totalDatasets}</Text>
                  <Text fontSize="sm" color="gray.500">Total Dataset</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
        
        <GridItem>
          <Card>
            <CardBody>
              <Flex align="center">
                <Icon as={FiFileText} w={8} h={8} color="blue.500" />
                <Box ml={3}>
                  <Text fontWeight="bold" fontSize="2xl">{publicDatasets}</Text>
                  <Text fontSize="sm" color="gray.500">Dataset Publik</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
        
        <GridItem>
          <Card>
            <CardBody>
              <Flex align="center">
                <Icon as={FiUser} w={8} h={8} color="orange.500" />
                <Box ml={3}>
                  <Text fontWeight="bold" fontSize="2xl">{privateDatasets}</Text>
                  <Text fontSize="sm" color="gray.500">Dataset Private</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
        
        <GridItem>
          <Card>
            <CardBody>
              <Flex align="center">
                <Icon as={FiTag} w={8} h={8} color="purple.500" />
                <Box ml={3}>
                  <Text fontWeight="bold" fontSize="lg">{mostCommonTheme || 'N/A'}</Text>
                  <Text fontSize="sm" color="gray.500">Tema Terbanyak</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  };

  // Render data table
  const renderDataTable = () => {
    if (!sipdData || !sipdData.data || !Array.isArray(sipdData.data)) return null;
    
    const dataArray = sipdData.data;
    
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
    const firstItem = dataArray[0];
    if (!firstItem) return null;
    
    const columns = Object.keys(firstItem);

    return (
      <Card>
        <CardHeader>
          <Flex justify="space-between" align="center">
            <Heading size="md">Data SIPD</Heading>
            <Text fontSize="sm" color="gray.500">
              Menampilkan {Math.min(dataArray.length, 10)} dari {dataArray.length} dataset
            </Text>
          </Flex>
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
        </CardBody>
        <CardFooter>
          <Text fontSize="sm" color="gray.500">
            Menampilkan 10 dataset terbaru. Gunakan panel SIPD untuk melihat semua data.
          </Text>
        </CardFooter>
      </Card>
    );
  };

  return (
    <Box mb={8}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="md" color="gray.700">
          Data SIPD
        </Heading>
        <HStack>
          <FormControl width="200px">
            <FormLabel fontSize="sm">Kode Pemda</FormLabel>
            <Input 
              value={kodepemda} 
              onChange={(e) => setKodepemda(e.target.value)} 
              size="sm"
            />
          </FormControl>
          <Button 
            leftIcon={<FiRefreshCw />} 
            onClick={handleRefresh} 
            size="sm" 
            colorScheme="teal"
            isLoading={loading}
          >
            Refresh
          </Button>
        </HStack>
      </Flex>

      {loading && (
        <Flex justify="center" align="center" py={8}>
          <Spinner size="lg" />
          <Text ml={3}>Mengambil data dari SIPD...</Text>
        </Flex>
      )}

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription display="block">
              {error}
            </AlertDescription>
          </Box>
        </Alert>
      )}

      {!loading && !error && sipdData && (
        <>
          {renderSummaryCards()}
          {renderDataTable()}
        </>
      )}

      {!loading && !error && sipdData && (!sipdData.data || sipdData.data.length === 0) && (
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>Tidak ada data</AlertTitle>
          <AlertDescription>Tidak ada data SIPD yang tersedia untuk kode pemda {kodepemda}.</AlertDescription>
        </Alert>
      )}
    </Box>
  );
};

export default SipdDataDisplay;