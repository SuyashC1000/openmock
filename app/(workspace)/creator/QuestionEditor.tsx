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
  Circle,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
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

import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import MDEditor from "@/app/_components/MDEditor";
import Head from "next/head";
import { findTotalValidQuestionsAndMarks } from "@/app/_functions/findTotal";
import { confirm } from "@/app/_components/Confirmation";

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
  const data = watch(`body`);
  const maxMetrics = watch(`maxMetrics`);

  const [isPreview, setIsPreview] = React.useState(false);
  const [isAdvanced, setIsAdvanced] = React.useState(false);

  const languages = watch(`languages`);
  const tags = watch(`tags`);

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

    const { validMarks, validQuestions } = findTotalValidQuestionsAndMarks(
      "body",
      data
    );
    setValue(`maxMetrics`, {
      ...maxMetrics,
      marks: validMarks,
      questions: validQuestions,
    });
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
          : Array.from(
              {
                length:
                  step3Data.preferences.questionTypeProps[
                    step3Data.preferences.questionType
                  ],
              },
              () => Array.from({ length: languages.length }, () => "")
            ),
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
    copy.preferences.questionType = type;
    copy;

    switch (type) {
      case QDataTypes.SingleCorrectOption: {
        if (!isAdvanced) {
          copy.questionData!.qTypeName = "Single Correct Choice";
        }
        copy.preferences.questionTypeName = "Single Correct Choice";
        copy.questionData!.options = Array(
          copy.preferences.questionTypeProps[QDataTypes.SingleCorrectOption]
        ).fill([""]);

        break;
      }
      case QDataTypes.MultipleCorrectOptions: {
        if (!isAdvanced) {
          copy.questionData!.qTypeName = "Multiple Correct Choices";
        }
        copy.preferences.questionTypeName = "Multiple Correct Choices";
        copy.questionData!.options = Array(
          copy.preferences.questionTypeProps[QDataTypes.MultipleCorrectOptions]
        ).fill([""]);

        break;
      }
      case QDataTypes.NumericalValue: {
        if (!isAdvanced) {
          copy.questionData!.qTypeName = "Numerical Value";
        }
        copy.preferences.questionTypeName = "Numerical Value";
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

      if (type === QDataTypes.SingleCorrectOption) {
      } else if (type === QDataTypes.MultipleCorrectOptions) {
      }

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
          e.questionData?.markingScheme[Evaluation.Partial]?.pop();
          if (e.questionData?.markingScheme[Evaluation.Partial]?.length === 0) {
            e.questionData!.markingScheme[Evaluation.Partial] = undefined;
          }

          if (e.questionData?.answer.length === 0) {
            e.questionData.answer.push(0);
          }
        }
      }

      return e;
    });
    updateQuestion();
  }

  function handlePartialMarking() {
    const isPartialMarkingEnabled =
      step3Data.questionData?.markingScheme[Evaluation.Partial] !== undefined;

    setStep3Data((e) => {
      if (isPartialMarkingEnabled) {
        e.questionData!.markingScheme[Evaluation.Partial] = undefined;
      } else {
        e.questionData!.markingScheme[Evaluation.Partial] = Array(
          (e.questionData?.answer as number[]).length - 1
        ).fill([0, 1]);
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
              onClick={async () => {
                if (
                  await confirm(
                    "Are you sure you want to delete this question?"
                  )
                ) {
                  handleDeleteQuestion();
                }
              }}
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
              placeholder="Enter question"
              content={
                step3Data.questionData.question[step3Data.currentLanguage]
              }
              fontStyle="serif"
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
                    Single Correct Choice
                  </option>
                  <option value={QDataTypes.MultipleCorrectOptions}>
                    Multiple Correct Choices
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
                          preferences: {
                            ...e.preferences,
                            questionTypeName: f.target.value,
                          },
                        };
                      });
                      updateQuestion();
                    }}
                    onBlur={(f) => {
                      setStep3Data((e) => {
                        return {
                          ...e,
                          questionData: {
                            ...e.questionData!,
                            qTypeName: f.target.value,
                          },
                          preferences: {
                            ...e.preferences,
                            questionTypeName: f.target.value,
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
            {step3Data.questionData.qDataType[0] ===
              QDataTypes.MultipleCorrectOptions && (
              <Checkbox
                isChecked={
                  step3Data.questionData.markingScheme[2] !== undefined
                }
                isDisabled={
                  (step3Data.questionData.answer as number[]).length === 1
                }
                onChange={() => handlePartialMarking()}
              >
                Enable Partial Marking
              </Checkbox>
            )}

            {step3Data.questionData.markingScheme[Evaluation.Partial]?.map(
              (markSet, i) => (
                <Flex gap={3} my={2} key={i}>
                  <Box flexGrow={1}>
                    <FormLabel>
                      Marks for {i + 1} Partially Correct Answer
                      {i > 0 ? "s" : ""}
                    </FormLabel>
                    <Input
                      type="number"
                      color={"yellow.500"}
                      size={"sm"}
                      value={markSet[0]}
                      onChange={(f) => {
                        setStep3Data((e) => {
                          e.questionData!.markingScheme[Evaluation.Partial]![
                            i
                          ][0] = +f.target.value;
                          return e;
                        });
                        updateQuestion();
                      }}
                    />
                  </Box>
                  {isAdvanced && (
                    <Box flexGrow={1}>
                      <FormLabel>
                        Marks for {i + 1} Partially Correct Answer
                        {i > 0 ? "s" : ""} (Denominator)
                      </FormLabel>
                      <Input
                        type="number"
                        color={"yellow.500"}
                        size={"sm"}
                        value={markSet[1]}
                        onChange={(f) => {
                          setStep3Data((e) => {
                            e.questionData!.markingScheme![Evaluation.Partial]![
                              i
                            ][1] = +f.target.value;
                            return e;
                          });
                          updateQuestion();
                        }}
                      />
                    </Box>
                  )}
                </Flex>
              )
            )}

            <br />

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
                        placeholder={`Enter option ${alphabet[i]}`}
                        fontStyle="serif"
                        onChange={(f) => {
                          setStep3Data((e): Step3DataProps => {
                            e.questionData!.options![+i][
                              +step3Data.currentLanguage
                            ] = f.target.value;
                            return e;
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
                              if (
                                (e.questionData?.answer as number[]).includes(
                                  value
                                )
                              ) {
                                if (
                                  (e.questionData?.answer as number[]).length >
                                  1
                                )
                                  e.questionData!.answer = (
                                    e.questionData!.answer as number[]
                                  ).filter((g) => g !== value);
                                if (
                                  e.questionData!.markingScheme[
                                    Evaluation.Partial
                                  ]?.length === 2
                                ) {
                                  e.questionData!.markingScheme[
                                    Evaluation.Partial
                                  ] = undefined;
                                } else {
                                  e.questionData!.markingScheme[
                                    Evaluation.Partial
                                  ]?.pop();
                                }
                              } else {
                                (e.questionData!.answer as number[]).push(
                                  value
                                );
                                e.questionData!.markingScheme[
                                  Evaluation.Partial
                                ]?.push([0, 1]);
                              }
                              (e.questionData!.answer as number[]).sort();

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
                        fontStyle="serif"
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

            <br />
            <Flex alignItems={"center"}>
              <Heading size={"md"}>Solution</Heading>
            </Flex>

            <MDEditor
              isPreview={isPreview}
              fontStyle="serif"
              placeholder="Enter explanation of the answer to the questions"
              content={
                step3Data?.questionData?.solution?.[
                  step3Data.currentLanguage
                ] !== null
                  ? step3Data?.questionData?.solution?.[
                      step3Data.currentLanguage
                    ]
                  : ""
              }
              onChange={(f) => {
                setStep3Data((e): Step3DataProps => {
                  let final = e;
                  e.questionData!.solution![step3Data.currentLanguage] =
                    f.target.value;
                  return final;
                });
                updateQuestion();
              }}
            />

            {/* <Heading size={"md"}>Constraints</Heading>
            <Flex gap={2}>
            <Box>
            <FormControl>
            <FormLabel>Permission on Submit</FormLabel>
            <Select
                    onChange={(f) => {
                      setStep3Data((e) => {
                        e.questionData!.constraints!.permissionOnAttempt = f
                          .target.value as "view" | "all" | "none" | undefined;
                        return e;
                      });
                      updateQuestion();
                    }}
                  >
                    <option value={"all"}>View and edit response</option>
                    <option value={"view"}>Only view response</option>
                    <option value={"none"}>No permisisons</option>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel>Maximum Time Allowed</FormLabel>
                  <Input
                    type="number"
                    value={
                      step3Data.questionData.constraints?.maximumTimeAllowed
                    }
                    onChange={(f) => {
                      setStep3Data((e) => {
                        e.questionData!.constraints!.maximumTimeAllowed =
                          +f.target.value;
                        return e;
                      });
                      updateQuestion();
                    }}
                  />
                </FormControl>
              </Box>
            </Flex>
            <br /> */}

            <br />
            <br />
            <Heading size={"md"}>Miscellaneous</Heading>
            <FormLabel>Tags</FormLabel>

            <Flex gap={2} wrap={"wrap"}>
              {step3Data.questionData.tags.map((e, i) => {
                const [tagData] = tags.filter((f) => f.id === e);
                return (
                  <Tag size={"md"} key={i} bgColor={tagData.color}>
                    <TagLabel>{tagData.label}</TagLabel>
                    <TagCloseButton
                      onClick={() => {
                        setStep3Data((g) => {
                          g.questionData!.tags.splice(i, 1);
                          return g;
                        });
                        updateQuestion();
                      }}
                    />
                  </Tag>
                );
              })}
              <Popover trigger="hover" placement="bottom-end">
                <PopoverTrigger>
                  <Button>
                    <TbPlus size={20} />
                  </Button>
                </PopoverTrigger>

                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Question Tag Palette</PopoverHeader>

                  <PopoverBody>
                    <Flex gap={1} wrap={"wrap"} mx={"auto"}>
                      {tags
                        .filter(
                          (e) => !step3Data.questionData?.tags.includes(e.id)
                        )
                        .map((e, i) => {
                          return (
                            <Tag
                              cursor={"pointer"}
                              key={i}
                              size={"lg"}
                              bgColor={e.color}
                              onClick={() => {
                                setStep3Data((f) => {
                                  f.questionData?.tags.push(e.id);
                                  return f;
                                });
                                updateQuestion();
                              }}
                            >
                              <TagLabel>{e.label}</TagLabel>
                            </Tag>
                          );
                        })}
                      {!tags.some(
                        (e) => !step3Data.questionData?.tags.includes(e.id)
                      ) && <Text mx={"auto"}>No more tags left.</Text>}
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>

            <br />
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
