import { TestPaperGroup, TestPaperSection } from "@/app/_interface/testData";
import { Box, Button, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";

interface Props {
  provided: DraggableProvided;
  sectionData: TestPaperSection;
  id: string;
  secIndex: number;
}

const SectionCreator = ({ provided, sectionData, id }: Props) => {
  return (
    <Box key={id} ref={provided.innerRef} {...provided.draggableProps} py={2}>
      <Card size={"sm"} bg={"blue.400"}>
        <CardBody>
          <Box w={20} h={5} bg={"green.200"} {...provided.dragHandleProps} />

          <Text fontSize={"sm"}>Section name:</Text>
          <Heading size={"md"}>{sectionData.sectionName}</Heading>
          <br />
          <Button w={"fit-content"}>Add Question</Button>
        </CardBody>
      </Card>
    </Box>
  );
};

export default SectionCreator;
