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
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Draggable, DraggableProvided, Droppable } from "react-beautiful-dnd";
import SectionCreator from "./SectionCreator";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  TbGripVertical,
  TbMenuOrder,
  TbSquareRoundedPlus,
  TbTrash,
} from "react-icons/tb";
import { uniqueId } from "@/app/_functions/randomGenerator";

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

  const { fields, append, remove } = useFieldArray({
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
          <Flex justifyContent={"start"}>
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
                <Text fontSize={"sm"}>Group name:</Text>

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
            <Container flex={0} ml={"auto"} mr={0} px={0}>
              <ButtonGroup>
                <Button
                  size={"sm"}
                  colorScheme="cyan"
                  variant={"outline"}
                  w={"fit-content"}
                  onClick={() => {
                    append(createNewSection());
                  }}
                  leftIcon={<TbSquareRoundedPlus />}
                >
                  Add Section
                </Button>
                <Button
                  size={"sm"}
                  colorScheme="red"
                  variant={"outline"}
                  onClick={() => removeGroup(grpIndex)}
                >
                  <TbTrash />
                </Button>
              </ButtonGroup>
            </Container>
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
