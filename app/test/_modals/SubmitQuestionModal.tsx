import { UserCache } from "@/app/_interface/userCache";
import {
  Button,
  ButtonGroup,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

const SubmitQuestionModal = (props: { state: UserCache; isOpen: boolean }) => {
  return (
    <Modal isOpen={props.isOpen} onClose={() => {}} size={"full"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size={"md"}>Exam Summary</Heading>
        </ModalHeader>
        <ModalBody></ModalBody>

        <ModalFooter className=" outline outline-1 outline-neutral flex flex-col flex-0 gap-2">
          <Text>Are you sure you want to submit?</Text>
          <ButtonGroup>
            <Button colorScheme="green">Yes</Button>
            <Button></Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubmitQuestionModal;
