import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";

const QuickAccessCard = ({ title, details, onOpen }) => {
  return (
    <Box 
      as="button" 
      onClick={onOpen} 
      className="quick-access-card"
      _hover={{ 
        transform: "translateY(-5px)",
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
        borderColor: "teal.500"
      }}
      transition="all 0.3s ease"
      position="relative"
      bg="white"
      borderRadius="lg"
      p={6}
      minH="150px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.05)"
      border="1px solid"
      borderColor="gray.200"
      textAlign="left"
      width="100%"
    >
      <Flex direction='column' alignItems='flex-start' h="100%">
        <Text 
          className="title" 
          fontSize="lg" 
          fontWeight="bold" 
          color="gray.700"
          mb={2}
        >
          {title}
        </Text>
        <Text 
          className="details" 
          fontSize="sm" 
          color="gray.500"
          lineHeight="1.5"
        >
          {details}
        </Text>
        <Icon 
          as={FiChevronRight} 
          position="absolute" 
          right="20px" 
          bottom="20px" 
          color="teal.500" 
          boxSize={6}
        />
      </Flex>
    </Box>
  );
};

export default QuickAccessCard;