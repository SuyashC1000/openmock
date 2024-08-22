import {
  Card,
  CardBody,
  Heading,
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
import { MyResponsiveLine } from "../_components/charts/Line";
import { ResponsiveLine } from "@nivo/line";
import { Evaluation } from "@/lib/enums";

const TimeStats = () => {
  const testResponse = React.useContext(activeTestResponseContext);

  const generateTimelineData = (statusCondition: any) => {
    let minuteArray = [];
    const testTimeTaken = Math.ceil(
      (testResponse.timestamps.testEndTime -
        testResponse.timestamps.testStartTime) /
        60000
    );
    for (let i = 0; i < testTimeTaken; i++) {
      minuteArray.push({ x: i, y: 0 });
    }

    testResponse.body.forEach((e, i) => {
      if (e.hasOpted !== false)
        e.sections.forEach((f, j) => {
          if (f.selected !== false) {
            f.questions.forEach((g, k) => {
              if (g.lastAnswered !== null && g.submit !== null) {
                if (
                  !(
                    statusCondition !== null && g.evaluation !== statusCondition
                  )
                ) {
                  const timestampInTestMinutes = Math.floor(
                    (g.lastAnswered - testResponse.timestamps.testStartTime) /
                      60000
                  );
                  minuteArray[timestampInTestMinutes].y += 1;
                }
              }
            });
          }
        });
    });

    return minuteArray;
  };

  const timelineData = [
    {
      id: "Incorrect",
      data: generateTimelineData(Evaluation.Incorrect),
    },
    {
      id: "All",
      data: generateTimelineData(null),
    },
    {
      id: "Correct",
      data: generateTimelineData(Evaluation.Correct),
    },
  ];

  return (
    <div>
      <Heading size={"lg"}>Time Stats</Heading>
      <br />
      <Card>
        <CardBody>
          <Heading size={"md"} textAlign={"center"}>
            Test Timeline
          </Heading>
          <Text>{JSON.stringify(generateTimelineData())}</Text>
          <div style={{ height: 400, width: 1000 }}>
            <ResponsiveLine
              data={timelineData}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                reverse: false,
              }}
              yFormat=" >-.2f"
              curve="natural"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Time elapsed (in min)",
                legendOffset: 36,
                legendPosition: "middle",
                truncateTickAt: 0,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Questions",
                legendOffset: -40,
                legendPosition: "middle",
                truncateTickAt: 0,
              }}
              lineWidth={3}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              colors={{ scheme: "set1" }}
              pointBorderColor={{ from: "serieColor" }}
              pointLabel="data.yFormatted"
              pointLabelYOffset={-12}
              areaOpacity={0.05}
              enableSlices="x"
              enableTouchCrosshair={true}
              useMesh={true}
              legends={[]}
            />
          </div>
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
