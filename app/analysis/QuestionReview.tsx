import React from "react";
import { activeTestResponseContext, SuppliedTestPaperContext } from "./page";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Select,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
  Text,
} from "@chakra-ui/react";
import { TestResponse, TestResponseQuestion } from "../_interface/testResponse";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  getActivePaperByIndex,
  getActiveResponseByIndex,
} from "../_functions/getActiveCacheAdvanced";
import { TestPaperQuestion } from "../_interface/testData";
import { Evaluation, QDataTypes } from "@/lib/enums";
import {
  TbAdjustments,
  TbAdjustmentsHorizontal,
  TbCaretLeft,
  TbCaretLeftFilled,
  TbCaretRightFilled,
  TbCheck,
  TbLanguage,
  TbX,
} from "react-icons/tb";
import Marks from "../_components/Marks";
import "katex/dist/katex.min.css";
import { getTagDataByID } from "../_functions/getTagData";

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

const ResponseReview = ({
  paperQuestion,
  responseQuestion,
  languageIndex,
}: {
  paperQuestion: TestPaperQuestion;
  responseQuestion: TestResponseQuestion;
  languageIndex: number;
}) => {
  const qDataType = paperQuestion.qDataType[0];

  return (
    <>
      {qDataType === QDataTypes.SingleCorrectOption && (
        <RadioGroup
          value={
            responseQuestion.submit !== null ? `${responseQuestion.submit}` : ""
          }
        >
          {paperQuestion.options!.map((e, i) => {
            const isCorrect = i === paperQuestion.answer;

            return (
              <Card key={i} variant={"outline"} className="my-4" size={"sm"}>
                <CardBody>
                  <Radio value={`${i}`} readOnly>
                    <Text>
                      <Markdown
                        className={"font-serif text-lg"}
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {e[languageIndex]}
                      </Markdown>
                    </Text>
                    <Badge colorScheme={isCorrect ? "green" : "red"}>
                      <Icon as={isCorrect ? TbCheck : TbX} />{" "}
                      {isCorrect ? "Correct" : "Incorrect"}
                    </Badge>
                  </Radio>
                </CardBody>
              </Card>
            );
          })}
        </RadioGroup>
      )}
      {qDataType === QDataTypes.MultipleCorrectOptions && (
        <CheckboxGroup
          value={
            responseQuestion.submit !== null
              ? (responseQuestion.submit as number[]).map((e) => `${e}`)
              : undefined
          }
        >
          {paperQuestion.options!.map((e, i) => {
            const isCorrect = (paperQuestion.answer as number[]).includes(i);

            return (
              <Card key={i} variant={"outline"} className="my-4" size={"sm"}>
                <CardBody>
                  <Checkbox value={`${i}`} readOnly>
                    <Text>
                      <Markdown
                        className={"font-serif text-lg"}
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {e[languageIndex]}
                      </Markdown>
                    </Text>
                    <Badge colorScheme={isCorrect ? "green" : "red"}>
                      <Icon as={isCorrect ? TbCheck : TbX} />{" "}
                      {isCorrect ? "Correct" : "Incorrect"}
                    </Badge>
                  </Checkbox>
                </CardBody>
              </Card>
            );
          })}
        </CheckboxGroup>
      )}
      {qDataType === QDataTypes.NumericalValue && (
        <div className="m-2">
          <NumberInput value={paperQuestion.answer as number}>
            <Text>Correct answer:</Text>
            <NumberInputField readOnly />
          </NumberInput>
          <br />

          <NumberInput
            value={
              responseQuestion.submit !== null
                ? (responseQuestion.submit as number)
                : "-"
            }
          >
            <Text>Your answer:</Text>
            <NumberInputField readOnly />
          </NumberInput>
        </div>
      )}
    </>
  );
};

