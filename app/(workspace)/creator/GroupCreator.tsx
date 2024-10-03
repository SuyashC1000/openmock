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
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Select,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { Draggable, DraggableProvided, Droppable } from "react-beautiful-dnd";
import SectionCreator from "./SectionCreator";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  TbClipboard,
  TbDiamonds,
  TbEye,
  TbEyeClosed,
  TbGripVertical,
  TbMenuOrder,
  TbSettings,
  TbSquareRoundedPlus,
  TbTrash,
} from "react-icons/tb";
import { uniqueId } from "@/app/_functions/randomGenerator";
import {
  findTotalOptionalSections,
  findTotalValidQuestionsAndMarks,
} from "@/app/_functions/findTotal";
import { group } from "console";

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
    getFieldState,
  } = useFormContext<TestPaper>();

  const { fields, prepend, remove } = useFieldArray({
    name: `body.${grpIndex}.sections`,
    rules: {
      required: "There should exist at least one section in each group",
    },
  });

  const { error } = getFieldState(`body.${grpIndex}.sections`);

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

  const [isConfiguring, setIsConfiguring] = React.useState(false);

  const submitPermission = groupData.constraints?.permissionOnSubmit;

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
              <Flex flex={0} ml={"auto"} mr={0} px={0}>
                <Flex gap={2} alignItems={"center"}>
                  {submitPermission !== "all" &&
                    submitPermission !== undefined && (
                      <Tooltip
                        label={
                          submitPermission === "view"
                            ? "Read only on submission"
                            : "Inaccessible on submission"
                        }
                      >
                        <span>
                          <Icon
                            as={
                              submitPermission === "view" ? TbEye : TbEyeClosed
                            }
                            fontSize={20}
                          />
                        </span>
                      </Tooltip>
                    )}
                </Flex>
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
                <Button
                  colorScheme="yellow"
                  onClick={() => setIsConfiguring((e) => !e)}
                  isActive={isConfiguring}
                >
                  <TbSettings size={20} />
                </Button>
                <Button colorScheme="red" onClick={() => removeGroup(grpIndex)}>
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
                {/* <Divider borderColor={"gray.700"}/> */}
                <Flex gap={2}>
                  <Box>
                    <FormControl>
                      <FormLabel>Max Optional Sections Attemptable</FormLabel>
                      <Input
                        type="number"
                        {...register(
                          `body.${grpIndex}.constraints.maxOptionalSectionsAnswered`,
                          {
                            valueAsNumber: true,
                            min: {
                              value: 0,
                              message: "Number must not be a negative integer",
                            },
                            max: {
                              value: findTotalOptionalSections(groupData),
                              message:
                                "Number cannot exceed total number of optional sections in given group",
                            },
                          }
                        )}
                      />
                      <p className="text-red-700 text-sm">
                        {errors.body?.message}
                      </p>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>Permission on Submit</FormLabel>
                      <Select
                        {...register(
                          `body.${grpIndex}.constraints.permissionOnSubmit`
                        )}
                      >
                        <option value={"all"}>View and edit responses</option>
                        <option value={"view"}>Only view responses</option>
                        <option value={"none"}>No permisisons</option>
                      </Select>
                    </FormControl>
                  </Box>
                </Flex>
                <Flex gap={2}>
                  <Box>
                    <FormControl>
                      <FormLabel>Minimum Time Allowed</FormLabel>
                      <Input
                        placeholder="Enter time (in minutes)"
                        type="number"
                        {...register(
                          `body.${grpIndex}.constraints.minimumTimeAllowed`,
                          {
                            valueAsNumber: true,
                            min: {
                              value: 1,
                              message:
                                "Minimum time must be at least 1 minute long",
                            },
                            max: {
                              value: 999,
                              message:
                                "Minimum time must be at at most 999 minutes long",
                            },
                          }
                        )}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>Maximum Time Allowed</FormLabel>
                      <Input
                        placeholder="Enter time (in minutes)"
                        type="number"
                        {...register(
                          `body.${grpIndex}.constraints.maximumTimeAllowed`,
                          {
                            valueAsNumber: true,
                            min: {
                              value: 1,
                              message:
                                "Maximum time must be at least 1 minute long",
                            },
                            max: {
                              value: 999,
                              message:
                                "Maximum time must be at at most 999 minutes long",
                            },
                          }
                        )}
                      ></Input>
                    </FormControl>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          )}

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

          <p className="text-red-700 text-sm">{error?.root?.message}</p>
        </CardBody>
      </Card>
    </Box>
  );
};

export default GroupCreator;
