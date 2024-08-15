import {
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { activeTestResponseContext } from "./page";
import Marks from "../_components/Marks";
import { MyResponsiveSunburst } from "../_components/charts/Sunburst";
import { TestResponse } from "../_interface/testResponse";
import { MyResponsivePie } from "../_components/charts/PieChart";

const StatsCard = ({
  label,
  content,
  footnote,
}: {
  label: string;
  content: any;
  footnote?: string;
}) => {
  return (
    <GridItem>
      <Card size="sm">
        <CardBody>
          <Stat>
            <StatLabel>{label}</StatLabel>
            <StatNumber>{content}</StatNumber>
            {footnote !== undefined && <StatHelpText>{footnote}</StatHelpText>}
          </Stat>
        </CardBody>
      </Card>
    </GridItem>
  );
};

const MarksStats = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const scoreData = testResponse.scoreData;

  return (
    <div>
      <Heading size={"lg"}>Marks Stats</Heading>
      <Card>
        <CardBody>
          <Heading size={"md"} textAlign={"center"}>
            At a Glance
          </Heading>
          <br />
          <Grid
            templateColumns={"repeat(auto-fill, minmax(14rem, 1fr))"}
            width={"full"}
            gap={2}
          >
            <StatsCard label="Marks scored" content={scoreData.marks.total} />
            <StatsCard label="Total marks" content={scoreData.marks.max} />
            <StatsCard
              label="Marks (Correct)"
              content={Marks([scoreData.marks.correct, 1], "element")}
            />
            <StatsCard
              label="Marks (Incorrect)"
              content={Marks([scoreData.marks.incorrect, 1], "element")}
            />
            <StatsCard
              label="Marks (Partial)"
              content={Marks([scoreData.marks.partial, 1], "element")}
            />
            <StatsCard
              label="Marks Percentage"
              content={
                ((scoreData.marks.total * 100) / scoreData.marks.max).toFixed(
                  2
                ) + "%"
              }
            />
          </Grid>
        </CardBody>
      </Card>
      <br />
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
                <Th>Correct</Th>
                <Th>Incorrect</Th>
                <Th>Partial</Th>
                <Th>Total</Th>
                <Th>Max</Th>
                <Th>%age</Th>
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
                          key={e.groupName}
                          className="font-bold border-t-2 border-t-neutral-200"
                        >
                          <Td>{e.groupName}</Td>
                          <Td>{Marks([grpMarks.correct, 1], "element")}</Td>
                          <Td>{Marks([grpMarks.incorrect, 1], "element")}</Td>
                          <Td>{Marks([grpMarks.partial, 1], "element")}</Td>
                          <Td>{grpMarks.total}</Td>
                          <Td>{grpMarks.max}</Td>
                          <Td>
                            {((grpMarks.total * 100) / grpMarks.max).toFixed(0)}
                            %
                          </Td>
                        </Tr>
                        {e.sections.map((f, j) => {
                          const secMarks = f.scoreData.marks;
                          return (
                            <>
                              {f.selected !== false && (
                                <Tr key={f.sectionName}>
                                  <Td>{f.sectionName}</Td>
                                  <Td>
                                    {Marks([secMarks.correct, 1], "element")}
                                  </Td>
                                  <Td>
                                    {Marks([secMarks.incorrect, 1], "element")}
                                  </Td>
                                  <Td>
                                    {Marks([secMarks.partial, 1], "element")}
                                  </Td>
                                  <Td>{secMarks.total}</Td>
                                  <Td>{secMarks.max}</Td>
                                  <Td>
                                    {(
                                      (secMarks.total * 100) /
                                      secMarks.max
                                    ).toFixed(0)}
                                    %
                                  </Td>
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

export default MarksStats;
