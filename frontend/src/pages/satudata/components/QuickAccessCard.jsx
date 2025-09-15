import { Box, Button, Flex, Text } from "@chakra-ui/react";

const QuickAccessCard = ({ title, details, onOpen }) => {
  return (
    <Box as="button" onClick={onOpen} borderColor={'teal.100'} className="quick-access-card">
      <Flex direction='column' alignItems='flex-start'>
      <Text className="title">{title}</Text>
      <Text className="details">{details}</Text>
      </Flex>
    </Box>
  );
};

export default QuickAccessCard;