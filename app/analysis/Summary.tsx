import React from "react";
import { activeTestResponseContext, SuppliedTestPaperContext } from "./page";
import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { MyResponsivePie } from "../_components/charts/PieChart";
import { calculateScoreData } from "../_functions/calculateScoreData";
import { TestPaper } from "../_interface/testData";
import { TestResponse } from "../_interface/testResponse";
import { formatPieChartData } from "../_functions/formatChartData";
import Marks from "../_components/Marks";
import { ST } from "next/dist/shared/lib/utils";

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

const Summary = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const testPaper = React.useContext(SuppliedTestPaperContext);

  const getScoreData = React.useCallback(
    (testPaper: TestPaper, testResponse: TestResponse) => {
      return calculateScoreData(testPaper, testResponse);
    },
    []
  );
  const scoreData = getScoreData(testPaper, testResponse);

  return (
    <div>
      <Heading size={"lg"}>Summary</Heading>

      <Card>
        <CardBody>{JSON.stringify({ ...testPaper, ...testResponse })}</CardBody>
      </Card>

      {/* <Grid gap={3} templateColumns={"repeat(auto-fit, minmax(10rem, 1fr))"}>
        <Card
          size={"sm"}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
        >
          <CardBody>
            <Text>Score</Text>
            <div style={{ height: 120, width: 200 }}>
              <MyResponsivePie
                data={formatPieChartData(scoreData, "marks")}
                isHalf={true}
              />
            </div>
            <Heading>
              {scoreData.marks.total}/{scoreData.marks.max}
            </Heading>
          </CardBody>
        </Card>
      </Grid> */}

      {/* <div className="flex max-w-screen flex-col gap-4 m-3">
        <div className="flex max-w-screen gap-4">
          <Card className="flex-1 w-1/2">
            <CardBody>
              <Heading size={"lg"} fontWeight={"semibold"}>
                Marks Stats
              </Heading>
              <div className="flex">
                <div className="flex-1 m-2">
                  <Grid
                    gap={3}
                    templateColumns={
                      "repeat(auto-fill, minmax(min(10rem, 100%), 1fr))"
                    }
                  >
                    <StatsCard
                      label="Marks scored"
                      content={scoreData.marks.total}
                    />
                    <StatsCard
                      label="Total Marks"
                      content={scoreData.marks.max}
                    />
                    <StatsCard
                      label="Marks (Correct)"
                      content={Marks(
                        [scoreData.marks.correct + scoreData.marks.partial, 1],
                        "element"
                      )}
                    />
                    <StatsCard
                      label="Marks (Incorrect)"
                      content={Marks([scoreData.marks.incorrect, 1], "element")}
                    />
                    <StatsCard
                      label="Marks missed"
                      content={
                        scoreData.marks.max - Math.abs(scoreData.marks.total)
                      }
                    />
                    <StatsCard
                      label="Percentage"
                      content={
                        (
                          (100 * scoreData.marks.total) /
                          scoreData.marks.max
                        ).toFixed(2) + "%"
                      }
                    />
                  </Grid>
                </div>
                <div className="flex-0" style={{ height: 250, width: 250 }}>
                  <MyResponsivePie
                    data={formatPieChartData(scoreData, "marks")}
                    isHalf={true}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="flex-1 w-1/2">
            <CardBody>
              <Heading size={"lg"} fontWeight={"semibold"}>
                Questions Stats
              </Heading>
              <div className="flex">
                <div className="flex-1 m-2">
                  <Grid
                    gap={3}
                    templateColumns={
                      "repeat(auto-fill, minmax(min(10rem, 100%), 1fr))"
                    }
                  >
                    <StatsCard
                      label="Correct Answers"
                      content={
                        scoreData.questions.correct +
                        scoreData.questions.partial
                      }
                    />
                    <StatsCard
                      label="Incorrect Answers"
                      content={scoreData.questions.incorrect}
                    />
                    <StatsCard
                      label="Attempted Questions"
                      content={
                        scoreData.questions.correct +
                        scoreData.questions.incorrect +
                        scoreData.questions.partial
                      }
                    />
                    <StatsCard
                      label="Unattempted Questions"
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
                          (100 *
                            (scoreData.questions.correct +
                              scoreData.questions.partial)) /
                          (scoreData.questions.correct +
                            scoreData.questions.partial +
                            scoreData.questions.incorrect)
                        ).toFixed(2) + "%"
                      }
                    />
                  </Grid>
                </div>
                <div className="flex-0" style={{ height: 250, width: 250 }}>
                  <MyResponsivePie
                    data={formatPieChartData(scoreData, "questions")}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div>
          <Card>
            <CardBody>
              <Grid
                gap={3}
                templateColumns={
                  "repeat(auto-fill, minmax(min(15rem, 100%), 1fr))"
                }
              >
                <StatsCard
                  label="Time Taken"
                  content={`${Math.floor(
                    (testResponse.timestamps.testEndTime -
                      testResponse.timestamps.testStartTime) /
                      (1000 * 60)
                  )} min
                          ${Math.floor(
                            ((testResponse.timestamps.testEndTime -
                              testResponse.timestamps.testStartTime) /
                              1000) %
                              60
                          )}
                          s`}
                />
                <StatsCard
                  label="Total Time"
                  content={testPaper.maxTime + " min"}
                />
              </Grid>
            </CardBody>
          </Card>
        </div>
      </div> */}
      {/* <Text>{JSON.stringify(scoreData)}</Text> */}
    </div>
  );
};

export default Summary;
