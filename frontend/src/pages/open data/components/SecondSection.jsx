import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  Select,
  Grid,
  GridItem,
  List,
  ListItem,
  Badge,
  Text,
  Button,
  VStack,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./SecondSection.css"; // Your custom CSS file

function SecondSection() {
  const [datasets, setDatasets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(""); // Region filter
  const [selectedOrganization, setSelectedOrganization] = useState(""); // Organization filter
  const [selectedTopic, setSelectedTopic] = useState(""); // Topic filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await axios.get("/v1/files");
        const dataPublik = response.data.files;
        setDatasets(dataPublik); // Update based on actual API structure
      } catch (err) {
        setError("Ada Masalah dengan Server");
      } finally {
        setLoading(false);
      }
    };
    fetchDatasets();
  }, []);

  const filteredDatasets = datasets.filter((dataset) => {
    return (
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedRegion ? dataset.metaData.region === selectedRegion : true) &&
      (selectedOrganization
        ? dataset.metaData.organization === selectedOrganization
        : true) &&
      (selectedTopic ? dataset.metaData.topic === selectedTopic : true)
    );
  });

  // Calculate the current datasets to display
  const indexOfLastDataset = currentPage * itemsPerPage;
  const indexOfFirstDataset = indexOfLastDataset - itemsPerPage;
  const currentDatasets = filteredDatasets.slice(indexOfFirstDataset, indexOfLastDataset);

  const totalPages = Math.ceil(filteredDatasets.length / itemsPerPage);

  if (loading) return <Flex align='center'><Spinner /></Flex>;
  if (error) return <Flex alignContent='center'><Alert status="error">{error}</Alert></Flex>;

  return (
    <Flex direction="column" p={5} className="section-container">
      {/* Header */}
      <Flex justify="space-between" align="center" mb={5}>
        <Box>
          <Text fontSize="3xl" fontWeight="bold" className="heading">
            Dataset
          </Text>
          <Text fontSize="md" color="gray.600" className="subheading">
            Temukan kumpulan data mentah berupa tabel yang bisa diolah lebih
            lanjut di sini.
          </Text>
        </Box>
      </Flex>

      {/* Stats */}
      <Grid className="stats-grid">
        <GridItem p={5} rounded="md" className="stats-card">
          <Text fontSize="lg" color="green.600" fontWeight="bold">
            Jumlah Dataset Kabupaten Penukal Abab Lematang Ilir
          </Text>
          <Text fontSize="3xl" fontWeight="bold">{datasets.length}</Text>
        </GridItem>
      </Grid>

      {/* Filters */}
      <Flex gap={3} mb={5} className="filters-container" flexDirection='row' alignContent='center'>
        <Flex flexDirection='row' width='50%'>
        <Input
          placeholder="Cari dataset"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="custom-input"
        />
        </Flex>
        <Flex flexDirection='row' width='20%'>
        <Select
          placeholder="Pilih Organisasi"
          onChange={(e) => setSelectedOrganization(e.target.value)}
          className="custom-select"
        >
          {/* Add options dynamically */}
        </Select>
        </Flex>
          <Flex flexDirection='row' width='20%'>
        <Select
          placeholder="Pilih Tema"
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="custom-select"
        >
          {/* Add options dynamically */}
        </Select>
          </Flex>
      </Flex>

      {/* Dataset List */}
      <VStack spacing={4} align="stretch" className="dataset-list">
        {currentDatasets.map((dataset) => (
          <List>
          <ListItem
            key={dataset._id}
            p={5}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            rounded="md"
            cursor="pointer"
            onClick={() => navigate(`/dataset/${dataset._id}`)}
            className="dataset-card"
          >
            <Text fontSize="lg" fontWeight="bold">{dataset.name}</Text>
            <Text fontSize="md" color="gray.700">{dataset.metaData.produsen}</Text>
            <Flex mt={2} justify="space-between" align="center">
              <Badge colorScheme="blue">{dataset.fileType}</Badge>
              <Text fontSize="md" color="gray.500">{new Date(dataset.metaData.createdAt).toLocaleDateString("id", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}</Text>
            </Flex>
          </ListItem>
          </List>
        ))}
      </VStack>
      
      {/* Pagination Controls */}
      <Flex justify="center" mt={5}>
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Text fontFamily="Montserrat" m={3}>{`Page ${currentPage} of ${totalPages}`}</Text>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Flex>

    </Flex>
  );
}

export default SecondSection;