import {
  Button,
  ButtonGroup,
  Heading,
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
import { DispatchContext, StateContext, TestPaperContext } from "../page";

export const SubmitTestModal = () => {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(DispatchContext);

  const noBtnRef = React.useRef(null);

  return (
    <Modal
      isOpen={
        state.testStatus === "submitting" || state.testStatus === "finished"
      }
      onClose={() => {}}
      size={"full"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size={"md"}>Exam Summary</Heading>
          {state.testStatus === "finished" && (
            <Text className="text-base text-red-500 text-center">
              Your exam time is over. Please submit the paper now.
            </Text>
          )}
        </ModalHeader>
        <ModalBody></ModalBody>

        <ModalFooter className=" outline outline-1 outline-neutral flex flex-col flex-0 gap-2">
          <Text>Are you sure you want to submit?</Text>
          <ButtonGroup>
            <Button colorScheme="green">Yes</Button>
            <Button
              colorScheme="red"
              ref={noBtnRef}
              isDisabled={state.testStatus === "finished"}
              onClick={() =>
                dispatch({ type: "set_test_status", payload: "ongoing" })
              }
            >
              No
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubmitTestModal;
