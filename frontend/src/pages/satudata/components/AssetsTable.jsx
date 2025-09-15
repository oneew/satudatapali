import {
  Box,
  IconButton,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import { GrView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";

import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

import CustomAlert from "./custom alert/CustomAlert";

const AssetsTable = ({ files, onDelete }) => {
  const { user, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [fileId, setFileId] = useState(null);
  const [dialogbody, setDialogBody] = useState("");
  const [dialogheader, setDialogHeader] = useState("");

  const toast = useToast();

  const DeleteClicked = (fileId) => {
    setIsOpen(true);
    setFileId(fileId);
    setDialogHeader("Hapus Data");
    setDialogBody(
      "File ini akan dihapus secara permanen dari Server, apakah anda yakin?"
    );
  };

  const VerifyClicked = (fileId) => {
    setIsOpen(true);
    setFileId(fileId);
    setDialogHeader("Verifikasi Data");
    setDialogBody("Verifikasi Data?");
  };

  const RejectClicked = (fileId) => {
    setIsOpen(true);
    setFileId(fileId);
    setDialogHeader("Tolak Data");
    setDialogBody("Tolak Data dan Kembalikan ke Operator?");
  };

  const onClose = () => {
    setIsOpen(false);
    setFileId(null);
    setDialogBody("");
  };

  const handleDelete = () => {
    if (fileId) {
      onDelete(fileId);
      onClose();
    }
  };

  const handleVerify = async () => {
    if (fileId) {
      try {
        const response = await axios.post(`/v1/files/verify/${fileId}`, {headers: {Authorization: `Bearer ${token}`}})
        if (response.status == 200) {
          toast({
            title: "Data Berhasil Di Verifikasi",
            status: "success",
            duration: 6000,
            isClosable: true,
            });
          }
          return setIsOpen(false);
      } catch (error) {
        toast({
          title: "Gagal Verifikasi Data",
          status: "error",
          duration: 6000,
          isClosable: true,
          });
      }
    }
  }

  const handleReject = async () => {
    if (fileId) {
      try {
        const response = await axios.post(`/v1/files/reject/${fileId}`, {headers: {Authorization: `Bearer ${token}`}})
        if (response.status == 200) {
          toast({
            title: "Data Berhasil Ditolak",
            status: "success",
            duration: 6000,
            isClosable: true,
            });
          }
          return setIsOpen(false);
      } catch (error) {
        return toast({
          title: "Gagal Tolak Data",
          status: "error",
          duration: 6000,
          isClosable: true,
          });
      }
    }
  }

  const downloadFile = async (id) => {
    try {
      const response = await axios.get(`/v1/download/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `file_${id}`); // You can customize the filename
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error("Error downloading file", err);
    }
  };

  const verifyData = async (id) => {};

  return (
    <Box borderColor="teal.100" className="assets-table">
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Nama Data</Th>
            <Th>Tipe File</Th>
            <Th>Data Publik</Th>
            <Th>Tanggal Unggah</Th>
            {user.role === "Admin" ? (
              <Th>Terakhir Diubah</Th>
            ) : (
              <Th>Status Verifikasi</Th>
            )}
            {user.role === "Admin" ||
            user.role === "admin" ||
            user.role === "Operator" ? (
              <Th>Hapus File</Th>
            ) : user.role === "Validator" ? (
              <>
                <Th>Verifikasi Data</Th>
                <Th>Kembalikan Data</Th>
              </>
            ) : null}
            <Th>Lihat File</Th>
          </Tr>
        </Thead>
        <Tbody>
          {files.map((file) => (
            <Tr key={file._id}>
              <Td>{file.name}</Td>
              <Td>{file.fileType}</Td>
              <Td>{file.isPublic ? "Ya" : "Tidak"}</Td>
              <Td>
                {new Date(file.metaData.createdAt).toLocaleDateString("id", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Td>
              {user.role === "Admin" ? (
                <Td>
                  {new Date(file.metaData.updatedAt).toLocaleDateString("id", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Td>
              ) : (
                <Td>{file.StatusVerifikasi}</Td>
              )}
              {user.role === "Admin" ||
              user.role === "admin" ||
              user.role === "Operator" ? (
                <Td className="shared-with">
                  <IconButton
                    icon={<MdDeleteForever />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => DeleteClicked(file._id)}
                  />
                </Td>
              ) : (
                <>
                  <Td className="shared-with">
                    <IconButton
                      icon={<FaCheckCircle />}
                      colorScheme="green"
                      size="sm"
                      onClick={() => VerifyClicked(file._id)}
                    />
                  </Td>
                  <Td className="shared-with">
                    <IconButton
                      icon={<FaUndoAlt />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => RejectClicked(file._id)}
                    />
                  </Td>
                </>
              )}
              <Td>
                <IconButton
                  icon={<GrView />}
                  colorScheme="blackAlpha"
                  size="sm"
                  onClick={() => downloadFile(file._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <CustomAlert
        onClose={onClose}
        isOpen={isOpen}
        onDelete={handleDelete}
        onVerify={handleVerify}
        onReject={handleReject}
        DialogBody={dialogbody}
        DialogHeader={dialogheader}
      />
    </Box>
  );
};

export default AssetsTable;
