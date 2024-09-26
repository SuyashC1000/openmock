import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { Step3DataProps } from "./Step3";
import { DraftStateContext } from "./page";
import { TbPlus, TbTrash } from "react-icons/tb";
import { TestPaper, TestPaperQuestion } from "@/app/_interface/testData";
import { uniqueId } from "@/app/_functions/randomGenerator";
import { QDataTypes } from "@/lib/enums";
import { useFieldArray, useFormContext } from "react-hook-form";

interface Props {
  step3Data: Step3DataProps;
  setStep3Data: Dispatch<SetStateAction<Step3DataProps>>;
}

const QuestionEditor = ({ step3Data, setStep3Data }: Props) => {
  const state = React.useContext(DraftStateContext);

  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<TestPaper>();

  const fieldsData = watch(
    `body.${step3Data.sectionLocation?.[0]}.sections.${step3Data.sectionLocation?.[1]}.questions`
  );

  const { fields, move, replace, append, remove, insert, update } =
    useFieldArray({
      name: `body.${step3Data.sectionLocation?.[0]}.sections.${step3Data.sectionLocation?.[1]}.questions`,
    });

  function questionGenerator(): TestPaperQuestion {
    let final: TestPaperQuestion = {
      id: `q${uniqueId(10)}`,
      qDataType: step3Data.preferences.questionType,
      markingScheme: step3Data.preferences.markingScheme,
      qTypeName: step3Data.preferences.questionTypeName,
      question: Array(state.languages.length).fill(""),
      solution: Array(state.languages.length).fill(""),
      answer: step3Data.preferences.answer,
      options:
        step3Data.preferences.questionType[0] === QDataTypes.NumericalValue
          ? null
          : Array(step3Data.preferences.questionType[1]).fill(""),
      tags: [],
    };
    return final;
  }

  function locateQuestionIndex(): number {
    return fieldsData.findIndex((e) => e.id === step3Data.questionData?.id);
  }

  function handleAddQuestion(): void {
    const orgIndex: number = locateQuestionIndex();
    const finalIndex = orgIndex !== -1 ? orgIndex + 1 : fieldsData.length;
    const newQuestion: TestPaperQuestion = questionGenerator();

    insert(finalIndex, newQuestion);

    setStep3Data((e) => {
      return {
        ...e,
        questionData: newQuestion,
      };
    });
  }

  function handleDeleteQuestion(): void {
    const orgIndex: number = locateQuestionIndex();
    const questionsCount = fieldsData.length;

    const prevQuestion =
      questionsCount > 1 && orgIndex > 0
        ? fieldsData[orgIndex - 1]
        : questionsCount > 1 && orgIndex == 0
          ? fieldsData[1]
          : undefined;

    remove(orgIndex);
    setStep3Data((e) => {
      return {
        ...e,
        questionData: prevQuestion,
      };
    });
  }

  return (
    <Card flex={1}>
      <CardBody>
        <Heading size={"md"} fontWeight={"medium"}>
          Question Editor
        </Heading>

        <ButtonGroup
          isDisabled={step3Data.sectionLocation === undefined}
          mb={3}
        >
          <Button
            size="sm"
            colorScheme="green"
            leftIcon={<TbPlus />}
            onClick={handleAddQuestion}
          >
            Add New Question
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            leftIcon={<TbTrash />}
            isDisabled={step3Data.questionData === undefined}
            onClick={handleDeleteQuestion}
          >
            Delete Question
          </Button>
        </ButtonGroup>

        <br />

        {step3Data.sectionLocation !== undefined &&
        step3Data.questionData !== undefined ? (
          <div></div>
        ) : step3Data.sectionLocation !== undefined &&
          step3Data.questionData === undefined ? (
          <div>
            <Alert status="info" size={"sm"}>
              <AlertIcon />
              <AlertDescription>
                <Text>
                  Click on the &apos;Add New Question&apos; button or any
                  existing question from the sidebar
                </Text>
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div>
            <Alert status="info" size={"sm"}>
              <AlertIcon />
              <AlertDescription>
                <Text>
                  Please select a section or a question from the sidebar
                </Text>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <Text>{JSON.stringify(step3Data)}</Text>
      </CardBody>
    </Card>
  );
};

export default QuestionEditor;
