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
  Text,
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

const QuestionsStats = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const scoreData = testResponse.scoreData;

  return (
    <div>
      <Heading size={"lg"}>Questions Stats</Heading>
      <hr />
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
            <StatsCard
              label="Questions (Correct)"
              content={scoreData.questions.correct}
            />
            <StatsCard
              label="Questions (Incorrect)"
              content={scoreData.questions.incorrect}
            />
            <StatsCard
              label="Questions (Partial)"
              content={scoreData.questions.partial}
            />
            <StatsCard
              label="Questions (Unattempted)"
              content={scoreData.questions.unattempted}
            />
            <StatsCard
              label="Total Questions"
              content={scoreData.questions.total}
            />
            <StatsCard
              label="Accuracy"
              content={
                (
                  ((scoreData.questions.correct + scoreData.questions.partial) *
                    100) /
                  (scoreData.questions.correct +
                    scoreData.questions.partial +
                    scoreData.questions.incorrect)
                ).toFixed(2) + "%"
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
                <Th>Unattempted</Th>
                <Th>Total</Th>
                <Th>Accuracy</Th>
              </Tr>
            </Thead>
            <Tbody>
              {testResponse.body.map((e, i) => {
                const grpQues = e.scoreData.questions;
                return (
                  <>
                    {e.hasOpted !== false && (
                      <>
                        <Tr
                          key={i}
                          className="font-bold border-t-2 border-t-neutral-200"
                        >
                          <Td>{e.groupName}</Td>
                          <Td>{grpQues.correct}</Td>
                          <Td>{grpQues.incorrect}</Td>
                          <Td>{grpQues.partial}</Td>
                          <Td>{grpQues.unattempted}</Td>
                          <Td>{grpQues.total}</Td>
                          <Td>
                            {(
                              ((grpQues.correct + grpQues.partial) * 100) /
                              (grpQues.correct +
                                grpQues.partial +
                                grpQues.incorrect)
                            ).toFixed(0)}
                            %
                          </Td>
                        </Tr>
                        {e.sections.map((f, j) => {
                          const secQues = f.scoreData.questions;
                          return (
                            <>
                              {f.selected !== false && (
                                <Tr key={j}>
                                  <Td>{f.sectionName}</Td>
                                  <Td>{secQues.correct}</Td>
                                  <Td>{secQues.incorrect}</Td>
                                  <Td>{secQues.partial}</Td>
                                  <Td>{secQues.unattempted}</Td>
                                  <Td>{secQues.total}</Td>
                                  <Td>
                                    {(
                                      ((secQues.correct + secQues.partial) *
                                        100) /
                                      (secQues.correct +
                                        secQues.partial +
                                        secQues.incorrect)
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

export default QuestionsStats;
