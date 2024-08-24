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
  VStack,
} from "@chakra-ui/react";
import { MyResponsivePie } from "../_components/charts/PieChart";
import { calculateScoreData } from "../_functions/calculateScoreData";
import { TestPaper } from "../_interface/testData";
import { TestResponse } from "../_interface/testResponse";
import { formatPieChartData } from "../_functions/formatChartData";
import Marks from "../_components/Marks";
import { ST } from "next/dist/shared/lib/utils";

const Summary = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const testPaper = React.useContext(SuppliedTestPaperContext);

  const scoreData = testResponse.scoreData;

  const [languageIndex, setLanguageIndex] = React.useState(0);

  return (
    <div>
      <Heading size={"lg"}>Summary</Heading>

      <div className="w-full flex flex-col gap-3 m-1">
        <Grid gap={3} templateColumns={"repeat(auto-fit, minmax(10rem, 1fr))"}>
          <GridItem>
            <Card
              alignItems={"center"}
              justifyContent={"center"}
              textAlign={"center"}
            >
              <CardBody>
                <Text>Score</Text>
                <div style={{ height: 150, width: 300 }}>
                  <MyResponsivePie
                    data={formatPieChartData(testPaper, testResponse, "marks")}
                    isHalf={true}
                  />
                </div>
                <Heading>
                  {scoreData.marks.total} / {scoreData.marks.max}
                </Heading>
                <Heading size={"md"}>Marks</Heading>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card
              alignItems={"center"}
              justifyContent={"center"}
              textAlign={"center"}
            >
              <CardBody>
                <Text>Questions</Text>
                <div style={{ height: 150, width: 300 }}>
                  <MyResponsivePie
                    data={formatPieChartData(
                      testPaper,
                      testResponse,
                      "questions"
                    )}
                    isHalf={true}
                  />
                </div>
                <Heading>
                  {scoreData.questions.correct +
                    scoreData.questions.incorrect +
                    scoreData.questions.partial}{" "}
                  / {scoreData.questions.total}
                </Heading>
                <Heading size={"md"}>Qs attempted</Heading>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card
              alignItems={"center"}
              justifyContent={"center"}
              textAlign={"center"}
            >
              <CardBody>
                <Text>Time</Text>
                <div style={{ height: 150, width: 300 }}>
                  <MyResponsivePie
                    data={formatPieChartData(testPaper, testResponse, "time")}
                    isHalf={true}
                  />
                </div>
                <Heading>
                  {Math.floor(
                    (testResponse.timestamps.testEndTime -
                      testResponse.timestamps.testStartTime) /
                      60000
                  )}{" "}
                  / {testPaper.maxMetrics.time}
                </Heading>
                <Heading size={"md"}>Mins taken</Heading>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        <Grid gap={3} templateColumns={"repeat(auto-fit, minmax(10rem, 1fr))"}>
          <GridItem>
            <Card
              alignItems={"center"}
              justifyContent={"center"}
              textAlign={"center"}
            >
              <CardBody>
                <Text>Percentage</Text>
                <Heading>
                  {(
                    (scoreData.marks.total * 100) /
                    scoreData.marks.max
                  ).toFixed(2)}
                  %
                </Heading>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem>
            <Card
              alignItems={"center"}
              justifyContent={"center"}
              textAlign={"center"}
            >
              <CardBody>
                <Text>Accuracy</Text>
                <Heading>
                  {(
                    (scoreData.questions.correct * 100) /
                    (scoreData.questions.correct +
                      scoreData.questions.incorrect +
                      scoreData.questions.partial)
                  ).toFixed(2)}
                  %
                </Heading>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
        {testPaper.analysis.postTestMessage !== undefined && (
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <Heading size={"md"}>Message</Heading>
                <select
                  onChange={(e) => {
                    setLanguageIndex(+e.target.value);
                  }}
                >
                  {testPaper.languages.map((e, i) => {
                    return (
                      <option value={i} key={i}>
                        {e}
                      </option>
                    );
                  })}
                </select>
              </div>
              <Text>{testPaper.analysis.postTestMessage[languageIndex]}</Text>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Summary;
