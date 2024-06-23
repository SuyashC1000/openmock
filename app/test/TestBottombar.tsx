import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  DispatchContext,
  ResponseDataContext,
  StateContext,
  TestPaperContext,
} from "./page";
import {
  handleClearResponse,
  handleSubmitQuestion,
  moveToPrevQuestion,
} from "../handlers/handleActionButton";
import {
  getActiveGroupCache,
  getActiveQuestionCache,
  getActiveSectionCache,
} from "../formatters/getFunctions";

const TestBottombar = () => {
  const state = useContext(StateContext);
  const testPaper = useContext(TestPaperContext);
  const dispatch = useContext(DispatchContext);
  const responseDataState = useContext(ResponseDataContext);

  return (
    <div
      className="h-16 w-screen bg-white flex flex-0 justify-between
       items-center px-4 gap-4 outline outline-1 outline-neutral-400 "
    >
      <ButtonGroup>
        <Button
          fontWeight={"400"}
          variant="outline"
          colorScheme="blue"
          form="userResponseForm"
          type="submit"
          onClick={(e) => {
            handleSubmitQuestion(
              state,
              dispatch,
              testPaper,
              responseDataState,
              true
            );
          }}
        >
          Mark for Review & Next
        </Button>
        <Button
          fontWeight={"400"}
          variant="outline"
          colorScheme="blue"
          form="userResponseForm"
          type="reset"
          onClick={() => {
            handleClearResponse(state, dispatch, responseDataState);
          }}
        >
          Clear Response
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button
          fontWeight={"400"}
          variant="outline"
          colorScheme="blue"
          visibility={
            getActiveGroupCache(state).activeSectionIndex === 0 &&
            getActiveSectionCache(state).qIndex == 0
              ? "hidden"
              : "visible"
          }
          onClick={() => {
            moveToPrevQuestion(state, dispatch);
          }}
        >
          Previous
        </Button>
        <Button
          fontWeight={"400"}
          variant="outline"
          colorScheme="blue"
          form="userResponseForm"
          type="submit"
          // onClick={(e) => console.log(e.currentTarget)}
          onClick={(e) => {
            handleSubmitQuestion(
              state,
              dispatch,
              testPaper,
              responseDataState,
              false
            );
          }}
        >
          Save & Next
        </Button>

        <Button
          fontWeight={"400"}
          colorScheme="blue"
          className="justify-end"
          // onClick={onOpen}
        >
          Submit
        </Button>
      </ButtonGroup>

      {/* <Modal
        isOpen={state.testStatus === "submitting"}
        onClose={() => {}}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Hello
            <Button
              onClick={() => {
                dispatch({ type: "set_test_status", payload: "ongoing" });
              }}
            >
              Click me
            </Button>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal> */}
    </div>
  );
};

export default TestBottombar;
