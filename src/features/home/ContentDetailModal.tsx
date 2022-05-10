import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { commonDictionaries } from "../../commons/constants/dictionaries";
import { ActualContentData } from "../../types/redux/discovers";

interface P {
  isOpen: boolean;
  onClose: () => void;
  currentItem: ActualContentData;
}

export const ContentDetailModal: React.FC<P> = ({
  isOpen,
  onClose,
  currentItem,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader marginRight="32px">{currentItem.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            {currentItem.overview
              ? currentItem.overview
              : commonDictionaries.noOverview}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
