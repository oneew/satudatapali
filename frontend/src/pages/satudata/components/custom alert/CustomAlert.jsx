import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,

} from '@chakra-ui/react'

function CustomAlert({isOpen, onClose, onDelete, onVerify, onReject, DialogBody, DialogHeader}) {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>{DialogHeader}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {DialogBody}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Tidak</Button>
            <Button colorScheme="red" ml={3} onClick={DialogHeader === "Hapus Data" ? onDelete : DialogHeader === "Verifikasi Data" ? onVerify : onReject}>
              Ya
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}


export default CustomAlert;
