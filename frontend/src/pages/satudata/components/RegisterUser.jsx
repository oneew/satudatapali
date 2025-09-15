import React from "react";
import {
  Box,
  Input,
  Button,
  InputGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputRightElement,
  Select,
  Flex,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

import { useAuth } from "../../../context/AuthContext";
import useFormValidation from "../../../hooks/useFormValidation";
import PerangkatDaerah from "./pilihan form upload data/ListPerangkatDaerah";

function RegisterUser() {
  const { token } = useAuth();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");
  const [opd, setOpd] = React.useState("");
  const toast = useToast();

  const { error, helperText, validate } = useFormValidation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(name, email, username, password, role)) {
      try {
        const response = await axios.post("/v1/users/register", {
          name: name,
          email: email,
          username: username,
          password: password,
          role: role,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 201) {
          toast({
            title: "Berhasil",
            description: `User Berhasil Ditambahkan untuk ${response.data.user}`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setName("");
          setEmail("");
          setUsername("");
          setPassword("");
          setRole("");
        } 
      } catch (error) {
        if (error.response.status == 400) {
            toast({
              title: "Gagal",
              description: `User ${error.response.data.user} Sudah Ada`,
              status: "error",
              duration: 2000,
              isClosable: true,
            })
          } else {
            toast({
              title: "Error",
              description: "Terjadi Kesalahan pada Server",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
      }
    } else {
      toast({
        title: "Error",
        description: "Input Tidak Valid, Mohon Periksa Kembali Form Di Atas",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box mt={4} height="fit-content">
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isInvalid={error.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormErrorMessage>{helperText.email}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} isInvalid={error.name}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormErrorMessage>{helperText.name}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} isInvalid={error.username}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl mb={4} isInvalid={error.password}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <Button size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>User Role</FormLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Pilih Role"
          >
            <option>Validator</option>
            <option>Operator</option>
          </Select>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Perangkat Daerah</FormLabel>
          <Select
            value={opd}
            onChange={(e) => setOpd(e.target.value)}
            placeholder="Pilih Perangkat Daerah"
          >
            {PerangkatDaerah.map((perangkatDaerah) => (
              <option key={perangkatDaerah}>{perangkatDaerah}</option>
            ))}
          </Select>
        </FormControl>

        <Flex mt={8} alignItems="center">
          <Button type="submit" alignSelf="center" colorScheme="blue">
            Simpan
          </Button>
        </Flex>
      </form>
    </Box>
  );
}

export default RegisterUser;
