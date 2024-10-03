import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Checkbox,
  Container,
  Flex,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { Step3DataProps } from "./Step3";
import { DraftStateContext } from "./page";
import { TbEdit, TbEye, TbPlus, TbTrash } from "react-icons/tb";
import { TestPaper, TestPaperQuestion } from "@/app/_interface/testData";
import { uniqueId } from "@/app/_functions/randomGenerator";
import { Evaluation, QDataTypes } from "@/lib/enums";
import { useFieldArray, useFormContext } from "react-hook-form";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import MDEditor from "@/app/_components/MDEditor";

interface Props {
  step3Data: Step3DataProps;
  setStep3Data: Dispatch<SetStateAction<Step3DataProps>>;
}

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

const QuestionEditor = ({ step3Data, setStep3Data }: Props) => {
  const state = React.useContext(DraftStateContext);

  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<TestPaper>();

  const sectionsFieldData = watch(
    `body.${step3Data.sectionLocation?.[0]}.sections.${step3Data.sectionLocation?.[1]}.questions`
  );

  const [isPreview, setIsPreview] = React.useState(false);
  const [isAdvanced, setIsAdvanced] = React.useState(false);

  const languages = watch(`languages`);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const { fields, move, replace, append, remove, insert, update } =
    useFieldArray({
      name: `body.${step3Data.sectionLocation?.[0]}.sections.${step3Data.sectionLocation?.[1]}.questions`,
    });

  function updateQuestion() {
    const index = sectionsFieldData.findIndex(
      (e) => e.id === step3Data.questionData!.id
    );
    update(index, step3Data.questionData);
  }

  function questionGenerator(): TestPaperQuestion {
    let final: TestPaperQuestion = {
      id: `q${uniqueId(10)}`,
      qDataType: [
        step3Data.preferences.questionType,
        step3Data.preferences.questionTypeProps[
          step3Data.preferences.questionType
        ],
      ],
      markingScheme: structuredClone(step3Data.preferences.markingScheme),
      qTypeName: step3Data.preferences.questionTypeName,
      question: Array(state.languages.length).fill(""),
      solution: Array(state.languages.length).fill(""),
      answer: step3Data.preferences.answer,
      options:
        step3Data.preferences.questionType === QDataTypes.NumericalValue
          ? null
          : Array(
              step3Data.preferences.questionTypeProps[
                step3Data.preferences.questionType
              ]
            ).fill(""),
      tags: [],
    };
    return final;
  }

  function locateQuestionIndex(): number {
    return sectionsFieldData.findIndex(
      (e) => e.id === step3Data.questionData?.id
    );
  }

  function handleAddQuestion(): void {
    const orgIndex: number = locateQuestionIndex();
    const finalIndex =
      orgIndex !== -1 ? orgIndex + 1 : sectionsFieldData.length;
    const newQuestion: TestPaperQuestion = questionGenerator();

    insert(finalIndex, newQuestion);

    setStep3Data((e) => {
      return {
        ...e,
        questionData: newQuestion,
      };
    });
  }

  function changeQuestionDataType(type: number): void {
    let copy = step3Data;
    copy.questionData!.qDataType[0] = type;
    copy.questionData!.qDataType[1] =
      step3Data.preferences.questionTypeProps[type];
    copy.questionData!.answer =
      type === QDataTypes.SingleCorrectOption
        ? 0
        : type === QDataTypes.MultipleCorrectOptions
          ? [0]
          : 0;

    switch (type) {
      case QDataTypes.SingleCorrectOption: {
        if (!isAdvanced) {
          copy.questionData!.qTypeName = "Single Correct Option";
        }
        break;
      }
      case QDataTypes.MultipleCorrectOptions: {
        if (!isAdvanced) {
          copy.questionData!.qTypeName = "Multiple Correct Options";
        }
        break;
      }
      case QDataTypes.NumericalValue: {
        if (!isAdvanced) {
          copy.questionData!.qTypeName = "Numerical Value";
        }
        copy.questionData!.options = null;
        break;
      }

      default:
        break;
    }

    setStep3Data(() => {
      return copy;
    });
  }

  function handleDeleteQuestion(): void {
    const orgIndex: number = locateQuestionIndex();
    const questionsCount = sectionsFieldData.length;

    const prevQuestion =
      questionsCount > 1 && orgIndex > 0
        ? sectionsFieldData[orgIndex - 1]
        : questionsCount > 1 && orgIndex == 0
          ? sectionsFieldData[1]
          : undefined;

    remove(orgIndex);
    setStep3Data((e) => {
      return {
        ...e,
        questionData: prevQuestion,
      };
    });
  }

  function handleOptionsIncrement(type: number) {
    setStep3Data((e) => {
      if (e.questionData!.qDataType[1] < 10) e.questionData!.qDataType[1]++;
      e.questionData!.options!.push(Array(languages.length).fill(""));
      return e;
    });
    updateQuestion();
  }

  function handleOptionsDecrement(type: number) {
    setStep3Data((e) => {
      let copy = e;
      if (e.questionData!.qDataType[1] > 2) {
        const newNumOfOptions = (e.questionData!.qDataType[1] -= 1);
        e.questionData!.qDataType[1] = newNumOfOptions;
        e.preferences.questionTypeProps[step3Data.preferences.questionType] =
          newNumOfOptions;
        e.questionData!.options!.pop();
      }

      if (type === QDataTypes.SingleCorrectOption) {
        if (
          (e.questionData!.answer as number) >
          e.questionData!.qDataType[1] - 1
        ) {
          e.questionData!.answer = (e.questionData!.answer as number) - 1;
        }
      } else if (type === QDataTypes.MultipleCorrectOptions) {
        if (
          (e.questionData!.answer as number[]).includes(
            e.questionData!.qDataType[1]
          )
        ) {
          e.questionData!.answer = (e.questionData!.answer as number[]).filter(
            (f) => f !== e.questionData!.qDataType[1]
          );
        }
      }

      return e;
    });
    updateQuestion();
  }

  return (
    <Card flex={1}>
      <CardBody>
        <Heading size={"md"} fontWeight={"medium"}>
          Question Editor
        </Heading>

        <Flex
          position={"sticky"}
          mt={1}
          top={3}
          alignItems={"center"}
          gap={2}
          bgColor={"white"}
          zIndex={5}
          p={2}
          rounded={"lg"}
          borderWidth={2}
          borderColor={"gray.200"}
        >
          <ButtonGroup
            isDisabled={step3Data.sectionLocation === undefined}
            alignItems={"center"}
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
          <ButtonGroup
            isAttached
            ml={"auto"}
            isDisabled={step3Data.questionData === undefined}
          >
            <Button
              size={"sm"}
              variant={"outline"}
              isActive={!isPreview}
              onClick={() => setIsPreview(false)}
            >
              <TbEdit size={18} />
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              isActive={isPreview}
              onClick={() => setIsPreview(true)}
            >
              <TbEye size={18} />
            </Button>
          </ButtonGroup>
          <Select
            maxW={"2xs"}
            size={"sm"}
            onChange={(f) => {
              setStep3Data((e) => {
                return { ...e, currentLanguage: +f.target.value };
              });
            }}
          >
            {languages.map((e, i) => (
              <option key={i} value={i}>
                {e}
              </option>
            ))}
          </Select>
        </Flex>

        <br />

        {step3Data.sectionLocation !== undefined &&
        step3Data.questionData !== undefined ? (
          <div>
            <Flex alignItems={"center"}>
              <Heading size={"md"}>Question</Heading>
            </Flex>

            <MDEditor
              isPreview={isPreview}
              content={
                step3Data.questionData.question[step3Data.currentLanguage]
              }
              onChange={(f) => {
                setStep3Data((e): Step3DataProps => {
                  let final = e;
                  e.questionData!.question[step3Data.currentLanguage] =
                    f.target.value;
                  return final;
                });
                updateQuestion();
              }}
            />

            <Flex gap={3} my={2}>
              <Box flexGrow={2}>
                <FormLabel>Question Type</FormLabel>
                <Select
                  size={"sm"}
                  value={step3Data.questionData.qDataType[0]}
                  onChange={(f) => {
                    {
                      changeQuestionDataType(+f.target.value);
                      updateQuestion();
                    }
                  }}
                >
                  <option value={QDataTypes.SingleCorrectOption}>
                    Single Correct Option
                  </option>
                  <option value={QDataTypes.MultipleCorrectOptions}>
                    Multiple Correct Options
                  </option>
                  <option value={QDataTypes.NumericalValue}>
                    Numerical Value
                  </option>
                </Select>
              </Box>
              {isAdvanced && (
                <Box flexGrow={1}>
                  <FormLabel>Question Type Name</FormLabel>
                  <Input
                    size={"sm"}
                    value={step3Data.questionData?.qTypeName}
                    onChange={(f) => {
                      setStep3Data((e) => {
                        return {
                          ...e,
                          questionData: {
                            ...e.questionData!,
                            qTypeName: f.target.value,
                          },
                        };
                      });
                      updateQuestion();
                    }}
                  />
                </Box>
              )}
            </Flex>

            <Heading size={"md"}>Marks</Heading>

            <Flex gap={3} my={2}>
              <Box flexGrow={1}>
                <FormLabel>Marks for Correct Answer</FormLabel>
                <Input
                  type="number"
                  color={"green"}
                  size={"sm"}
                  value={
                    step3Data.questionData.markingScheme[Evaluation.Correct][0]
                  }
                  onChange={(f) => {
                    setStep3Data((e) => {
                      let copy = e;

                      e.questionData!.markingScheme[Evaluation.Correct][0] =
                        +f.target.value;
                      return copy;
                    });
                    updateQuestion();
                  }}
                />
              </Box>
              {isAdvanced && (
                <Box flexGrow={1}>
                  <FormLabel>Marks for Correct Answer (Denominator)</FormLabel>
                  <Input
                    type="number"
                    color={"green"}
                    size={"sm"}
                    value={
                      step3Data.questionData.markingScheme[
                        Evaluation.Correct
                      ][1]
                    }
                    onChange={(f) => {
                      setStep3Data((e) => {
                        let copy = e;

                        e.questionData!.markingScheme[Evaluation.Correct][1] =
                          +f.target.value;
                        return copy;
                      });
                      updateQuestion();
                    }}
                  />
                </Box>
              )}
            </Flex>
            <Flex gap={3} my={2}>
              <Box flexGrow={1}>
                <FormLabel>Marks for Incorrect Answer</FormLabel>
                <Input
                  type="number"
                  color={"red"}
                  size={"sm"}
                  value={
                    step3Data.questionData.markingScheme[
                      Evaluation.Incorrect
                    ][0]
                  }
                  onChange={(f) => {
                    setStep3Data((e) => {
                      let copy = e;

                      e.questionData!.markingScheme[Evaluation.Incorrect][0] =
                        +f.target.value;
                      return copy;
                    });
                    updateQuestion();
                  }}
                />
              </Box>
              {isAdvanced && (
                <Box flexGrow={1}>
                  <FormLabel>
                    Marks for Incorrect Answer (Denominator)
                  </FormLabel>
                  <Input
                    type="number"
                    color={"red"}
                    size={"sm"}
                    value={
                      step3Data.questionData.markingScheme[
                        Evaluation.Incorrect
                      ][1]
                    }
                    onChange={(f) => {
                      setStep3Data((e) => {
                        let copy = e;

                        e.questionData!.markingScheme[Evaluation.Incorrect][1] =
                          +f.target.value;
                        return copy;
                      });
                      updateQuestion();
                    }}
                  />
                </Box>
              )}
            </Flex>

            <Heading size={"md"}>Answer</Heading>

            {step3Data.questionData.qDataType[0] ===
            QDataTypes.SingleCorrectOption ? (
              <>
                <Flex gap={3}>
                  <Box flex={1}>
                    <FormLabel>Number of options</FormLabel>
                    <NumberInput
                      size={"sm"}
                      value={step3Data.questionData.qDataType[1]}
                    >
                      <NumberInputField min={2} max={10} readOnly />
                      <NumberInputStepper>
                        <NumberIncrementStepper
                          onClick={(f) => {
                            handleOptionsIncrement(
                              QDataTypes.SingleCorrectOption
                            );
                          }}
                        />
                        <NumberDecrementStepper
                          onClick={(f) => {
                            handleOptionsDecrement(
                              QDataTypes.SingleCorrectOption
                            );
                          }}
                        />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                  <Box flex={2}>
                    <FormLabel>Correct Option</FormLabel>
                    <ButtonGroup isAttached>
                      {Array.from(
                        Array(step3Data.questionData.qDataType[1]).keys()
                      ).map((e, i) => (
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          key={i}
                          value={i}
                          isActive={step3Data.questionData!.answer === i}
                          onClick={(f) => {
                            const target = f.target as HTMLButtonElement;
                            setStep3Data((e) => {
                              e.questionData!.answer = +target.value;
                              return e;
                            });
                            updateQuestion();
                          }}
                        >
                          {alphabet[i]}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Box>
                </Flex>

                <Flex flexDirection={"column"} gap={2} my={3}>
                  {step3Data.questionData!.options?.map((option, i) => (
                    <Box key={i} my={1}>
                      <Heading size={"sm"} fontWeight={"semibold"}>
                        Option {alphabet[i]}
                      </Heading>

                      <MDEditor
                        isPreview={isPreview}
                        content={option[step3Data.currentLanguage]}
                        onChange={(f) => {
                          setStep3Data((e): Step3DataProps => {
                            let final = e;
                            e.questionData!.options![i][
                              step3Data.currentLanguage
                            ] = f.target.value;
                            return final;
                          });
                          updateQuestion();
                        }}
                      />
                    </Box>
                  ))}
                </Flex>
              </>
            ) : step3Data.questionData.qDataType[0] ===
              QDataTypes.MultipleCorrectOptions ? (
              <>
                <Flex gap={3}>
                  <Box flex={1}>
                    <FormLabel>Number of options</FormLabel>
                    <NumberInput
                      size={"sm"}
                      value={step3Data.questionData.qDataType[1]}
                    >
                      <NumberInputField min={2} max={10} readOnly />
                      <NumberInputStepper>
                        <NumberIncrementStepper
                          onClick={(f) => {
                            handleOptionsIncrement(
                              QDataTypes.MultipleCorrectOptions
                            );
                          }}
                        />
                        <NumberDecrementStepper
                          onClick={(f) => {
                            handleOptionsDecrement(
                              QDataTypes.MultipleCorrectOptions
                            );
                          }}
                        />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                  <Box flex={1}>
                    <FormLabel>Correct Option(s)</FormLabel>
                    <ButtonGroup isAttached>
                      {Array.from(
                        Array(step3Data.questionData.qDataType[1]).keys()
                      ).map((e, i) => (
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          key={i}
                          value={i}
                          isActive={(
                            step3Data.questionData!.answer as number[]
                          ).includes(i)}
                          onClick={(f) => {
                            const target = f.target as HTMLButtonElement;
                            const value: number = +target.value;
                            setStep3Data((e) => {
                              let copy = structuredClone(e);

                              if (
                                (e.questionData?.answer as number[]).includes(
                                  +value
                                )
                              ) {
                                if (
                                  (e.questionData?.answer as number[]).length >
                                  1
                                )
                                  copy.questionData!.answer = (
                                    copy.questionData!.answer as number[]
                                  ).filter((g) => g !== +value);
                              } else {
                                (copy.questionData!.answer as number[]).push(
                                  +value
                                );
                              }
                              (copy.questionData!.answer as number[]).sort();

                              return copy;
                            });
                            updateQuestion();
                          }}
                        >
                          {alphabet[i]}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Box>
                </Flex>

                <Flex flexDirection={"column"} gap={2} my={3}>
                  {step3Data.questionData!.options?.map((option, i) => (
                    <Box key={i} my={1}>
                      <Heading size={"sm"} fontWeight={"semibold"}>
                        Option {alphabet[i]}
                      </Heading>

                      <MDEditor
                        isPreview={isPreview}
                        content={option[step3Data.currentLanguage]}
                        onChange={(f) => {
                          setStep3Data((e): Step3DataProps => {
                            let final = e;
                            e.questionData!.options![i][
                              step3Data.currentLanguage
                            ] = f.target.value;
                            return final;
                          });
                          updateQuestion();
                        }}
                      />
                    </Box>
                  ))}
                </Flex>
              </>
            ) : step3Data.questionData.qDataType[0] ===
              QDataTypes.NumericalValue ? (
              <Flex gap={2}>
                <Box flexGrow={1}>
                  <FormLabel>Correct value</FormLabel>
                  <Input
                    size={"sm"}
                    type="number"
                    value={+step3Data.questionData.answer}
                    onChange={(f) => {
                      setStep3Data((e) => {
                        let copy = e;
                        const target: number = +f.target.value;
                        const decimalLength: number =
                          (target + "").split(".")[1]?.length ?? 0;
                        e.questionData!.answer = target;
                        e.questionData!.qDataType[1] = decimalLength;
                        return copy;
                      });
                      updateQuestion();
                    }}
                  />
                </Box>
                <Box flexGrow={1}>
                  <FormLabel>Decimal Point Precision</FormLabel>
                  <Input
                    size={"sm"}
                    type="number"
                    value={+step3Data.questionData.qDataType[1]}
                    onChange={(f) => {
                      setStep3Data((e) => {
                        let copy = e;
                        const target: number = +f.target.value;
                        e.questionData!.qDataType[1] = target;
                        return copy;
                      });
                      updateQuestion();
                    }}
                  />
                </Box>
              </Flex>
            ) : undefined}

            <Heading size={"md"}>Constraints</Heading>

            <br />
            <Checkbox
              isChecked={isAdvanced}
              onChange={() => setIsAdvanced((e) => !e)}
            >
              <Text>Toggle Advanced Mode</Text>
            </Checkbox>
          </div>
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

        <Text fontSize={"sm"} color={"gray.500"}>
          {/* {JSON.stringify(step3Data)} */}
        </Text>
      </CardBody>
    </Card>
  );
};

export default QuestionEditor;
