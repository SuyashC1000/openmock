import {
  TestPaper,
  TestPaperGroup,
  TestPaperSection,
} from "@/app/_interface/testData";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Card,
  CardBody,
  Checkbox,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Step3DataProps } from "./Step3";

interface Props {
  step3Data: Step3DataProps;
  setStep3Data: Dispatch<SetStateAction<Step3DataProps>>;
}

const QuestionSelector = ({ step3Data, setStep3Data }: Props) => {
  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<TestPaper>();

  const fieldsData = watch(`body`);

  const { fields, move, replace, append, remove } = useFieldArray({
    name: `body`,
  });

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleDrag = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const fieldsMap: { [key: string]: TestPaperGroup } = fieldsData.reduce(
      (acc: { [key: string]: TestPaperGroup }, item) => {
        acc[item.groupId] = { ...item };
        return acc;
      },
      {}
    );

    let fieldsCopy = [...fieldsData];

    const sourceIndex: number = result.source.index;
    const destIndex: number = result.destination.index;

    const sourceParentId: string = result.source.droppableId;
    const destParentId: string = result.destination?.droppableId;

    let sourceGroupIndex: number;
    const destGroupIndex: number = fieldsCopy.findIndex((e) =>
      e.sections.some((f, i) => {
        return f.sectionId == destParentId;
      })
    );

    const [sourceGroup] = fieldsCopy.filter((e) =>
      e.sections.some((f, i) => {
        return f.sectionId == sourceParentId;
      })
    );
    const [destGroup] = fieldsCopy.filter((e) =>
      e.sections.some((f, i) => {
        return f.sectionId == destParentId;
      })
    );

    const destSectionIndex: number = destGroup.sections.findIndex((e) => {
      return e.sectionId == destParentId;
    });

    const [sourceSection] = sourceGroup.sections.filter(
      (e) => e.sectionId == sourceParentId
    );
    const [destSection] = destGroup.sections.filter(
      (e) => e.sectionId == destParentId
    );

    if (sourceParentId === destParentId) {
      const reorderedQuestions = reorder(
        sourceSection.questions,
        sourceIndex,
        destIndex
      );

      fieldsCopy = fieldsCopy.map((e) => {
        if (e.groupId === sourceGroup.groupId) {
          e.sections = e.sections.map((f) => {
            if (f.sectionId === sourceParentId)
              f.questions = reorderedQuestions;
            return f;
          });
        }
        return e;
      });
    } else if (sourceGroup.groupId === destGroup.groupId) {
      let newSourceQuestions = [...sourceSection.questions];
      const [replacedQuestion] = newSourceQuestions.splice(sourceIndex, 1);

      let newDestQuestions = [...destSection.questions];
      newDestQuestions.splice(destIndex, 0, replacedQuestion);

      fieldsCopy = fieldsCopy.map((e) => {
        if (e.groupId === sourceGroup.groupId) {
          e.sections = e.sections.map((f) => {
            if (f.sectionId === sourceParentId)
              f.questions = newSourceQuestions;
            else if (f.sectionId === destParentId)
              f.questions = newDestQuestions;
            return f;
          });
        }
        return e;
      });

      if (replacedQuestion.id === step3Data.questionData?.id) {
        setStep3Data((e) => {
          return { ...e, sectionLocation: [destGroupIndex, destSectionIndex] };
        });
      }
    } else {
      let newSourceQuestions = [...sourceSection.questions];
      const [replacedQuestion] = newSourceQuestions.splice(sourceIndex, 1);

      let newDestQuestions = [...destSection.questions];
      newDestQuestions.splice(destIndex, 0, replacedQuestion);

      fieldsCopy = fieldsCopy.map((e) => {
        if (e.groupId === sourceGroup.groupId) {
          e.sections = e.sections.map((f) => {
            if (f.sectionId === sourceParentId)
              f.questions = newSourceQuestions;

            return f;
          });
        } else if (e.groupId === destGroup.groupId) {
          e.sections = e.sections.map((f) => {
            if (f.sectionId === destParentId) f.questions = newDestQuestions;

            return f;
          });
        }
        return e;
      });

      if (replacedQuestion.id === step3Data.questionData?.id) {
        setStep3Data((e) => {
          return { ...e, sectionLocation: [destGroupIndex, destSectionIndex] };
        });
      }
    }
    replace(fieldsCopy);
  };

  return (
    <Card
      w={400}
      flexGrow={0}
      position={"sticky"}
      top={3}
      maxHeight={"82.5vh"}
      overflowY={"auto"}
      style={{ scrollbarWidth: "thin" }}
    >
      <CardBody>
        <Heading size={"md"} fontWeight={"medium"}>
          Question Selector
        </Heading>
        <DragDropContext onDragEnd={handleDrag}>
          {fields.map((field, index) => {
            const fieldData = watch(`body.${index}`);
            return (
              <Box
                my={2}
                p={1}
                pl={2}
                borderLeftWidth={2}
                borderLeftColor={"blue.600"}
                key={fieldData.groupId}
              >
                <Heading size={"sm"}>{fieldData.groupName}</Heading>
                {fieldData.sections.map((f, j) => {
                  let isActive =
                    step3Data.sectionLocation?.[0] === index &&
                    step3Data.sectionLocation?.[1] === j;
                  return (
                    <Box
                      my={2}
                      p={1}
                      pl={2}
                      borderLeftWidth={2}
                      borderLeftColor={"blue.500"}
                      key={f.sectionId}
                    >
                      <Flex gap={1}>
                        <Checkbox
                          colorScheme="green"
                          key={Math.random()}
                          isChecked={isActive}
                          onChange={() => {
                            setStep3Data((e) => {
                              if (isActive) {
                                return {
                                  ...e,
                                  sectionLocation: undefined,
                                  questionData: undefined,
                                };
                              } else {
                                return {
                                  ...e,
                                  sectionLocation: [index, j],
                                  questionData: undefined,
                                };
                              }
                            });
                          }}
                        >
                          <Heading
                            size={"sm"}
                            fontWeight={"semibold"}
                            color={isActive ? "green.500" : undefined}
                          >
                            {f.sectionName}
                          </Heading>
                        </Checkbox>
                      </Flex>
                      <Droppable
                        droppableId={f.sectionId}
                        type="QUESTION"
                        renderClone={(provided, snapshot, rubric) => {
                          const questionData = f.questions[rubric.source.index];
                          return (
                            <Box
                              my={1}
                              pl={1}
                              borderLeftWidth={2}
                              borderLeftColor={"blue.400"}
                              bgColor={
                                questionData.id === step3Data.questionData?.id
                                  ? "green.300"
                                  : "gray.100"
                              }
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              justifyContent={"center"}
                              alignItems={"center"}
                              textOverflow={"hidden"}
                            >
                              <Text
                                noOfLines={1}
                                fontSize={"sm"}
                                color={
                                  questionData.id === step3Data.questionData?.id
                                    ? "white"
                                    : "black"
                                }
                              >
                                {questionData.question[
                                  step3Data.currentLanguage
                                ].length > 0
                                  ? questionData.question[
                                      step3Data.currentLanguage
                                    ]
                                  : "(Empty question)"}
                              </Text>
                            </Box>
                          );
                        }}
                      >
                        {(provided) => (
                          <Flex
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            w={"full"}
                            minH={2}
                            flexDirection={"column"}
                          >
                            {f.questions.map((g, k) => {
                              return (
                                <Draggable
                                  key={g.id}
                                  draggableId={g.id}
                                  index={k}
                                >
                                  {(provided) => (
                                    <Box
                                      userSelect={"none"}
                                      my={1}
                                      pl={1}
                                      borderLeftWidth={2}
                                      bgColor={
                                        step3Data.questionData?.id === g.id
                                          ? "green.100"
                                          : undefined
                                      }
                                      borderLeftColor={"blue.400"}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                      textOverflow={"hidden"}
                                      onClick={() => {
                                        setStep3Data((e) => {
                                          return {
                                            ...e,
                                            activeSection: f.sectionId,
                                            sectionLocation: [index, j],
                                            questionData: g,
                                          };
                                        });
                                      }}
                                    >
                                      <Text
                                        fontSize={"sm"}
                                        noOfLines={1}
                                        color={
                                          g.question[step3Data.currentLanguage]
                                            .length === 0
                                            ? "gray.400"
                                            : undefined
                                        }
                                      >
                                        {g.question[step3Data.currentLanguage]
                                          .length > 0
                                          ? g.question[
                                              step3Data.currentLanguage
                                            ]
                                          : "(Empty question)"}
                                      </Text>
                                    </Box>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </Flex>
                        )}
                      </Droppable>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </DragDropContext>

        {fieldsData.length === 0 && (
          <Alert status="info" size={"sm"}>
            <AlertIcon />
            <AlertDescription fontSize={"sm"}>
              Insert a group and a section to start creating questions
            </AlertDescription>
          </Alert>
        )}
      </CardBody>
    </Card>
  );
};

export default QuestionSelector;
