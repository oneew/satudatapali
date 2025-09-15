import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios";

import { useAuth } from "../../../context/AuthContext";

function DeleteUser() {
  const [users, setUsers] = useState([]);
  const { token } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/v1/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    fetchUsers();
  }, [token, toast]);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/v1/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== id));
      toast({
        title: "Success",
        description: "User deleted successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Nama</Th>
            <Th>Email</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.username}</Td>
              <Td>{user.role}</Td>
              <Td>
                <IconButton
                  colorScheme="red"
                  icon={<FaDeleteLeft />}
                  onClick={() => handleDeleteUser(user.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default DeleteUser;