import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

import PerangkatDaerah from "./pilihan form upload data/ListPerangkatDaerah.js";
import ListTema from "./pilihan form upload data/ListTemaDataset.js";
import CakupanData from "./pilihan form upload data/CakupanData.js";
import Frekuensi from "./pilihan form upload data/Frekuensi.js";
import DimensiDataset from "./pilihan form upload data/DimensiDataset.js";

export default function UploadData() {
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
  const { token } = useAuth();
  const toast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (const key in form) {
      if (!form[key] || form[key] === "") {
        return false; // Return false if any field is empty
      }
    }
    if (!file) {
      return false; // Return false if no file is selected
    }
    return true; // All fields are filled
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Mohon isi seluruh form dan pilih file",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return; // Stop the upload process if validation fails
    }

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

      const response = await axios.post("/v1/files/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Berhasil",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error uploading file",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={4} height="fit-content">
      <form onSubmit={handleUpload}>
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
    </Box>
  );
}
