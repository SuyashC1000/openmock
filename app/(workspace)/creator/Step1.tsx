import MDEditor from "@/app/_components/MDEditor";
import { uniqueId } from "@/app/_functions/randomGenerator";
import { TestPaper } from "@/app/_interface/testData";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Circle,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { TbEdit, TbEye } from "react-icons/tb";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const Step1 = () => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<Partial<TestPaper>>();

  const { fields, append, remove, update } = useFieldArray({ name: "tags" });

  const [isPreview, setIsPreview] = useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(0);

  const data = watch();

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

  return (
    <div className="m-2">
      <Card>
        <CardBody>
          <FormControl>
            <FormLabel>Name of Test Paper</FormLabel>
            <Input
              isInvalid={errors.name ? true : false}
              size={"sm"}
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
              size={"sm"}
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
          </FormControl>
          <br />
          <FormControl>
            <Flex gap={2}>
              <FormLabel>Test Description</FormLabel>

              <ButtonGroup isAttached ml={"auto"}>
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
            </Flex>
            {isPreview ? (
              <Card size={"sm"} variant={"outline"}>
                <CardBody className="whitespace-pre-wrap">
                  <Markdown
                    className={`font-serif text-lg`}
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {data.analysis?.preTestMessage?.[currentLanguage]}
                  </Markdown>
                </CardBody>
              </Card>
            ) : (
              <Textarea
                {...register(`analysis.preTestMessage.${currentLanguage}`)}
                // onBlur={(f) => {}}
              />
            )}
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Question Tags</FormLabel>
            <Flex gap={1}>
              {fields.map((e, i) => {
                const tagData = watch(`tags.${i}`);
                return (
                  <Popover key={e.id}>
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
                            remove(i);
                          }}
                        />
                      </Tag>
                    </PopoverAnchor>

                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
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
                                update(i, { ...tagData, color: f });
                              }}
                            />
                          ))}
                        </Flex>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                );
              })}
            </Flex>
            <br />
            <Button
              size={"sm"}
              onClick={() => {
                append({
                  id: `g${uniqueId(5)}`,
                  label: `Tag`,
                  color: colors[Math.floor(Math.random() * colors.length)],
                });
              }}
            >
              Add Tag
            </Button>
          </FormControl>
        </CardBody>
      </Card>
    </div>
  );
};

export default Step1;
