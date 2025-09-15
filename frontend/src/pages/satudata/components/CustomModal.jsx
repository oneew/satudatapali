import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const CustomModal = ({ isOpen, onClose, content }) => {
  return (
    <Modal closeOnOverlayClick={false} size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader style={{fontFamily: "Poppins", fontWeight: "500", fontSize: "18px"}}>{content.title}</ModalHeader>
        <ModalBody style={{fontFamily: "Montserrat", fontWeight: "300", fontSize: "12px"}}>
          {/* Render your form control or list here based on content */}
          {content.body}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;