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
} from "../_handlers/handleActionButton";
import {
  getActiveGroupCache,
  getActiveQuestionCache,
  getActiveSectionCache,
} from "../_formatters/getActiveCache";
import { masterConstraint } from "../_formatters/masterConstraint";
import { log } from "console";
import useConfirm from "@/lib/useConfirm";
import { SET_TEST_STATUS } from "../_formatters/userCacheReducer";

const TestBottombar = () => {
  const state = useContext(StateContext);
  const testPaper = useContext(TestPaperContext);
  const dispatch = useContext(DispatchContext);
  const responseDataState = useContext(ResponseDataContext);

  const { confirm } = useConfirm();

  const activeGroupCache = getActiveGroupCache(state);
  const activeQuestionCache = getActiveQuestionCache(state);

  return (
    <div
      className="h-16 min-h-16 w-screen bg-white flex flex-0 justify-between
       items-center px-4 gap-4 outline outline-1 outline-neutral-400 "
    >
      <ButtonGroup>
        <Button
          fontWeight={"400"}
          variant="outline"
          colorScheme="blue"
          form="userResponseForm"
          type="submit"
          isDisabled={!masterConstraint(state, testPaper).canSkip}
          onClick={(e) => {
            handleSubmitQuestion(
              state,
              dispatch,
              testPaper,
              responseDataState,
              confirm,
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
          isDisabled={!masterConstraint(state, testPaper).canSet}
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
          isDisabled={!masterConstraint(state, testPaper).canSkip}
          onClick={() => {
            moveToPrevQuestion(state, dispatch, testPaper, confirm);
          }}
        >
          Previous
        </Button>
        <Button
          fontWeight={"400"}
          colorScheme="blue"
          form="userResponseForm"
          type="submit"
          isDisabled={!masterConstraint(state, testPaper).canSkip}
          // onClick={(e) => console.log(e.currentTarget)}
          onClick={async (e) => {
            handleSubmitQuestion(
              state,
              dispatch,
              testPaper,
              responseDataState,
              confirm,
              false
            );
          }}
        >
          Save & Next
        </Button>

        <Button
          fontWeight={"400"}
          colorScheme="cyan"
          textColor={"white"}
          className="justify-end"
          onClick={() => {
            dispatch({ type: SET_TEST_STATUS, payload: "submitting" });
          }}
          isDisabled={activeGroupCache.status === "submitted"}
        >
          Submit
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default TestBottombar;
