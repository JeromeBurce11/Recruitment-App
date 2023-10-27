import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'

const CameraCapture = ({ isOpen, closeCamera }) => {
  const webcamRef = useRef(null);
//   const [isOpen, setIsOpen] = useState(false);
 

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // You can save or process the captured image here
    console.log(imageSrc);
    // setIsOpen(false);
    closeCamera();
  }, [webcamRef]);
  if (!isOpen) return null;
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeCamera}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Camera Capture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={closeCamera}>
              Close
            </Button>
            <Button variant='ghost' onClick={capture}>Take a Picture</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
    </>
  );
};

export default CameraCapture;
