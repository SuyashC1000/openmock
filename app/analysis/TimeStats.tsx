import {
  Card,
  CardBody,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { activeTestResponseContext } from "./page";

const TimeStats = () => {
  const testResponse = React.useContext(activeTestResponseContext);

  return (
    <div>
      <Heading size={"lg"}>Time Stats</Heading>
      <Card>
        <CardBody>
          <Heading size={"md"} textAlign={"center"}>
            Detailed Review
          </Heading>
          <br />
          <Table variant={"unstyled"}>
            <Thead>
              <Tr>
                <Th className="w-4/12">Title</Th>
                <Th>Total</Th>
                <Th>Average</Th>
                <Th>Shortest</Th>
                <Th>Longest</Th>
              </Tr>
            </Thead>
            <Tbody>
              {testResponse.body.map((e, i) => {
                const grpMarks = e.scoreData.marks;
                return (
                  <>
                    {e.hasOpted !== false && (
                      <>
                        <Tr
                          key={i}
                          className="font-bold border-t-2 border-t-neutral-200"
                        >
                          <Td>{e.groupName}</Td>
                          <Td>{e.timeSpent}s</Td>
                          <Td>{1}</Td>
                          <Td>{1}</Td>
                          <Td>{grpMarks.total}</Td>
                        </Tr>
                        {e.sections.map((f, j) => {
                          const secMarks = f.scoreData.marks;
                          return (
                            <>
                              {f.selected !== false && (
                                <Tr key={j}>
                                  <Td>{f.sectionName}</Td>
                                  <Td>{1}</Td>
                                  <Td>{1}</Td>
                                  <Td>{1}</Td>
                                  <Td>{secMarks.total}</Td>
                                </Tr>
                              )}
                            </>
                          );
                        })}
                      </>
                    )}
                  </>
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default TimeStats;
