import {
  TestPaper,
  TestPaperGroup,
  TestPaperSection,
} from "@/app/_interface/testData";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import {
  TbClipboard,
  TbDiamonds,
  TbMenuOrder,
  TbSquarePlus,
} from "react-icons/tb";
import GroupCreator from "./GroupCreator";
import { forceLink } from "d3";
import { uniqueId } from "@/app/_functions/randomGenerator";
import { findTotalValidQuestionsAndMarks } from "@/app/_functions/findTotal";

const Step2 = () => {
  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<TestPaper>();

  const { fields, move, replace, prepend, remove } = useFieldArray({
    name: `body`,
    rules: {
      required: "There should exist at least one group",
      maxLength: { value: 15, message: "Number of groups must not exceed 15" },
    },
  });

  const fieldsData = watch(`body`);

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const { validQuestions, validMarks } = findTotalValidQuestionsAndMarks(
    "body",
    fieldsData
  );

  const createNewGroup = () => {
    const newSection: TestPaperSection = {
      sectionName: "New Section",
      sectionId: `ts${uniqueId(10)}`,
      optional: false,
      questions: [],
      constraints: {},
      instructions: [],
    };

    const newGroup: TestPaperGroup = {
      groupName: "New Group",
      groupId: `tg${uniqueId(10)}`,
      optional: false,
      sections: [newSection],
      constraints: {},
      instructions: [],
    };
    return newGroup;
  };

  const handleDrag = (result: any) => {
    // if (destination) {
    //   move(source.index, destination.index);
    // }
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    if (result.type === "GROUP") {
      move(result.source.index, result.destination.index);
    } else if (result.type === "SECTION") {
      const itemSubItemMap: { [key: string]: TestPaperGroup } =
        fieldsData.reduce((acc: { [key: string]: TestPaperGroup }, item) => {
          acc[item.groupId] = { ...item };
          return acc;
        }, {});

      const sourceParentId = result.source.droppableId;
      const destParentId = result.destination.droppableId;

      const sourceSubItems = itemSubItemMap[sourceParentId].sections;
      const destSubItems = itemSubItemMap[destParentId].sections;

      let newItems = [...fieldsData];
      /** In this case subItems are reOrdered inside same Parent */
      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(
          sourceSubItems,
          sourceIndex,
          destIndex
        ) as TestPaperSection[];

        newItems = newItems.map((item) => {
          if (item.groupId === sourceParentId) {
            item.sections = reorderedSubItems;
          }
          return item;
        });
        replace(newItems);
      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);
        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map((item) => {
          if (item.groupId === sourceParentId) {
            item.sections = newSourceSubItems;
          } else if (item.groupId === destParentId) {
            item.sections = newDestSubItems;
          }
          return item;
        });
        replace(newItems);
      }
    }
  };

  return (
    <div className="m-2">
      <Card>
        <CardBody>
          <Flex>
            <Button
              onClick={() => {
                prepend(createNewGroup());
              }}
              colorScheme="cyan"
              variant={"outline"}
              leftIcon={<TbSquarePlus />}
            >
              Add Group
            </Button>

            <Flex
              bgColor={"gray.100"}
              gap={2}
              m={2}
              px={1}
              ml={"auto"}
              rounded={"md"}
            >
              <Tag variant={"subtle"} size={"sm"}>
                <TagLeftIcon as={TbDiamonds} fontSize={16} />
                <TagLabel>{validMarks}</TagLabel>
              </Tag>
              <Tag variant={"subtle"} size={"sm"}>
                <TagLeftIcon as={TbClipboard} fontSize={16} />
                <TagLabel>{validQuestions}</TagLabel>
              </Tag>
            </Flex>
          </Flex>
          <DragDropContext onDragEnd={handleDrag}>
            <Droppable droppableId="groups-container" type="GROUP">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {fields.map((field, index) => {
                    const fieldData = watch(`body.${index}`);
                    return (
                      <Draggable
                        key={field.id}
                        draggableId={field.id}
                        index={index}
                      >
                        {(provided) => (
                          <GroupCreator
                            groupData={fieldData}
                            id={fieldData.groupId}
                            provided={provided}
                            grpIndex={index}
                            removeGroup={remove}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <p className="text-red-700 text-sm">{errors.body?.root?.message}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Step2;
