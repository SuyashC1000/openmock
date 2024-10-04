import MDEditor from "@/app/_components/MDEditor";
import { uniqueId } from "@/app/_functions/randomGenerator";
import { TestPaper } from "@/app/_interface/testData";
import { QDataTypes } from "@/lib/enums";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Circle,
  CloseButton,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ListItem,
  OrderedList,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TbEdit, TbEye, TbPlus } from "react-icons/tb";
import Step1Authors from "./_step1Fields/Step1Authors";

const Step1 = () => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<TestPaper>();

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    update: updateTag,
  } = useFieldArray({ name: "tags" });

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
    update: updateLanguage,
  } = useFieldArray({ name: "languages" });

  const [isPreview, setIsPreview] = useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(0);

  const data = watch();

  const languages = watch("languages", [""]);

  const description = watch(`analysis.preTestMessage.${currentLanguage}`);
  const instructions = watch(`instructions.${currentLanguage}`);

  const colors: string[] = [
    "#fca5a5",
    "#fdba74",
    "#fcd34d",
    "#fde047",
    "#bef264",
    "#86efac",
    "#6ee7b7",
    "#5eead4",
    "#67e8f9",
    "#7dd3fc",
    "#93c5fd",
    "#a5b4fc",
    "#d8b4fe",
    "#f0abfc",
    "#f9a8d4",
    "#fecdd3",
  ];

  function removeTagInstances(tagId: string) {
    let dataCopy = structuredClone(data);
    setValue(
      "body",
      dataCopy.body?.map((group, i) => {
        return {
          ...group,
          sections: group.sections.map((section, j) => {
            return {
              ...section,
              questions: section.questions.map((question, k) => {
                return {
                  ...question,
                  tags: question.tags.filter((tag) => tag !== tagId),
                };
              }),
            };
          }),
        };
      })
    );
  }

  function addLanguage() {
    let dataCopy = structuredClone(data);
    setValue("instructions", [...dataCopy.instructions, ""]);
    setValue("analysis.preTestMessage", [
      ...dataCopy.analysis.preTestMessage,
      "",
    ]);
    setValue("analysis.postTestMessage", [
      ...dataCopy.analysis.postTestMessage,
      "",
    ]);
    setValue(
      "body",
      dataCopy.body?.map((group) => {
        if (group.instructions !== undefined) {
          group.instructions.push("");
        }
        return {
          ...group,
          sections: group.sections.map((section) => {
            if (section.instructions !== undefined) {
              section.instructions.push("");
            }
            return {
              ...section,
              questions: section.questions.map((question) => {
                question.question.push("");
                question.solution.push("");

                if (
                  [
                    QDataTypes.SingleCorrectOption,
                    QDataTypes.MultipleCorrectOptions,
                  ].includes(question.qDataType[0])
                ) {
                  question.options!.map((option) => {
                    option.push("");
                    return option;
                  });
                }
                return { ...question };
              }),
            };
          }),
        };
      })
    );
  }
  function deleteLanguage(index: number) {
    setCurrentLanguage((langIndex) => {
      if (langIndex >= index) {
        return langIndex - 1;
      } else {
        return langIndex;
      }
    });

    let dataCopy = structuredClone(data);
    setValue(
      "instructions",
      dataCopy.instructions.filter((e, i) => i !== index)
    );
    setValue(
      "analysis.preTestMessage",
      dataCopy.analysis.preTestMessage.filter((e, i) => i !== index)
    );
    setValue(
      "analysis.postTestMessage",
      dataCopy.analysis.postTestMessage.filter((e, i) => i !== index)
    );
    setValue(
      "body",
      dataCopy.body?.map((group) => {
        if (group.instructions !== undefined) {
          group.instructions.splice(index, 1);
        }
        return {
          ...group,
          sections: group.sections.map((section) => {
            if (section.instructions !== undefined) {
              section.instructions.splice(index, 1);
            }
            return {
              ...section,
              questions: section.questions.map((question) => {
                question.question.splice(index, 1);
                question.solution.splice(index, 1);

                if (
                  [
                    QDataTypes.SingleCorrectOption,
                    QDataTypes.MultipleCorrectOptions,
                  ].includes(question.qDataType[0])
                ) {
                  question.options!.map((option) => {
                    option.splice(index, 1);
                    return option;
                  });
                }
                return { ...question };
              }),
            };
          }),
        };
      })
    );
  }

  // React.useEffect(()=> {}, [cur])

  return (
    <div className="m-2">
      <Card>
        <CardBody>
          <FormControl>
            <FormLabel>Name of Test Paper</FormLabel>
            <Input
              isInvalid={errors.name ? true : false}
              placeholder="Enter a name between 3 and 40 characters"
              {...register("name", {
                minLength: {
                  value: 3,
                  message: "Test paper name must be at least 3 characters long",
                },
                maxLength: {
                  value: 40,
                  message: "Test paper name must be at most 40 characters long",
                },
                required: "Name for the test paper must be provided",
              })}
            />
            <p className="text-red-700 text-sm">{errors.name?.message}</p>
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Test Duration (in minutes)</FormLabel>
            <Input
              isInvalid={errors.maxMetrics?.time ? true : false}
              type="number"
              {...register("maxMetrics.time", {
                valueAsNumber: true,
                required: "Duration of test must be provided",
                min: {
                  value: 1,
                  message: "Test duration must be at least 1 minute long",
                },
                max: {
                  value: 999,
                  message: "Test duration must be at most 999 minutes long",
                },
              })}
              placeholder="Enter duration of test paper (in minutes)"
            />
            <p className="text-red-700 text-sm">
              {errors.maxMetrics?.time?.message}
            </p>
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Supported Language</FormLabel>
            <OrderedList>
              {languageFields.map((field, index) => {
                const language = data.languages![index];

                return (
                  <ListItem key={field.id}>
                    <Flex alignContent={"center"}>
                      <Editable
                        defaultValue={language}
                        py={0}
                        ml={2}
                        px={1}
                        size={"sm"}
                      >
                        <EditablePreview />
                        <Input
                          as={EditableInput}
                          size={"sm"}
                          {...register(`languages.${index}`, {
                            required: true,
                          })}
                        />
                      </Editable>
                      <CloseButton
                        isDisabled={languages.length === 1}
                        onClick={() => {
                          removeLanguage(index);
                          deleteLanguage(index);
                        }}
                      />
                    </Flex>
                  </ListItem>
                );
              })}
            </OrderedList>
            <Button
              variant={"ghost"}
              size={"sm"}
              ml={2}
              onClick={() => {
                appendLanguage("New Language");
                addLanguage();
              }}
            >
              <TbPlus size={18} />
            </Button>
          </FormControl>
          <br />

          <Flex
            mt={1}
            alignItems={"center"}
            gap={2}
            bgColor={"white"}
            zIndex={5}
            p={2}
            rounded={"lg"}
            // borderWidth={2}
            // borderColor={"gray.200"}
            justifyContent={"end"}
          >
            <ButtonGroup isAttached>
              <Button
                size={"sm"}
                variant={"outline"}
                isActive={!isPreview}
                onClick={() => setIsPreview(false)}
              >
                <TbEdit size={18} />
              </Button>
              <Button
                size={"sm"}
                variant={"outline"}
                isActive={isPreview}
                onClick={() => setIsPreview(true)}
              >
                <TbEye size={18} />
              </Button>
            </ButtonGroup>
            <Select
              maxW={"2xs"}
              size={"sm"}
              onChange={(f) => {
                setCurrentLanguage(+f.target.value);
              }}
            >
              {languages.map((e, i) => (
                <option key={i} value={i}>
                  {e}
                </option>
              ))}
            </Select>
          </Flex>

          <br />
          <FormControl>
            <Flex gap={2}>
              <FormLabel>Test Description</FormLabel>
            </Flex>
            <MDEditor
              isPreview={isPreview}
              content={description}
              onChange={(f) => {
                setValue(
                  `analysis.preTestMessage.${currentLanguage}`,
                  f.target.value
                );
              }}
            />
          </FormControl>

          <br />
          <FormControl>
            <Flex gap={2}>
              <FormLabel>Test Specific Instructions</FormLabel>
            </Flex>
            <MDEditor
              isPreview={isPreview}
              content={instructions}
              onChange={(f) => {
                setValue(`instructions.${currentLanguage}`, f.target.value);
              }}
            />
          </FormControl>

          <br />

          <FormControl>
            <FormLabel>Question Tags</FormLabel>
            <Flex gap={1}>
              {tagFields.map((e, i) => {
                const tagData = watch(`tags.${i}`);
                return (
                  <Popover key={e.id} trigger="hover">
                    <PopoverAnchor>
                      <Tag size={"lg"} key={e.id} bgColor={tagData.color}>
                        <PopoverTrigger>
                          <Circle
                            cursor={"pointer"}
                            bgColor={tagData.color}
                            filter={"auto"}
                            brightness={0.8}
                            saturate={2}
                            size={18}
                          />
                        </PopoverTrigger>
                        <TagLabel>
                          <Editable
                            defaultValue={tagData.label}
                            py={0}
                            ml={2}
                            px={1}
                            size={"sm"}
                          >
                            <EditablePreview p={0} />
                            <Input
                              as={EditableInput}
                              size={"sm"}
                              {...register(`tags.${i}.label`, {
                                required: true,
                              })}
                            />
                          </Editable>
                        </TagLabel>
                        <TagCloseButton
                          onClick={() => {
                            removeTagInstances(tagData.id);
                            removeTag(i);
                          }}
                        />
                      </Tag>
                    </PopoverAnchor>

                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverHeader>Color picker</PopoverHeader>
                      <PopoverBody>
                        <Flex gap={1} wrap={"wrap"} mx={"auto"}>
                          {colors.map((f, j) => (
                            <Circle
                              key={f}
                              size={"2rem"}
                              bgColor={f}
                              cursor={"pointer"}
                              onClick={() => {
                                updateTag(i, { ...tagData, color: f });
                              }}
                            />
                          ))}
                        </Flex>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                );
              })}
              <Button
                variant={"outline"}
                leftIcon={<TbPlus size={20} />}
                onClick={() => {
                  appendTag({
                    id: `g${uniqueId(5)}`,
                    label: `Tag`,
                    color: colors[Math.floor(Math.random() * colors.length)],
                  });
                }}
              >
                Add Tag
              </Button>
            </Flex>
          </FormControl>

          <br />

          <Step1Authors />
        </CardBody>
      </Card>
    </div>
  );
};

export default Step1;
