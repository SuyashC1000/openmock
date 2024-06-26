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
            <Alert
              status="error"
              fontSize={"sm"}
              className="flex items-center justify-center font-normal"
            >
              <AlertIcon />
              <AlertDescription>
                Your exam time is over. Please submit the paper now.
              </AlertDescription>
            </Alert>
          )}
        </ModalHeader>
        <ModalBody>
          {state.body.map((e, i) => {
            return (
              <div key={i} className="my-6 flex flex-col gap-2">
                <Heading size={"sm"}>{e.groupName}</Heading>
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
                          <Td>{getNumOfQuestionStatuses("section", [2], f)}</Td>
                          <Td>{getNumOfQuestionStatuses("section", [1], f)}</Td>
                          <Td>{getNumOfQuestionStatuses("section", [3], f)}</Td>
                          <Td>{getNumOfQuestionStatuses("section", [4], f)}</Td>
                          <Td>{getNumOfQuestionStatuses("section", [0], f)}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </div>
            );
          })}
        </ModalBody>

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
