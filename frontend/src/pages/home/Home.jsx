import { Box, Text, Heading, VStack, Grid, GridItem, Icon } from '@chakra-ui/react';
import { FiDatabase, FiBarChart2, FiLock, FiGlobe, FiUsers, FiShield } from 'react-icons/fi';
import React from 'react';

import './Home.css';

function Home() {
  const features = [
    {
      icon: FiDatabase,
      title: "Data Terintegrasi",
      description: "Semua data dari berbagai sumber terintegrasi dalam satu platform terpadu untuk kemudahan akses dan analisis."
    },
    {
      icon: FiBarChart2,
      title: "Analisis Lanjutan",
      description: "Alat analisis canggih untuk membantu pengambilan keputusan berbasis data yang akurat dan terpercaya."
    },
    {
      icon: FiLock,
      title: "Keamanan Data",
      description: "Sistem keamanan tingkat tinggi untuk melindungi data sensitif dan memastikan privasi pengguna."
    },
    {
      icon: FiGlobe,
      title: "Akses Terbuka",
      description: "Data publik tersedia untuk diakses oleh masyarakat dengan mudah dan transparan."
    },
    {
      icon: FiUsers,
      title: "Kolaborasi",
      description: "Platform untuk kolaborasi antar instansi pemerintah dalam pengelolaan data."
    },
    {
      icon: FiShield,
      title: "Standar Nasional",
      description: "Mengikuti standar nasional Satu Data Indonesia untuk interoperabilitas data."
    }
  ];

  return (
    <Box as="section" className="home-container">
      <VStack spacing={8} className='stack-container'>
        <Box className="text-container">
          <Heading className="main-heading montserrat-semibold">
            Data-Ku <span className="highlight">di Pali</span>
          </Heading>
          <Text className="subheading montserrat-regular">
            Data-Ku di Pali adalah portal terintegrasi untuk pengelolaan, keterbukaan, dan kemudahan 
            akses data bagi Warga dan Pemerintah Kabupaten Penukal Abab Lematang Ilir
          </Text>
        </Box>
        
        <Grid 
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} 
          gap={6} 
          className="features-section"
        >
          {features.map((feature, index) => (
            <GridItem key={index} className="feature-card">
              <Icon as={feature.icon} className="feature-icon" />
              <Heading as="h3" className="feature-title montserrat-semibold">
                {feature.title}
              </Heading>
              <Text className="feature-description montserrat-regular">
                {feature.description}
              </Text>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
}

export default Home;