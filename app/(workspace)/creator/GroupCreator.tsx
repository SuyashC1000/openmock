import { TestPaper, TestPaperGroup } from "@/app/_interface/testData";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Draggable, DraggableProvided, Droppable } from "react-beautiful-dnd";
import SectionCreator from "./SectionCreator";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TbMenuOrder } from "react-icons/tb";

interface Props {
  provided: DraggableProvided;
  groupData: TestPaperGroup;
  id: string;
  grpIndex: number;
  temp: any;
}

const GroupCreator = ({ provided, groupData, id, grpIndex, temp }: Props) => {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext<TestPaper>();

  return (
    <Box py={2} ref={provided.innerRef} {...provided.draggableProps}>
      <Card size={"sm"} key={id} bg={"blue.200"}>
        <CardBody>
          <Box w={20} h={5} bg={"green.200"} {...provided.dragHandleProps} />
          <Text>
            <code>
              {id} {grpIndex} {JSON.stringify(temp.id)}
            </code>
          </Text>
          <Text fontSize={"sm"}>Group name:</Text>
          <Heading size={"md"}>{groupData.groupName}</Heading>
          <br />
          <Button w={"fit-content"}>Add Section</Button>
          <Droppable droppableId={id} type="SECTION">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {groupData.sections.map((field, index) => {
                  return (
                    <Draggable
                      key={field.sectionName}
                      draggableId={field.sectionName}
                      index={index}
                    >
                      {(provided) => (
                        <SectionCreator
                          sectionData={field}
                          id={field.sectionName}
                          provided={provided}
                          secIndex={index}
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
