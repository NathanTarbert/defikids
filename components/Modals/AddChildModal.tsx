import React, { useState } from "react";
import {
  Box,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Modal,
  Heading,
  ModalFooter,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RegisterChildForm } from "@/components/forms/registerChildForm";

export const AddChildModal = ({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
}) => {
  const isMobileSize = useBreakpointValue({
    base: true,
    sm: false,
    md: false,
    lg: false,
  });
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={isMobileSize ? "6xl" : "md"}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">New Kid</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RegisterChildForm onClose={onClose} onAdd={onAdd} />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
