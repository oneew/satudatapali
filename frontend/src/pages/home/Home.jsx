import React from 'react';
import {
  Box, Container, Heading, Text, Input, InputGroup, InputLeftElement,
  VStack, SimpleGrid, Stat, StatLabel, StatNumber, Icon, Flex, Button, HStack, Grid, GridItem
} from '@chakra-ui/react';
import { FiSearch, FiDatabase, FiGrid, FiUsers, FiBarChart2, FiClock, FiCheckCircle } from 'react-icons/fi';
import DataChart from './components/DataChart';
import './Home.css';

// Komponen untuk kartu statistik
const StatCard = ({ icon, label, number }) => (
  <Flex 
    align="center" 
    p={5} 
    bg="white" 
    boxShadow="md" 
    borderRadius="lg"
    transition="all 0.3s"
    _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
  >
    <Icon as={icon} w={12} h={12} color="teal.500" />
    <Box ml={5}>
      <Stat>
        <StatNumber fontSize="3xl" fontWeight="bold" color="teal.600">{number}</StatNumber>
        <StatLabel fontSize="md" color="gray.500">{label}</StatLabel>
      </Stat>
    </Box>
  </Flex>
);

// Komponen untuk kartu kategori sektoral
const CategoryCard = ({ code, name }) => (
  <Flex 
    align="center" 
    p={3} 
    bg="white" 
    borderRadius="md"
    border="1px solid"
    borderColor="gray.200"
    _hover={{ bg: "teal.50", borderColor: "teal.200" }}
    cursor="pointer"
  >
    <Box bg="teal.100" borderRadius="full" p={2} mr={3}>
      <Text fontWeight="bold" color="teal.700" fontSize="sm">{code}</Text>
    </Box>
    <Text fontSize="sm" color="gray.700">{name}</Text>
  </Flex>
);

// Komponen untuk kartu prioritas data
const PriorityCard = ({ title, status, percentage }) => (
  <Flex 
    direction="column"
    p={4} 
    bg="white" 
    borderRadius="lg"
    border="1px solid"
    borderColor="gray.200"
    boxShadow="sm"
  >
    <Text fontWeight="semibold" color="gray.700" mb={2}>{title}</Text>
    <Flex align="center" justify="space-between" mb={2}>
      <Text fontSize="sm" color="gray.500">{status}</Text>
      <Text fontSize="sm" fontWeight="bold" color="teal.600">{percentage}%</Text>
    </Flex>
    <Box h="8px" bg="gray.200" borderRadius="full" overflow="hidden">
      <Box h="100%" bg="teal.500" w={`${percentage}%`} />
    </Box>
  </Flex>
);

