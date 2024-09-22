import { TestPaper, TestPaperGroup } from "@/app/_interface/testData";
import { Box, Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useFieldArray, useFormContext } from "react-hook-form";

const QuestionSelector = () => {
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
    console.log(result);

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

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    const sourceParentId = result.source.droppableId;
    const destParentId = result.destination?.droppableId;

    const [sourceGroup] = fieldsCopy.filter((e) =>
      e.sections.some((f) => f.sectionId == sourceParentId)
    );
    const [destGroup] = fieldsCopy.filter((e) =>
      e.sections.some((f) => f.sectionId == destParentId)
    );

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
    }
    replace(fieldsCopy);
  };

  return (
    <Card w={400} flexGrow={0}>
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
                  return (
                    <Box
                      my={2}
                      p={1}
                      pl={2}
                      borderLeftWidth={2}
                      borderLeftColor={"blue.500"}
                      key={f.sectionId}
                    >
                      <Heading size={"sm"} fontWeight={"semibold"}>
                        {f.sectionName}
                      </Heading>
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
                              bgColor={"gray.100"}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              justifyContent={"center"}
                              alignItems={"center"}
                              textOverflow={"hidden"}
                            >
                              <Text noOfLines={1} fontSize={"sm"}>
                                {questionData.question[0]}
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
                                      borderLeftColor={"blue.400"}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                      textOverflow={"hidden"}
                                    >
                                      <Text fontSize={"sm"} noOfLines={1}>
                                        {g.question[0]}
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
      </CardBody>
    </Card>
  );
};

export default QuestionSelector;
