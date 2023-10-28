import React from 'react';
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
    Box
  } from '@chakra-ui/react';
import { deleteApplicant } from "../../helper/helper";
import toast from "react-hot-toast";


const deleteConfirmation = ({ isOpen, closeDeleteConfirmation ,id }) => {

  const ondelete =()=>{
        let deleteApplicantPromise = deleteApplicant({ id: id });
        toast.promise(deleteApplicantPromise, {
            loading: 'Checking...',
            success: () => (
                <Box color='white' p={3} bg='green.500'>
                 You deleted successfully!!!
                </Box>
              ),
            error: () => <b>Error in deletion</b>
        });
    
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeDeleteConfirmation}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Text>Are you sure you want to delete this?</Text>
          </ModalBody>  

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={closeDeleteConfirmation}>
              Close
            </Button>
            <Button colorScheme='red' onClick={()=>ondelete()}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
    </>
  );
};

export default deleteConfirmation;
