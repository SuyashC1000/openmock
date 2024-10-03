import {
  findTotalOptionalSections,
  findTotalValidQuestionsAndMarks,
} from "@/app/_functions/findTotal";
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
  Checkbox,
  ComponentWithAs,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Tooltip,
  TooltipProps,
} from "@chakra-ui/react";
import React, { Ref } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  TbCircleMinus,
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
    setValue,
    getFieldState,
    control,
    formState: { errors },
  } = useFormContext<TestPaper>();

  const { validMarks, validQuestions } = findTotalValidQuestionsAndMarks(
    "section",
    sectionData
  );

  const { fields } = useFieldArray({
    name: `body.${grpIndex}.sections.${secIndex}.questions`,
    rules: {
      required: "There should exist at least one question in each section",
    },
  });

  const { error } = getFieldState(
    `body.${grpIndex}.sections.${secIndex}.questions`
  );

  const [isConfiguring, setIsConfiguring] = React.useState(false);

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
              <Flex gap={2} alignItems={"center"}>
                {sectionData.optional && (
                  <Tooltip label={"Optional section"}>
                    <span>
                      <Icon as={TbCircleMinus} fontSize={20} />
                    </span>
                  </Tooltip>
                )}
              </Flex>

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
                <Button
                  colorScheme="yellow"
                  onClick={() => setIsConfiguring((e) => !e)}
                  isActive={isConfiguring}
                >
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

          {isConfiguring && (
            <Card variant={"outline"} m={3}>
              <CardBody>
                <Heading
                  size={"sm"}
                  fontWeight={"semibold"}
                  textDecoration={"underline"}
                >
                  Constraints
                </Heading>
                <br />
                <Flex>
                  <Box>
                    <Checkbox
                      {...register(
                        `body.${grpIndex}.sections.${secIndex}.optional`
                      )}
                    >
                      Optional section
                    </Checkbox>
                  </Box>
                </Flex>
                <br />
                <Flex>
                  <Box>
                    <FormControl>
                      <FormLabel>Max Questions Attemptable</FormLabel>
                      <Input
                        type="number"
                        {...register(
                          `body.${grpIndex}.sections.${secIndex}.constraints.maxQuestionsAnswered`,
                          {
                            valueAsNumber: true,
                            min: {
                              value: 1,
                              message:
                                "Max number of questions attemptable must at least 1",
                            },
                            max: {
                              value: sectionData.questions.length,
                              message:
                                "Max number of questions attemptable must not exceed the total number of questions",
                            },
                          }
                        )}
                      />
                    </FormControl>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          )}
          <p className="text-red-700 text-sm">{error?.root?.message}</p>
        </CardBody>
      </Card>
    </Box>
  );
};

export default SectionCreator;
