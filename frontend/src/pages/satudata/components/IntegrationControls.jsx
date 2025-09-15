import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  VStack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Spinner,
  Progress,
  useToast
} from '@chakra-ui/react';
import { 
  synchronizeFile, 
  synchronizeAllFiles, 
  getSyncStatus,
  formatSyncResults
} from '../../../services/integrationService';

const IntegrationControls = ({ fileId, fileName }) => {
  const [selectedSystems, setSelectedSystems] = useState(['splp', 'sipd']);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResults, setSyncResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  const handleSyncSingle = async () => {
    if (selectedSystems.length === 0) {
      toast({
        title: 'No systems selected',
        description: 'Please select at least one system to synchronize with',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSyncing(true);
    setProgress(0);
    setSyncResults(null);
    setShowResults(false);

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await synchronizeFile(fileId, selectedSystems);
      
      clearInterval(interval);
      setProgress(100);
      
      setSyncResults(response);
      setShowResults(true);
      
      toast({
        title: response.success ? 'Synchronization completed' : 'Synchronization completed with issues',
        description: response.message,
        status: response.success ? 'success' : 'warning',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      clearInterval(interval);
      setProgress(0);
      
      toast({
        title: 'Synchronization failed',
        description: error.message || 'An error occurred during synchronization',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSyncAll = async () => {
    if (selectedSystems.length === 0) {
      toast({
        title: 'No systems selected',
        description: 'Please select at least one system to synchronize with',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSyncing(true);
    setProgress(0);
    setSyncResults(null);
    setShowResults(false);

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 95));
      }, 300);

      const response = await synchronizeAllFiles(selectedSystems, 100);
      
      clearInterval(interval);
      setProgress(100);
      
      setSyncResults(response);
      setShowResults(true);
      
      toast({
        title: response.success ? 'Bulk synchronization completed' : 'Bulk synchronization completed with issues',
        description: response.message,
        status: response.success ? 'success' : 'warning',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      clearInterval(interval);
      setProgress(0);
      
      toast({
        title: 'Bulk synchronization failed',
        description: error.message || 'An error occurred during bulk synchronization',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleGetStatus = async () => {
    try {
      const response = await getSyncStatus(fileId);
      
      if (response.success) {
        toast({
          title: 'Sync status retrieved',
          description: `File: ${response.data.fileName}`,
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
        
        // For demo purposes, we'll just show a simple alert
        alert(`Sync Status for ${response.data.fileName}:
        Last Sync: ${response.data.lastSync}
        SPLP Synced: ${response.data.splpSynced ? 'Yes' : 'No'}
        SIPD Synced: ${response.data.sipdSynced ? 'Yes' : 'No'}
        Verification Status: ${response.data.verificationStatus}`);
      } else {
        toast({
          title: 'Failed to get sync status',
          description: response.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error getting sync status',
        description: error.message || 'An error occurred while fetching sync status',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4}>Integration Controls</Text>
      
      {isSyncing && (
        <Box mb={4}>
          <Text mb={2}>Synchronizing...</Text>
          <Progress value={progress} hasStripe isAnimated />
        </Box>
      )}
      
      <VStack align="start" spacing={4}>
        <Box>
          <Text fontWeight="semibold" mb={2}>Select Target Systems:</Text>
          <CheckboxGroup 
            value={selectedSystems} 
            onChange={setSelectedSystems}
          >
            <VStack align="start">
              <Checkbox value="splp">SPLP Satu Data Indonesia</Checkbox>
              <Checkbox value="sipd">SIPD e-walidata</Checkbox>
            </VStack>
          </CheckboxGroup>
        </Box>
        
        <Box>
          <Text fontWeight="semibold" mb={2}>Actions:</Text>
          <VStack align="start">
            {fileId ? (
              <Button 
                colorScheme="blue" 
                onClick={handleSyncSingle}
                isLoading={isSyncing}
                loadingText="Syncing"
              >
                Sync This File
              </Button>
            ) : null}
            
            <Button 
              colorScheme="green" 
              onClick={handleSyncAll}
              isLoading={isSyncing}
              loadingText="Syncing All"
            >
              Sync All Verified Files
            </Button>
            
            {fileId ? (
              <Button 
                colorScheme="purple" 
                onClick={handleGetStatus}
                variant="outline"
              >
                Get Sync Status
              </Button>
            ) : null}
          </VStack>
        </Box>
      </VStack>
      
      {showResults && syncResults && (
        <Alert 
          status={syncResults.success ? "success" : "warning"} 
          mt={4}
          flexDirection="column"
          alignItems="start"
        >
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>{syncResults.success ? "Success!" : "Completed with Issues"}</AlertTitle>
            <AlertDescription display="block">
              <Text>{syncResults.message}</Text>
              {syncResults.results && (
                <Box mt={2}>
                  <Text fontWeight="semibold">Details:</Text>
                  {formatSyncResults(syncResults.results).map((result, index) => (
                    <Text key={index} fontSize="sm" mt={1}>
                      {result.system}: {result.status} - {result.message}
                      {result.details && (
                        <Text color="red.500" fontSize="xs">Error: {result.details}</Text>
                      )}
                    </Text>
                  ))}
                </Box>
              )}
            </AlertDescription>
          </Box>
          <CloseButton 
            position="absolute" 
            right="8px" 
            top="8px" 
            onClick={() => setShowResults(false)} 
          />
        </Alert>
      )}
    </Box>
  );
};

export default IntegrationControls;