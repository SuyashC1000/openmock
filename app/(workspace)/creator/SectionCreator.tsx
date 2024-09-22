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
import { DraggableProvided } from "react-beautiful-dnd";
import { useFormContext } from "react-hook-form";
import { TbGripVertical, TbTrash } from "react-icons/tb";

interface Props {
  provided: DraggableProvided;
  sectionData: TestPaperSection;
  id: string;
  secIndex: number;
  grpIndex: number;
  removeSection: (index?: number | number[]) => void;
}

const SectionCreator = ({
  provided,
  sectionData,
  id,
  secIndex,
  grpIndex,
  removeSection,
}: Props) => {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext<TestPaper>();

  return (
    <Box key={id} ref={provided.innerRef} {...provided.draggableProps} py={1}>
      <Card size={"sm"} borderWidth={1} variant={"outline"} rounded={"base"}>
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
                  boxSize={"1.5rem"}
                  color={"gray.400"}
                />
              </Flex>
              <Container p={0}>
                <Text fontSize={"sm"}>Section name:</Text>
                <Editable
                  defaultValue={sectionData.sectionName}
                  fontSize={"lg"}
                  fontWeight={"bold"}
                  py={0}
                >
                  <EditablePreview p={0} />
                  <Input
                    as={EditableInput}
                    {...register(
                      `body.${grpIndex}.sections.${secIndex}.sectionName`,
                      {
                        required: true,
                      }
                    )}
                    placeholder="Insert group name"
                  />
                </Editable>{" "}
              </Container>
            </Flex>
            <Container flex={0} ml={"auto"} mr={0} px={0}>
              <ButtonGroup>
                <Button
                  size={"sm"}
                  colorScheme="red"
                  variant={"outline"}
                  onClick={() => removeSection(secIndex)}
                >
                  <TbTrash />
                </Button>
              </ButtonGroup>
            </Container>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};

export default SectionCreator;
