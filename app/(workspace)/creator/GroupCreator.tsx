import {
  TestPaper,
  TestPaperGroup,
  TestPaperSection,
} from "@/app/_interface/testData";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Icon,
  Input,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Draggable, DraggableProvided, Droppable } from "react-beautiful-dnd";
import SectionCreator from "./SectionCreator";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  TbClipboard,
  TbDiamonds,
  TbGripVertical,
  TbMenuOrder,
  TbSettings,
  TbSquareRoundedPlus,
  TbTrash,
} from "react-icons/tb";
import { uniqueId } from "@/app/_functions/randomGenerator";
import { findTotalValidQuestionsAndMarks } from "@/app/_functions/findTotal";

interface Props {
  provided: DraggableProvided;
  groupData: TestPaperGroup;
  id: string;
  grpIndex: number;
  removeGroup: (index?: number | number[]) => void;
}

const GroupCreator = ({
  provided,
  groupData,
  id,
  grpIndex,
  removeGroup,
}: Props) => {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext<TestPaper>();

  const { fields, prepend, remove } = useFieldArray({
    name: `body.${grpIndex}.sections`,
  });

  const createNewSection = () => {
    const final: TestPaperSection = {
      sectionName: "New section",
      sectionId: `ts${uniqueId(10)}`,
      optional: false,
      questions: [],
      constraints: {},
      instructions: [],
    };
    return final;
  };

  const { validMarks, validQuestions } = findTotalValidQuestionsAndMarks(
    "group",
    groupData
  );

  return (
    <Box py={2} ref={provided.innerRef} {...provided.draggableProps}>
      <Card
        size={"sm"}
        key={id}
        borderWidth={1}
        variant={"outline"}
        rounded={"lg"}
      >
        <CardBody p={2}>
          <Flex justifyContent={"start"} alignContent={"center"}>
            <Flex ml={0} mr={"auto"} px={0} alignItems={"center"}>
              <Flex
                w={"fit"}
                h={10}
                {...provided.dragHandleProps}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Icon
                  as={TbGripVertical}
                  boxSize={"1.75rem"}
                  color={"gray.400"}
                />
              </Flex>
              <Container p={0}>
                <Text fontSize={"xs"}>Group name:</Text>

                <Editable
                  defaultValue={groupData.groupName}
                  fontSize={"lg"}
                  fontWeight={"bold"}
                  py={0}
                >
                  <EditablePreview p={0} />
                  <Input
                    as={EditableInput}
                    {...register(`body.${grpIndex}.groupName`, {
                      required: true,
                    })}
                    placeholder="Insert group name"
                  />
                </Editable>
              </Container>
            </Flex>
            <Flex
              flex={0}
              ml={"auto"}
              mr={0}
              px={0}
              gap={2}
              alignContent={"center"}
              justifyContent={"center"}
            >
              <Flex bgColor={"gray.100"} gap={2} m={2} px={1} rounded={"md"}>
                <Tag variant={"subtle"} size={"sm"}>
                  <TagLeftIcon as={TbDiamonds} fontSize={16} />
                  <TagLabel>{validMarks}</TagLabel>
                </Tag>
                <Tag variant={"subtle"} size={"sm"}>
                  <TagLeftIcon as={TbClipboard} fontSize={16} />
                  <TagLabel>{validQuestions}</TagLabel>
                </Tag>
              </Flex>

              <ButtonGroup
                size={"sm"}
                variant={"outline"}
                alignItems={"center"}
              >
                <Button
                  colorScheme="cyan"
                  w={"fit-content"}
                  onClick={() => {
                    prepend(createNewSection());
                  }}
                  leftIcon={<TbSquareRoundedPlus size={20} />}
                >
                  Add Section
                </Button>
                <Button colorScheme="yellow">
                  <TbSettings size={20} />
                </Button>
                <Button colorScheme="red" onClick={() => removeGroup(grpIndex)}>
                  <TbTrash size={20} />
                </Button>
              </ButtonGroup>
            </Flex>
          </Flex>

          <Droppable droppableId={id} type="SECTION">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {groupData.sections.map((field, index) => {
                  return (
                    <Draggable
                      key={field.sectionId}
                      draggableId={field.sectionId}
                      index={index}
                    >
                      {(provided) => (
                        <SectionCreator
                          sectionData={field}
                          id={field.sectionId}
                          provided={provided}
                          secIndex={index}
                          grpIndex={grpIndex}
                          removeSection={remove}
                        />
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </CardBody>
      </Card>
    </Box>
  );
};

export default GroupCreator;
