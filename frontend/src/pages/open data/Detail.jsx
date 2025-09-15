import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import { FaDownload, FaEye } from "react-icons/fa";
import axios from "axios";

import "../../shared/dist/css/bootstrap.min.css";
import "./OpenData.css";
import "./Detail.css";

function Detail() {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/v1/files/${id}`);
        setDataset(response.data.files);
      } catch (err) {
        setError(err);
        console.error("Error fetching dataset", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDataset();
  }, [id]);

  const HandleDownloadButton = async () => {
    try {
      const response = await axios.get(`/v1/download/${id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", dataset.name);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("Error downloading file", err);
    }
  };

  if (loading) return <Spinner />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );

  return (
    <Box
      maxW="1070px"
      mx="auto"
      mt="8"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
      bg="white"
      mb={14}
    >
      {/* Header Section */}
      <Box bg="teal.500" color="white" borderRadius="md" p="4" mb="4">
        <Text className="heading">
          {dataset.name}
        </Text>
        <Text className="subheading">
          {dataset.metaData.produsen}
        </Text>
      </Box>

      {/* Info Section */}
      <Flex align="center" justify="space-between" flexWrap="wrap" mb="6">
        <Flex align="center" gap="4">
          <Badge colorScheme="gray" fontSize="0.9em">
            {dataset.metaData.dimensidataset}
          </Badge>
          <Badge colorScheme="green" fontSize="0.9em">
            {dataset.temadataset}
          </Badge>
        </Flex>
        <Flex align="center" gap="2">
          <Button onClick={HandleDownloadButton} leftIcon={<FaDownload />} colorScheme="blue" size="sm">
            Download File
          </Button>
        </Flex>
      </Flex>

      {/* Tabs Section */}
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Data</Tab>
          <Tab>Metadata</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Text fontSize="sm" color="gray.600">
              Data content goes here. Replace this with the actual data or
              charts related to the file.
            </Text>
          </TabPanel>
          <TabPanel>
            <Table>
              <Thead>
                <Tr>
                  <Th>Informasi</Th>
                  <Th>Detail</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Dataset Diperbarui:</Td>
                  <Td>
                    <Badge>
                      {new Date(
                        dataset.metaData.updatedAt
                      ).toLocaleDateString("id", {day:"numeric",month:"long",year:"numeric"})}
                    </Badge>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Dataset Dibuat:</Td>
                  <Td>
                    <Badge>
                      {new Date(
                        dataset.metaData.createdAt
                      ).toLocaleDateString("id", {day:"numeric",month:"long",year:"numeric"})}
                    </Badge>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Produsen Dataset:</Td>
                  <Td>
                    <Badge>{dataset.metaData.produsen}</Badge>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Frekuensi:</Td>
                  <Td>
                    <Badge>{dataset.metaData.frekuensi}</Badge>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Cakupan Dataset:</Td>
                  <Td>
                    <Badge>{dataset.metaData.cakupandata}</Badge>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Detail;
