import { Box, Text, Heading, VStack } from '@chakra-ui/react'
import React from 'react'

import './Home.css'

function Home() {
  return (
    <Box as="section" className="home-container">
      <VStack spacing={4} className='stack-container'>
        <Box className="text-container">
        <Heading className="main-heading montserrat-semibold">
          Data-Ku <span className="highlight">di Pali</span>
        </Heading>
        <Text className="subheading montserrat-regular">
          Data-Ku di Pali adalah
          portal terintegrasi untuk pengelolaan, keterbukaan, dan kemudahan
          akses data bagi Warga dan Pemerintah Kabupaten Penukal Abab Lematang Ilir
        </Text>
        </Box>
      </VStack>
    </Box>
  )
}

export default Home