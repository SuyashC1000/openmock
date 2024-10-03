import { findTotalValidQuestionsAndMarks } from "@/app/_functions/findTotal";
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
import { DraggableProvided } from "react-beautiful-dnd";
import { useFormContext } from "react-hook-form";
import {
  TbClipboard,
  TbDiamonds,
  TbGripVertical,
  TbSettings,
  TbTrash,
} from "react-icons/tb";

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

  const { validMarks, validQuestions } = findTotalValidQuestionsAndMarks(
    "section",
    sectionData
  );

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
                <Text fontSize={"xs"}>Section name:</Text>
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
            <Flex flex={0} ml={"auto"} mr={0} px={0}>
              <Flex bgColor={"gray.100"} gap={2} m={2} px={1} rounded={"md"}>
                <Tag variant={"subtle"}>
                  <TagLeftIcon as={TbDiamonds} fontSize={16} />
                  <TagLabel>{validMarks}</TagLabel>
                </Tag>
                <Tag variant={"subtle"}>
                  <TagLeftIcon as={TbClipboard} fontSize={16} />
                  <TagLabel>{validQuestions}</TagLabel>
                </Tag>
              </Flex>
              <ButtonGroup
                size={"sm"}
                variant={"outline"}
                alignItems={"center"}
              >
                <Button colorScheme="yellow">
                  <TbSettings size={20} />
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => removeSection(secIndex)}
                >
                  <TbTrash size={20} />
                </Button>
              </ButtonGroup>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};

export default SectionCreator;
