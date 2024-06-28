import {
  Alert,
  AlertDescription,
  AlertIcon,
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
import { getNumOfQuestionStatuses } from "@/app/_formatters/getFunctions";
import { UserCacheGroup } from "@/app/_interface/userCache";
import { getActiveGroupCache } from "@/app/_formatters/getActiveCache";
import {
  SET_ACTIVE_GROUP,
  SET_TEST_STATUS,
  UPDATE_GROUP_STATUS,
  UPDATE_QUESTION_STATUS,
} from "@/app/_formatters/userCacheReducer";

// function array_move(arr, old_index, new_index) {
//   if (new_index >= arr.length) {
//     var k = new_index - arr.length + 1;
//     while (k--) {
//       arr.push(undefined);
//     }
//   }
//   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
//   return arr;
// }

export const SubmitTestModal = () => {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(DispatchContext);

  const activeGroupCache = getActiveGroupCache(state);

  const noBtnRef = React.useRef(null);
  const isFinal =
    state.body.length - 1 === state.activeGroupIndex ||
    state.testStatus === "finished";

  function handleSubmitTest() {
    alert("Hooray! You submitted the test!");
  }
  function handleSubmitGroup() {
    dispatch({ type: UPDATE_GROUP_STATUS, payload: "submitted" });
    dispatch({ type: SET_ACTIVE_GROUP, payload: state.activeGroupIndex + 1 });
    dispatch({ type: UPDATE_GROUP_STATUS, payload: "ongoing" });
    dispatch({ type: SET_TEST_STATUS, payload: "ongoing" });
    dispatch({
      type: UPDATE_QUESTION_STATUS,
      payload: { qIndex: 0, newStatus: 1 },
    });
  }
  // const modifiedGroupList: UserCacheGroup[] = array_move(
  //   state.body,
  //   state.activeGroupIndex,
  //   0
  // );

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
        <ModalBody>
          {state.body.map((e, i) => {
            return (
              <div key={i} className="my-6 flex flex-col gap-1">
                <Heading size={"sm"}>
                  {e.groupName}
                  {e.status === "ongoing" && (
                    <span className="text-blue-500 text-sm font-semibold ml-1">
                      {" "}
                      (Current Group)
                    </span>
                  )}
                  {e.status === "submitted" && (
                    <>
                      <span className="text-neutral-400 text-sm font-semibold ml-1">
                        {" "}
                        (Attempted Group)
                      </span>{" "}
                      <span className=" text-sm font-normal ml-1">
                        (View
                        {e.permissions === "none" ? " not" : ""} allowed; Edit
                        {e.permissions !== "all" ? " not" : ""} allowed)
                      </span>
                    </>
                  )}
                </Heading>
                {e.status === "upcoming" && (
                  <Text fontSize={"sm"}>(Yet to attempt)</Text>
                )}
                {e.status !== "upcoming" && (
                  <Table
                    variant={"striped"}
                    size={"sm"}
                    className="table-fixed border-2 border-neutral-500"
                  >
                    <Thead className="border-b-2 border-neutral-500 bg-blue-100">
                      <Th className="w-2/12">Section</Th>
                      <Th>No. of Questions</Th>
                      <Th>Answered</Th>
                      <Th>Not Answered</Th>
                      <Th>Marked for Review</Th>
                      <Th>
                        Answered & Marked for Review (will also be evaluated)
                      </Th>
                      <Th>Not Visited</Th>
                    </Thead>
                    <Tbody>
                      {e.sections.map((f, j) => {
                        return (
                          <Tr key={j}>
                            <Td>{f.sectionName}</Td>
                            <Td>
                              {getNumOfQuestionStatuses(
                                "section",
                                [0, 1, 2, 3, 4],
                                f
                              )}
                            </Td>
                            <Td>
                              {getNumOfQuestionStatuses("section", [2], f)}
                            </Td>
                            <Td>
                              {getNumOfQuestionStatuses("section", [1], f)}
                            </Td>
                            <Td>
                              {getNumOfQuestionStatuses("section", [3], f)}
                            </Td>
                            <Td>
                              {getNumOfQuestionStatuses("section", [4], f)}
                            </Td>
                            <Td>
                              {getNumOfQuestionStatuses("section", [0], f)}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                )}
              </div>
            );
          })}
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
                  handleSubmitTest();
                } else {
                  handleSubmitGroup();
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
