import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Select,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Text,
  Flex,
  Thead,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext.jsx";
import "../Dashboard.css";

import PerangkatDaerah from "./pilihan form upload data/ListPerangkatDaerah.js";
import ListTema from "./pilihan form upload data/ListTemaDataset.js";
import CakupanData from "./pilihan form upload data/CakupanData.js";
import Frekuensi from "./pilihan form upload data/Frekuensi.js";
import DimensiDataset from "./pilihan form upload data/DimensiDataset.js";

function EditFile() {
  const { token } = useAuth();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    temadataset: "",
    produsen: "",
    cakupandata: "",
    frekuensi: "",
    dimensidataset: "",
    isPublic: "",
  });
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/v1/files/list", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(response.data.files);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (file) => {
    setSelectedFile(file);
    setForm({
      name: file.name,
      temadataset: file.temadataset,
      produsen: file.metaData.produsen,
      cakupandata: file.metaData.cakupandata,
      frekuensi: file.metaData.frekuensi,
      dimensidataset: file.metaData.dimensidataset,
      isPublic: file.isPublic,
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", form.name);
      formData.append("temadataset", form.temadataset);
      formData.append("produsen", form.produsen);
      formData.append("cakupandata", form.cakupandata);
      formData.append("frekuensi", form.frekuensi);
      formData.append("dimensidataset", form.dimensidataset);
      formData.append("isPublic", form.isPublic);

      const response = await axios.put(
        `/v1/files/edit/${selectedFile._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Close modal after successful update
    } catch (error) {
      toast({
        title: "Error updating file",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={4}>
      {selectedFile ? (
        <form onSubmit={handleUpdate}>
          <FormControl mb={3}>
            <FormLabel>Nama File</FormLabel>
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Produsen</FormLabel>
            <Select
              name="produsen"
              value={form.produsen}
              onChange={handleChange}
              placeholder="Pilih Perangkat Daerah"
            >
              {PerangkatDaerah.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Tema Dataset</FormLabel>
            <Select
              name="temadataset"
              value={form.temadataset}
              onChange={handleChange}
              placeholder="Pilih Tema"
            >
              {ListTema.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Cakupan Data</FormLabel>
            <Select
              name="cakupandata"
              value={form.cakupandata}
              onChange={handleChange}
              placeholder="Pilih Cakupan"
            >
              {CakupanData.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Frekuensi</FormLabel>
            <Select
              name="frekuensi"
              value={form.frekuensi}
              onChange={handleChange}
              placeholder="Pilih Frekuensi"
            >
              {Frekuensi.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Dimensi Dataset</FormLabel>
            <Select
              name="dimensidataset"
              value={form.dimensidataset}
              onChange={handleChange}
              placeholder="Pilih Dimensi"
            >
              {DimensiDataset.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={3} alignItems="center">
            <FormLabel>File</FormLabel>
            <Input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <FormHelperText>
              Format file: .pdf, .doc, .docx, .xls, .xlsx
            </FormHelperText>
            <FormHelperText>Maksimal file: 5 MB</FormHelperText>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Set Data Publik</FormLabel>
            <Select
              name="isPublic"
              value={form.isPublic}
              onChange={handleChange}
              placeholder="Select"
            >
              <option value="true">Data Publik</option>
              <option value="false">Data Staging</option>
            </Select>
          </FormControl>
          <Flex justifyContent="center">
            <Button type="submit" colorScheme="blue" mt={4}>
              Simpan
            </Button>
          </Flex>
        </form>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Nama File</Th>
              <Th>Status Verifikasi</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {files.map((file) => (
              <Tr key={file._id}>
                <Td>{file.name}</Td>
                <Td>{file.StatusVerifikasi}</Td>
                <Td>
                  <Button onClick={() => handleEditClick(file)}>Edit</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

export default EditFile;
