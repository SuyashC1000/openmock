import React from "react";
import { activeTestResponseContext, SuppliedTestPaperContext } from "./page";
import {
  Button,
  Card,
  CardBody,
  Container,
  Grid,
  GridItem,
  Heading,
  Icon,
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
  useDisclosure,
} from "@chakra-ui/react";
import { MyResponsivePie } from "../../_components/charts/PieChart";
import { ScoreData } from "../../_functions/calculateScoreData";
import { formatPieChartData } from "../../_functions/formatChartData";
import MDViewer from "@/app/_components/MDViewer";
import { TbInfoCircle, TbList } from "react-icons/tb";

const Summary = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const testPaper = React.useContext(SuppliedTestPaperContext);

  const scoreData: ScoreData = testResponse.scoreData;

  const [languageIndex, setLanguageIndex] = React.useState(0);

  const customScoreData = testPaper.analysis.customEvaluation;

  const customValidationValue: number =
    customScoreData?.basis === "marks"
      ? scoreData.marks.total
      : customScoreData?.basis === "percentage"
        ? Math.floor((scoreData.marks.total / scoreData.marks.max) * 100)
        : 0;

  const validCustomScoreDataTierIndex: number =
    customScoreData?.data.findIndex((tier) => {
      return (
        customValidationValue >= tier.range[0] &&
        customValidationValue <= tier.range[1]
      );
    }) ?? 0;

  const { isOpen, onOpen, onClose } = useDisclosure();

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

        {customScoreData !== undefined && (
          <>
            <br />
            <Card>
              <CardBody textAlign={"center"}>
                {validCustomScoreDataTierIndex !== -1 ? (
                  customScoreData.data.map((tier, index) => {
                    if (index === validCustomScoreDataTierIndex)
                      return (
                        <Container key={index}>
                          <Text fontSize={"xl"} fontWeight={"semibold"}>
                            {customScoreData.type === "rank"
                              ? "Top"
                              : customScoreData.type === "custom"
                                ? "Remark:"
                                : ""}
                          </Text>
                          <Heading size={"2xl"}>{tier.label}</Heading>

                          <Text fontSize={"xl"} fontWeight={"semibold"}>
                            {customScoreData.type === "grade"
                              ? "Grade"
                              : customScoreData.type === "percentile"
                                ? "Percentile"
                                : ""}
                          </Text>
                        </Container>
                      );
                  })
                ) : (
                  <Text fontSize={"xl"}>No tier assigned</Text>
                )}
                <Text>Based on your {customScoreData.basis}</Text>

                <Button
                  position={"absolute"}
                  top={2}
                  right={2}
                  variant={"ghost"}
                  colorScheme="blue"
                  onClick={onOpen}
                >
                  <TbList size={20} />
                </Button>
              </CardBody>
            </Card>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <Heading size="lg">Evaluation Tiers</Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    <strong>Based on: </strong>
                    {customScoreData.basis === "marks" ? "Marks" : "Percentage"}
                  </Text>
                  <Text>
                    <strong>Tier type: </strong>
                    {customScoreData.type === "grade"
                      ? "Grade"
                      : customScoreData.type === "percentile"
                        ? "Percentile"
                        : customScoreData.type === "rank"
                          ? "Rank"
                          : "Remark"}
                  </Text>
                  <br />
                  <Table size={"sm"} variant={"striped"}>
                    <Thead>
                      <Tr>
                        <Th>Tier</Th>
                        <Th>Range</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {customScoreData.data.map((tier, index) => (
                        <Tr key={index}>
                          <Td>{tier.label}</Td>
                          <Td>
                            {tier.range[0]}
                            {customScoreData.basis === "percentage"
                              ? "%"
                              : ""}{" "}
                            - {tier.range[1]}
                            {customScoreData.basis === "percentage" ? "%" : ""}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </ModalBody>

                <ModalFooter justifyContent={"left"}>
                  <Icon as={TbInfoCircle} mr={1} />
                  <Text>
                    The evaluation tier has been manually created by the
                    author(s)
                  </Text>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}

        {testPaper.analysis.postTestMessage[languageIndex].length > 0 && (
          <>
            <br />
            <Card>
              <CardBody>
                <div className="flex items-center justify-between">
                  <Heading size={"md"}>Test Review</Heading>
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
                <MDViewer
                  content={testPaper.analysis.postTestMessage[languageIndex]}
                />
              </CardBody>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;
