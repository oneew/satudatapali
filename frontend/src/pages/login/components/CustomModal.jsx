import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";

function CustomModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="heading">
          Jika Anda Belum Punya Akun
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text className="text">
            Anda harus mendaftarkan diri melalui email resmi{" "}
            <Link className="link" href="mailto:diskominfo@pallikab.go.id">
              diskominfo@pallikab.go.id
            </Link>{" "}
            untuk mendapatkan akses Dashboard ke Satu Data PALI. <br />
            <br />
            Persyaratan untuk mendaftarkan diri akan diinformasikan lebih lanjut
            pada update selanjutnya
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
