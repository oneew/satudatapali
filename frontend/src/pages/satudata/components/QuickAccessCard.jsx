import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";

const QuickAccessCard = ({ title, details, onOpen }) => {
  return (
    <Box 
      as="button" 
      onClick={onOpen} 
      className="quick-access-card"
      _hover={{ transform: "translateY(-5px)" }}
      transition="all 0.3s ease"
      position="relative"
    >
      <Flex direction='column' alignItems='flex-start' h="100%">
        <Text className="title">{title}</Text>
        <Text className="details">{details}</Text>
        <Icon 
          as={FiChevronRight} 
          position="absolute" 
          right="20px" 
          bottom="20px" 
          color="#4fd1c5" 
          boxSize={6}
        />
      </Flex>
    </Box>
  );
};

export default QuickAccessCard;