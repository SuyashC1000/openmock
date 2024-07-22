import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  ButtonGroup,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { DispatchContext, StateContext, TestPaperContext } from "../page";
import { getNumOfQuestionStatuses } from "@/app/_functions/getFunctions";
import {
  SET_ACTIVE_GROUP,
  SET_TEST_STATUS,
  UPDATE_GROUP_STATUS,
  UPDATE_QUESTION_STATUS,
} from "@/app/_functions/userCacheReducer";
import useActiveElements from "@/lib/useActiveElements";
import useSubmit from "@/lib/useSubmit";
import SummaryTable from "../_misc/SummaryTable";

export const SubmitTestModal = () => {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(DispatchContext);

  const { activeGroupCache, activeGroup } = useActiveElements();
  const { submitGroup, submitTest } = useSubmit();

  const noBtnRef = React.useRef(null);
  const isFinal =
    state.body.length - 1 === state.activeGroupIndex ||
    state.testStatus === "finished";

  function handleSubmitTest() {
    alert("Hooray! You submitted the test!");
  }

  return (
    <Modal
      isOpen={state.testStatus === "submitting"}
      onClose={() => {}}
      size={"full"}
    >
      <ModalOverlay />
      <ModalContent className="flex flex-col h-screen select-none">
        <ModalHeader className="flex-0 h-fit p-0">
          {state.testStatus === "finished" && (
            <Alert
              status="error"
              fontSize={"sm"}
              className="flex items-center justify-center font-normal"
            >
              <AlertIcon />
              <AlertDescription>
                Your exam time is over. Please submit the test now.
              </AlertDescription>
            </Alert>
          )}
        </ModalHeader>
        <ModalBody className="flex flex-col flex-1 overflow-y-auto">
          <Heading size={"lg"}>Exam Summary</Heading>

          <SummaryTable />
        </ModalBody>

        <ModalFooter className=" outline outline-1 outline-neutral flex flex-col flex-0 gap-1">
          <Text>
            <strong>
              You are about to submit {isFinal ? "the test" : "this Group"}.{" "}
            </strong>
            Are you sure? Click &apos;Yes&apos; to proceed; Click &apos;No&apos;
            to go back.
          </Text>
          {activeGroupCache.permissions === "all" && !isFinal && (
            <Text fontSize={"sm"}>
              You can revisit and edit your responses even once the group is
              submitted.
            </Text>
          )}
          {activeGroupCache.permissions !== "all" && !isFinal && (
            <Text fontSize={"sm"} color={"red"}>
              Once you submit this group, no will no longer be able to{" "}
              {activeGroupCache.permissions === "view"
                ? "edit"
                : "revisit or edit"}{" "}
              your responses.
            </Text>
          )}
          <ButtonGroup>
            <Button
              colorScheme="green"
              onClick={() => {
                if (isFinal) {
                  submitTest();
                } else {
                  submitGroup(state.activeGroupIndex + 1, true);
                }
              }}
            >
              Yes
            </Button>
            <Button
              colorScheme="red"
              ref={noBtnRef}
              isDisabled={state.testStatus === "finished"}
              onClick={() =>
                dispatch({ type: SET_TEST_STATUS, payload: "ongoing" })
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