const Home = () => {
  // Data kategori sektoral
  const categories = [
    { code: "PNJ", name: "Penunjang" },
    { code: "PTK", name: "Penduduk dan Tenaga Kerja" },
    { code: "PKS", name: "Pendidikan, Kesehatan, Sosial" },
    { code: "PPA", name: "Pertanian dan Pangan" },
    { code: "IPK", name: "Industri, Perdagangan, Koperasi" },
    { code: "PUP", name: "Pekerjaan Umum, Permukiman" },
    { code: "PKP", name: "Perhubungan, Komunikasi" },
    { code: "KDK", name: "Keamanan dan Ketertiban" },
    { code: "DTM", name: "Data Makro" },
    { code: "PEJ", name: "Penunjang" },
    { code: "PDK", name: "Pendukung" },
    { code: "KWL", name: "Kewilayahan" }
  ];

  // Data prioritas
  const priorities = [
    { title: "Prioritas", status: "Data Tersedia", percentage: 75 },
    { title: "Non Prioritas", status: "Data Tersedia", percentage: 60 },
    { title: "SDGs", status: "Data Tersedia", percentage: 45 },
    { title: "SPM", status: "Data Tersedia", percentage: 30 },
    { title: "Lainnya", status: "Data Tersedia", percentage: 25 }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box className="hero-section" display="flex" alignItems="center" justifyContent="center">
        <div className="hero-overlay" />
        <Container maxW="container.xl" zIndex={1} color="white" textAlign="center">
          <VStack spacing={6} py={{ base: 16, md: 24 }}>
            <Heading as="h1" size={{ base: '2xl', md: '3xl' }} fontWeight="extrabold">
              Portal Satu Data Kabupaten PALI
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} maxW="2xl" lineHeight="tall">
              Wadah untuk menemukan, mengakses, dan memanfaatkan data prioritas Kabupaten Penukal Abab Lematang Ilir secara terbuka.
            </Text>
            <Box width="100%" maxW="2xl" pt={4}>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.400" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Cari dataset, visualisasi, atau instansi..."
                  bg="white"
                  color="gray.800"
                  borderRadius="md"
                  boxShadow="lg"
                  _focus={{ borderColor: 'teal.400', boxShadow: 'outline' }}
                />
              </InputGroup>
            </Box>
            <HStack spacing={4} pt={4}>
              <Button 
                colorScheme="teal" 
                variant="solid" 
                size="md" 
                leftIcon={<FiDatabase />}
                boxShadow="md"
              >
                Dataset
              </Button>
              <Button 
                variant="outline" 
                colorScheme="white" 
                size="md" 
                leftIcon={<FiBarChart2 />}
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Visualisasi
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
          <StatCard icon={FiDatabase} label="Dataset" number="348" />
          <StatCard icon={FiUsers} label="Instansi" number="32" />
          <StatCard icon={FiGrid} label="Topik" number="9" />
          <StatCard icon={FiBarChart2} label="Visualisasi" number="24" />
        </SimpleGrid>
      </Container>

      {/* Categories Section */}
      <Box bg="gray.50" py={16}>
        <Container maxW="container.xl">
          <Heading as="h2" size="lg" textAlign="center" mb={2} color="teal.800">
            Kategori Sektoral
          </Heading>
          <Text textAlign="center" color="gray.600" mb={12} maxW="2xl" mx="auto">
            Klik pada kategori untuk melihat data sesuai dengan sektor yang diinginkan
          </Text>
          
          <Grid 
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} 
            gap={4}
          >
            {categories.map((category, index) => (
              <GridItem key={index}>
                <CategoryCard code={category.code} name={category.name} />
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Data Visualization Section */}
      <DataChart />

      {/* Priority Data Section */}
      <Container maxW="container.xl" py={16}>
        <Heading as="h2" size="lg" textAlign="center" mb={2} color="teal.800">
          Data Prioritas
        </Heading>
        <Text textAlign="center" color="gray.600" mb={12} maxW="2xl" mx="auto">
          Data Prioritas adalah data terpilih yang berasal dari daftar data yang akan dikumpulkan pada tahun selanjutnya
        </Text>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 5 }} spacing={6}>
          {priorities.map((priority, index) => (
            <PriorityCard 
              key={index} 
              title={priority.title} 
              status={priority.status} 
              percentage={priority.percentage} 
            />
          ))}
        </SimpleGrid>
      </Container>

      {/* Process Information Section */}
      <Box bg="teal.700" py={16} color="white">
        <Container maxW="container.xl">
          <Heading as="h2" size="lg" textAlign="center" mb={12}>
            Tata Kelola Data
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <Flex direction="column" align="center" textAlign="center" p={6}>
              <Box bg="teal.500" borderRadius="full" p={4} mb={4}>
                <FiClock size={24} />
              </Box>
              <Heading as="h3" size="md" mb={2}>
                Pengumpulan Data
              </Heading>
              <Text>
                Proses pengumpulan data dari berbagai instansi dan sumber terkait
              </Text>
            </Flex>
            
            <Flex direction="column" align="center" textAlign="center" p={6}>
              <Box bg="teal.500" borderRadius="full" p={4} mb={4}>
                <FiBarChart2 size={24} />
              </Box>
              <Heading as="h3" size="md" mb={2}>
                Validasi Data
              </Heading>
              <Text>
                Verifikasi dan validasi data untuk memastikan akurasi dan kualitas
              </Text>
            </Flex>
            
            <Flex direction="column" align="center" textAlign="center" p={6}>
              <Box bg="teal.500" borderRadius="full" p={4} mb={4}>
                <FiCheckCircle size={24} />
              </Box>
              <Heading as="h3" size="md" mb={2}>
                Publikasi Data
              </Heading>
              <Text>
                Penyediaan data yang telah divalidasi untuk diakses publik
              </Text>
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;