import React from "react";
import { activeTestResponseContext, SuppliedTestPaperContext } from "./page";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  Grid,
  GridItem,
  Heading,
  Icon,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Select,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
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
import { TbCheck, TbX } from "react-icons/tb";
import Marks from "../_components/Marks";
import "katex/dist/katex.min.css";

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
            responseQuestion.submit !== null
              ? `${responseQuestion.submit}`
              : undefined
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

  React.useEffect(() => {
    let initialList: [number, number, number][] = [];
    const initialQuestionIndex = 2;

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
      <Breadcrumb className=" w-fit px-3 rounded-full">
        <BreadcrumbItem>
          <Select
            value={activeQIndex[0]}
            size={"sm"}
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
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Select
            value={activeQIndex[1]}
            size={"sm"}
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
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Select
            value={activeQIndex[2]}
            size={"sm"}
            variant={"flushed"}
            onChange={(e) => {
              console.log([activeQIndex[0], activeQIndex[1], +e.target.value]);

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
                  Question {i + 1}
                </option>
              );
            })}
          </Select>
        </BreadcrumbItem>
      </Breadcrumb>
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
        </CardBody>
      </Card>
      <br />
      <Card>
        <CardBody>
          <Heading size={"sm"}>Remarks:</Heading>
          <Grid templateColumns={"repeat(auto-fill, minmax(14rem, 1fr))"}>
            <StatsCard label="Evaluation" content={evaluationMsg} />
            <StatsCard
              label="Marks awarded"
              content={Marks([qResponse.marks, 1], "element")}
            />
            <StatsCard label="Time taken" content={qResponse.timeSpent + "s"} />
          </Grid>
        </CardBody>
      </Card>
    </div>
  );
};

export default QuestionReview;
