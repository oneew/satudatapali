import React from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Flex, Icon, Button } from '@chakra-ui/react';
import { FiClock, FiBarChart2, FiCheckCircle, FiDownload, FiUser, FiDatabase } from 'react-icons/fi';

const PriorityData = () => {
  // Data prioritas
  const priorities = [
    { title: "Prioritas", description: "Data yang harus dikumpulkan setiap tahun", status: "75% Tersedia", percentage: 75, color: "teal" },
    { title: "Non Prioritas", description: "Data tambahan yang tidak wajib", status: "60% Tersedia", percentage: 60, color: "blue" },
    { title: "SDGs", description: "Data untuk tujuan pembangunan berkelanjutan", status: "45% Tersedia", percentage: 45, color: "yellow" },
    { title: "SPM", description: "Standar Pelayanan Minimal", status: "30% Tersedia", percentage: 30, color: "purple" },
    { title: "Lainnya", description: "Data lainnya yang relevan", status: "25% Tersedia", percentage: 25, color: "red" }
  ];

  // Rencana aksi
  const actionPlans = [
    {
      id: 1,
      problem: "Forum TKSD belum ada Rencana Kegiatan Forum Data masih belum terlaksana sesuai tepat waktu",
      actions: "Kegiatan pengumpulan dan Pengimputan Data",
      responsible: "Diskominfo",
      success: "Daftar data prioritas telah terinput di SI-Masda",
      target: "90% Data prioritas terinputkan kedalam SI-Masda (Disemintasi bagi Perangkat Daerah)",
      timeline: "Januari - Juni 2025"
    },
    {
      id: 2,
      problem: "Forum TKSD belum ada Rencana Kegiatan Forum Data masih belum terlaksana sesuai tepat waktu",
      actions: "Kegiatan pemeriksaan Data",
      responsible: "Diskominfo",
      success: "Daftar data yang sudah terkumpul sudah memenuhi Standar Data dan Memiliki Metadata",
      target: "50% Daftar Data Memenuhi Standar Data Statistik dan Memiliki Metadata",
      timeline: "Februari - Agustus 2025"
    }
  ];

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        {/* Header */}
        <Box textAlign="center" mb={12}>
          <Heading as="h1" size="2xl" mb={4} color="teal.700">
            Data Prioritas Kab. PALI
          </Heading>
          <Text fontSize="lg" maxW="3xl" mx="auto" color="gray.600">
            Data Prioritas adalah Data terpilih yang berasal dari daftar Data yang akan dikumpulkan pada tahun selanjutnya 
            yang disepakati dalam Forum Satu Data Kabupaten Bandung. Data Prioritas juga merupakan data yang dihasilkan 
            dari Perangkat Daerah dan sumber penghasil data lainnya.
          </Text>
        </Box>

        {/* Priority Cards */}
        <Box mb={16}>
          <Heading as="h2" size="lg" mb={6} color="teal.700">
            Kategori Data Prioritas
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={6}>
            {priorities.map((priority, index) => (
              <Flex 
                key={index} 
                direction="column" 
                p={6} 
                bg="white" 
                borderRadius="lg" 
                boxShadow="md" 
                border="1px solid" 
                borderColor="gray.200"
              >
                <Heading as="h3" size="md" mb={2} color={`${priority.color}.600`}>
                  {priority.title}
                </Heading>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  {priority.description}
                </Text>
                <Text fontSize="sm" fontWeight="semibold" mb={2} color="gray.700">
                  {priority.status}
                </Text>
                <Box h="8px" bg="gray.200" borderRadius="full" overflow="hidden" mb={4}>
                  <Box 
                    h="100%" 
                    bg={`${priority.color}.400`} 
                    w={`${priority.percentage}%`} 
                  />
                </Box>
                <Button 
                  colorScheme={priority.color} 
                  variant="outline" 
                  size="sm" 
                  leftIcon={<FiDatabase />}
                >
                  Lihat Data
                </Button>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>

        {/* Process Information */}
        <Box mb={16} bg="teal.700" py={12} px={8} borderRadius="lg" color="white">
          <Heading as="h2" size="lg" textAlign="center" mb={8}>
            Tata Kelola Data
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <Flex direction="column" align="center" textAlign="center" p={6}>
              <Box bg="teal.500" borderRadius="full" p={4} mb={4}>
                <Icon as={FiClock} w={8} h={8} />
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
                <Icon as={FiBarChart2} w={8} h={8} />
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
                <Icon as={FiCheckCircle} w={8} h={8} />
              </Box>
              <Heading as="h3" size="md" mb={2}>
                Publikasi Data
              </Heading>
              <Text>
                Penyediaan data yang telah divalidasi untuk diakses publik
              </Text>
            </Flex>
          </SimpleGrid>
        </Box>

        {/* Action Plans */}
        <Box mb={16}>
          <Heading as="h2" size="lg" mb={6} color="teal.700">
            Rencana Aksi Tata Kelola Satu Data Tahun 2025
          </Heading>
          
          {actionPlans.map((plan) => (
            <Box 
              key={plan.id} 
              bg="white" 
              p={6} 
              borderRadius="lg" 
              boxShadow="md" 
              mb={6} 
              border="1px solid" 
              borderColor="gray.200"
            >
              <Flex direction={{ base: "column", md: "row" }} justify="space-between" mb={4}>
                <Box mb={{ base: 4, md: 0 }}>
                  <Heading as="h3" size="md" color="teal.700" mb={2}>
                    Permasalahan #{plan.id}
                  </Heading>
                  <Text color="gray.700">{plan.problem}</Text>
                </Box>
                <Button 
                  colorScheme="teal" 
                  variant="outline" 
                  leftIcon={<FiDownload />}
                >
                  Unduh Rencana
                </Button>
              </Flex>
              
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mt={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" color="teal.600" mb={1}>
                    Rencana Aksi Daerah
                  </Text>
                  <Text fontSize="sm">{plan.actions}</Text>
                </Box>
                
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" color="teal.600" mb={1}>
                    PD Penanggung Jawab
                  </Text>
                  <Text fontSize="sm">{plan.responsible}</Text>
                </Box>
                
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" color="teal.600" mb={1}>
                    Target Waktu Pelaksanaan
                  </Text>
                  <Text fontSize="sm">{plan.timeline}</Text>
                </Box>
                
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" color="teal.600" mb={1}>
                    Ukuran Keberhasilan
                  </Text>
                  <Text fontSize="sm">{plan.success}</Text>
                </Box>
                
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" color="teal.600" mb={1}>
                    Target Capaian
                  </Text>
                  <Text fontSize="sm">{plan.target}</Text>
                </Box>
              </SimpleGrid>
            </Box>
          ))}
        </Box>

        {/* Call to Action */}
        <Box textAlign="center" py={12}>
          <Heading as="h2" size="lg" mb={4} color="teal.700">
            Ingin Menjadi Penyedia Data?
          </Heading>
          <Text fontSize="lg" mb={6} maxW="2xl" mx="auto" color="gray.600">
            Bergabunglah dengan kami untuk menyediakan data yang akurat dan terpercaya untuk pembangunan daerah.
          </Text>
          <Button 
            colorScheme="teal" 
            size="lg" 
            leftIcon={<FiUser />}
            boxShadow="md"
          >
            Daftar Sebagai Penyedia Data
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PriorityData;