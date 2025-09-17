import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Card,
  CardBody,
  Text,
  Icon,
  Flex,
  Badge,
  Progress,
} from '@chakra-ui/react';
import {
  FiDatabase,
  FiFileText,
  FiUser,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from 'react-icons/fi';

const DataSummary = ({ files }) => {
  // Calculate statistics
  const totalFiles = files.length;
  
  const verifiedFiles = files.filter(file => 
    file.StatusVerifikasi === 'Sudah Verifikasi'
  ).length;
  
  const pendingFiles = files.filter(file => 
    file.StatusVerifikasi === 'Belum Verifikasi'
  ).length;
  
  const rejectedFiles = files.filter(file => 
    file.StatusVerifikasi === 'Ditolak'
  ).length;
  
  const publicFiles = files.filter(file => 
    file.isPublic === true
  ).length;
  
  // Get file types distribution
  const fileTypes = files.reduce((acc, file) => {
    acc[file.fileType] = (acc[file.fileType] || 0) + 1;
    return acc;
  }, {});
  
  // Get perangkat daerah distribution
  const perangkatDaerah = files.reduce((acc, file) => {
    const pd = file.metaData?.produsen || 'Tidak Diketahui';
    acc[pd] = (acc[pd] || 0) + 1;
    return acc;
  }, {});
  
  // Get top 5 perangkat daerah
  const topPerangkatDaerah = Object.entries(perangkatDaerah)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  // Verification percentage
  const verificationPercentage = totalFiles > 0 ? (verifiedFiles / totalFiles) * 100 : 0;

  return (
    <Box mb={8}>
      <Grid 
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} 
        gap={6}
        mb={8}
      >
        <GridItem>
          <Card bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
            <CardBody>
              <Flex align="center">
                <Icon as={FiDatabase} w={8} h={8} color="teal.500" />
                <Box ml={3}>
                  <Text fontWeight="bold" fontSize="2xl">{totalFiles}</Text>
                  <Text fontSize="sm" color="gray.500">Total Dataset</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
        
        <GridItem>
          <Card bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
            <CardBody>
              <Flex align="center">
                <Icon as={FiCheckCircle} w={8} h={8} color="green.500" />
                <Box ml={3}>
                  <Text fontWeight="bold" fontSize="2xl">{verifiedFiles}</Text>
                  <Text fontSize="sm" color="gray.500">Terverifikasi</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
        
        <GridItem>
          <Card bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
            <CardBody>
              <Flex align="center">
                <Icon as={FiClock} w={8} h={8} color="yellow.500" />
                <Box ml={3}>
                  <Text fontWeight="bold" fontSize="2xl">{pendingFiles}</Text>
                  <Text fontSize="sm" color="gray.500">Pending</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
        
        <GridItem>
          <Card bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
            <CardBody>
              <Flex align="center">
                <Icon as={FiUser} w={8} h={8} color="blue.500" />
                <Box ml={3}>
                  <Text fontWeight="bold" fontSize="2xl">{publicFiles}</Text>
                  <Text fontSize="sm" color="gray.500">Data Publik</Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      
      <Grid 
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} 
        gap={6}
        mb={8}
      >
        <GridItem>
          <Card bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
            <CardBody>
              <Text fontWeight="bold" mb={4}>Status Verifikasi</Text>
              <Flex align="center" mb={2}>
                <Text flex={1} fontSize="sm">Terverifikasi</Text>
                <Text fontSize="sm" fontWeight="semibold">{verifiedFiles}</Text>
              </Flex>
              <Progress 
                value={(verifiedFiles / totalFiles) * 100} 
                size="sm" 
                colorScheme="green" 
                mb={3}
                borderRadius="full"
              />
              
              <Flex align="center" mb={2}>
                <Text flex={1} fontSize="sm">Pending</Text>
                <Text fontSize="sm" fontWeight="semibold">{pendingFiles}</Text>
              </Flex>
              <Progress 
                value={(pendingFiles / totalFiles) * 100} 
                size="sm" 
                colorScheme="yellow" 
                mb={3}
                borderRadius="full"
              />
              
              <Flex align="center" mb={2}>
                <Text flex={1} fontSize="sm">Ditolak</Text>
                <Text fontSize="sm" fontWeight="semibold">{rejectedFiles}</Text>
              </Flex>
              <Progress 
                value={(rejectedFiles / totalFiles) * 100} 
                size="sm" 
                colorScheme="red" 
                borderRadius="full"
              />
              
              <Flex justify="space-between" mt={4}>
                <Text fontSize="sm" color="gray.500">Total</Text>
                <Text fontSize="sm" fontWeight="semibold">{totalFiles} file</Text>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
        
        <GridItem>
          <Card bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
            <CardBody>
              <Text fontWeight="bold" mb={4}>Top Perangkat Daerah</Text>
              {topPerangkatDaerah.map(([pd, count], index) => (
                <Flex key={index} align="center" mb={3}>
                  <Text flex={1} fontSize="sm">{pd}</Text>
                  <Badge colorScheme="teal">{count}</Badge>
                </Flex>
              ))}
              
              {topPerangkatDaerah.length === 0 && (
                <Text fontSize="sm" color="gray.500">Tidak ada data</Text>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      
      <Grid 
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} 
        gap={6}
      >
        <GridItem>
          <Card bg="white" borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
            <CardBody>
              <Text fontWeight="bold" mb={4}>Distribusi Tipe File</Text>
              {Object.entries(fileTypes).map(([type, count], index) => (
                <Flex key={index} align="center" mb={2}>
                  <Text flex={1} fontSize="sm">{type.toUpperCase()}</Text>
                  <Text fontSize="sm">{count}</Text>
                  <Text fontSize="sm" color="gray.500" ml={2}>
                    ({totalFiles > 0 ? ((count / totalFiles) * 100).toFixed(1) : 0}%)
                  </Text>
                </Flex>
              ))}
              
              {Object.keys(fileTypes).length === 0 && (
                <Text fontSize="sm" color="gray.500">Tidak ada data</Text>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DataSummary;