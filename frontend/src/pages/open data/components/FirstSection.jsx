import React, { useEffect } from 'react'
import { Box, Button, Text, Input, Image, list } from '@chakra-ui/react'
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";

import '../../../shared/dist/css/bootstrap.min.css'
import '../OpenData.css'

function FirstSection() {
const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const typingSpeed = 150;
  const pauseDuration = 2000;
  const listText = ["analisis", "penelitian", "tugas", "kajian", "studi"];

  React.useEffect(() => {
    let typingTimeout;
    let pauseTimeout;

    if (isTyping) {
      const currentText = listText[textIndex];
      if (typedText.length < currentText.length) {
        // Continue typing
        typingTimeout = setTimeout(() => {
          setTypedText((prev) => prev + currentText[typedText.length]);
        }, typingSpeed);
      } else {
        // Finished typing, start pause phase
        setIsTyping(false);
      }
    } else {
      // Pause phase
      pauseTimeout = setTimeout(() => {
        setTypedText(''); // Clear typed text
        setTextIndex((prev) => (prev + 1) % listText.length); // Move to next text
        setIsTyping(true); // Start typing again
      }, pauseDuration);
    }

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(pauseTimeout);
    };
  }, [typedText, isTyping, textIndex]);

  return (
    <Box className="banner" >
      {/* Left Section - Text */}
      <Box flex="1" className='left-side-banner'>
        <Text className='banner-heading'>
          Ragam Data Terbuka tentang Pali untuk bantu{" "}
          <Text as="span" color="teal.400">
            {typedText}
          </Text>
        </Text>
        <Text mt={4} color="gray.600">
          Temukan dataset, visualisasi, infografik, artikel, dan mapset dengan cepat, mudah, dan akurat
        </Text>

        {/* Search Button */}
        <Box className='search-button'>
          <Button leftIcon={<FaSearch />} colorScheme="teal" size="lg" ml={2}>
            Cari data
          </Button>
        </Box>
      </Box>

      {/* Right Section - Image */}
      <Box flex="1" className="banner-image">
        {/* Placeholder for the illustration */}
        <Image src='shared/images/opendata.png' />
      </Box>
    </Box>
  )
}

export default FirstSection