const QuestionReview = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const testPaper = React.useContext(SuppliedTestPaperContext);

  const [finalQIndexList, setFinalQIndexList] = React.useState<
    [number, number, number][]
  >([[0, 0, 0]]);

  const [activeQIndex, setactiveQIndex] = React.useState<
    [number, number, number]
  >([0, 0, 0]);

  const [qPaper, setQPaper] = React.useState<TestPaperQuestion>(
    getActivePaperByIndex(testPaper, activeQIndex) as TestPaperQuestion
  );

  const [qResponse, setQResponse] = React.useState(
    getActiveResponseByIndex(testResponse, activeQIndex) as TestResponseQuestion
  );

  const [languageIndex, setLanguageIndex] = React.useState(0);

  const evaluationMsg =
    qResponse.evaluation === Evaluation.Correct
      ? "Correct"
      : qResponse.evaluation === Evaluation.Incorrect
        ? "Incorrect"
        : qResponse.evaluation === Evaluation.Partial
          ? "Partial"
          : qResponse.evaluation === Evaluation.Unattempted
            ? "Unattempted"
            : "Error";

  const solutionMsg: string =
    qPaper.solution !== null && qPaper.solution.length !== 0
      ? qPaper.solution[languageIndex]
      : "(Solution not provided)";

  function handleUpdateIndexList(newIndexList: [number, number, number]): void {
    console.log(newIndexList);

    setactiveQIndex(newIndexList);
    setQPaper(
      getActivePaperByIndex(testPaper, newIndexList) as TestPaperQuestion
    );
    setQResponse(
      getActiveResponseByIndex(
        testResponse,
        newIndexList
      ) as TestResponseQuestion
    );
  }

  function deviateIndexList(indexType: 0 | 1 | 2, nature: "inc" | "dec") {
    let newIndex = activeQIndex;
    let validIndexLists = finalQIndexList;

    if (indexType === 1) {
      validIndexLists = validIndexLists.filter((e) => e[2] == 0);
    } else if (indexType === 0) {
      validIndexLists = validIndexLists.filter((e) => e[2] == 0 && e[1] == 0);
    }

    const indexPlace = validIndexLists.indexOf(activeQIndex);

    if (nature === "inc") {
      if (indexPlace < validIndexLists.length - 1) {
        newIndex = validIndexLists[indexPlace + 1];
      } else {
        newIndex = validIndexLists[0];
      }
    } else if (nature === "dec") {
      if (indexPlace > 0) {
        newIndex = validIndexLists[indexPlace - 1];
      } else {
        newIndex = validIndexLists[validIndexLists.length - 1];
      }
    }

    handleUpdateIndexList(newIndex);
  }

  React.useEffect(() => {
    let initialList: [number, number, number][] = [];
    const initialQuestionIndex = 0;

    testResponse.body.forEach((e, i) => {
      e.sections.forEach((f, j) => {
        f.questions.forEach((g, k) => {
          initialList.push([i, j, k]);
        });
      });
    });

    setFinalQIndexList(initialList);
    setactiveQIndex(initialList[initialQuestionIndex]);
    setQPaper(
      getActivePaperByIndex(
        testPaper,
        initialList[initialQuestionIndex]
      ) as TestPaperQuestion
    );
    setQResponse(
      getActiveResponseByIndex(
        testResponse,
        initialList[initialQuestionIndex]
      ) as TestResponseQuestion
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div
        className="flex justify-between items-center sticky top-2 z-10 px-3 py-1 rounded-xl
       bg-neutral-100 border-2 border-neutral-300"
      >
        <Breadcrumb className=" w-fit px-3 rounded-full">
          <BreadcrumbItem>
            <Button
              size={"sm"}
              p={0}
              variant={"ghost"}
              colorScheme="blackAlpha"
              onClick={() => {
                deviateIndexList(0, "dec");
              }}
            >
              <Icon fontSize={"lg"} as={TbCaretLeftFilled} />
            </Button>
            <Select
              value={activeQIndex[0]}
              size={"sm"}
              w={"12rem"}
              variant={"flushed"}
              onChange={(e) => {
                handleUpdateIndexList([+e.target.value, 0, 0]);
              }}
            >
              {testPaper.body.map((e, i) => {
                return (
                  <option value={i} key={i}>
                    {e.groupName}
                  </option>
                );
              })}
            </Select>
            <Button
              size={"sm"}
              p={0}
              variant={"ghost"}
              colorScheme="blackAlpha"
              onClick={() => {
                deviateIndexList(0, "inc");
              }}
            >
              <Icon fontSize={"lg"} as={TbCaretRightFilled} />
            </Button>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Button
              size={"sm"}
              p={0}
              variant={"ghost"}
              colorScheme="blackAlpha"
              onClick={() => {
                deviateIndexList(1, "dec");
              }}
            >
              <Icon fontSize={"lg"} as={TbCaretLeftFilled} />
            </Button>
            <Select
              value={activeQIndex[1]}
              size={"sm"}
              w={"12rem"}
              variant={"flushed"}
              onChange={(e) => {
                handleUpdateIndexList([activeQIndex[0], +e.target.value, 0]);
              }}
            >
              {testPaper.body[activeQIndex[0]].sections.map((e, i) => {
                return (
                  <option value={i} key={i}>
                    {e.sectionName}
                  </option>
                );
              })}
            </Select>
            <Button
              size={"sm"}
              p={0}
              variant={"ghost"}
              colorScheme="blackAlpha"
              onClick={() => {
                deviateIndexList(1, "inc");
              }}
            >
              <Icon fontSize={"lg"} as={TbCaretRightFilled} />
            </Button>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Button
              size={"sm"}
              p={0}
              variant={"ghost"}
              colorScheme="blackAlpha"
              onClick={() => {
                deviateIndexList(2, "dec");
              }}
            >
              <Icon fontSize={"lg"} as={TbCaretLeftFilled} />
            </Button>
            <Select
              value={activeQIndex[2]}
              size={"sm"}
              w={"5rem"}
              variant={"flushed"}
              onChange={(e) => {
                handleUpdateIndexList([
                  activeQIndex[0],
                  activeQIndex[1],
                  +e.target.value,
                ]);
              }}
            >
              {testPaper.body[activeQIndex[0]].sections[
                activeQIndex[1]
              ].questions.map((e, i) => {
                return (
                  <option value={i} key={i}>
                    Q{i + 1}
                  </option>
                );
              })}
            </Select>
            <Button
              size={"sm"}
              p={0}
              variant={"ghost"}
              colorScheme="blackAlpha"
              onClick={() => {
                deviateIndexList(2, "inc");
              }}
            >
              <Icon fontSize={"lg"} as={TbCaretRightFilled} />
            </Button>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="flex justify-center items-center gap-5">
          <Select
            w={"fit"}
            variant={"unstyled"}
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
          </Select>
        </div>
      </div>

      {(testResponse.body[activeQIndex[0]].hasOpted === false ||
        testResponse.body[activeQIndex[0]].sections[activeQIndex[1]]
          .selected === false) && (
        <Alert status="error" mt={2}>
          <AlertIcon />
          <AlertDescription>
            This{" "}
            {testResponse.body[activeQIndex[0]].hasOpted === false
              ? "group"
              : testResponse.body[activeQIndex[0]].sections[activeQIndex[1]]
                    .selected === false
                ? "section"
                : ""}{" "}
            has not been evaluated.
          </AlertDescription>
        </Alert>
      )}
      <br />
      <Card>
        <CardBody>
          <Heading size={"sm"}>Question:</Heading>
          <Text>
            <Markdown
              className={"font-serif text-lg"}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {
                (
                  getActivePaperByIndex(
                    testPaper,
                    activeQIndex
                  ) as TestPaperQuestion
                ).question[languageIndex]
              }
            </Markdown>
          </Text>
          {qPaper.tags.length > 0 && (
            <div className="flex items-center gap-3 mt-3">
              <Text>Tags:</Text>
              <HStack spacing={2}>
                {qPaper.tags.map((e, i) => {
                  const tag = getTagDataByID(testPaper, e)!;

                  return (
                    <Tag key={tag.id} bgColor={tag.color}>
                      {tag.label}
                    </Tag>
                  );
                })}
              </HStack>
            </div>
          )}
        </CardBody>
      </Card>
      <br />
      <Card>
        <CardBody>
          <Heading size={"sm"}>Response:</Heading>
          <ResponseReview
            paperQuestion={qPaper}
            responseQuestion={qResponse}
            languageIndex={languageIndex}
          />
          <br />
          <Box>
            <Grid templateColumns={"repeat(auto-fill, minmax(14rem, 1fr))"}>
              <StatsCard label="Evaluation" content={evaluationMsg} />
              <StatsCard
                label="Marks awarded"
                content={Marks([qResponse.marks, 1], "element")}
              />
              <StatsCard
                label="Time taken"
                content={qResponse.timeSpent + "s"}
              />
            </Grid>
          </Box>
        </CardBody>
      </Card>
      <br />
      <Card>
        <CardBody>
          <Heading size={"sm"}>Solution:</Heading>
          <Text>
            <Markdown
              className={"font-serif text-lg"}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {solutionMsg}
            </Markdown>
          </Text>
        </CardBody>
      </Card>
    </div>
  );
};

export default QuestionReview;
