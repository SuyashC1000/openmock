import React from "react";
import { TestStateContext, TestPaperContext } from "../page";
import {
  Checkbox,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { getNumOfQuestionStatuses } from "@/app/_functions/getFunctions";

const SummaryTable = () => {
  const testPaper = React.useContext(TestPaperContext);
  const state = React.useContext(TestStateContext);

  return (
    <>
      {state.body.map((e, i) => {
        return (
          <div key={i} className="my-6 flex flex-col gap-1">
            <Heading size={"sm"}>
              {e.groupName}
              {e.status === "ongoing" && state.testStatus !== "finished" && (
                <span className="text-blue-500 text-sm font-semibold ml-1">
                  {" "}
                  (Current Group)
                </span>
              )}
              {e.status !== "upcoming" &&
                testPaper.body[i].optional &&
                !e.hasOpted && (
                  <span className="text-red-500 text-sm font-semibold ml-1">
                    {" "}
                    (Will not be evaulated)
                  </span>
                )}
              {e.status === "submitted" && state.testStatus !== "finished" && (
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
              <Text fontSize={"sm"}>
                (
                {state.testStatus === "finished"
                  ? "Not attempted"
                  : "Yet to start"}
                )
              </Text>
            )}
            {e.status !== "upcoming" && (
              <Table
                variant={"striped"}
                size={"sm"}
                className="table-fixed border-2 border-neutral-500"
              >
                <Thead className="border-b-2 border-neutral-500 bg-blue-100">
                  <Tr>
                    <Th className="w-2/12">Section</Th>
                    <Th>No. of Questions</Th>
                    <Th>Answered</Th>
                    <Th>Not Answered</Th>
                    <Th>Marked for Review</Th>
                    <Th>
                      Answered & Marked for Review (will also be evaluated)
                    </Th>
                    <Th>Not Visited</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {e.sections.map((f, j) => {
                    return (
                      <Tr key={j}>
                        <Td>
                          <Text>
                            {f.selected !== undefined && (
                              <Checkbox
                                mr={1}
                                readOnly
                                size={"sm"}
                                colorScheme="gray"
                                bgColor={"gray.300"}
                                isChecked={f.selected}
                                cursor={"default"}
                              />
                            )}
                            {f.sectionName}
                          </Text>
                        </Td>
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
            )}
          </div>
        );
      })}
    </>
  );
};

export default SummaryTable;
