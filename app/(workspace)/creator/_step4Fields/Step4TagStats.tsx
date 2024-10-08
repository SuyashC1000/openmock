import { TestPaper } from "@/app/_interface/testData";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  CloseButton,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TbPlus } from "react-icons/tb";

const Step4TagStats = () => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<TestPaper>();

  const {
    fields: tagStatFields,
    append: appendTagStat,
    remove: removeTagStat,
    update: updateTagStat,
  } = useFieldArray({ name: "analysis.customTagStats" });

  const tagStats = watch("analysis.customTagStats");

  const tags = watch(`tags`);

  return (
    <div>
      <FormControl>
        <Flex flexDirection={"column"} gap={2}>
          {tagStatFields.map((field, index) => {
            const tagStatData = watch(`analysis.customTagStats.${index}`);

            const isExclusive = !tagStatData.tags.includes("");
            return (
              <Card key={field.id} variant={"outline"} size={"sm"}>
                <CardBody>
                  <Flex justifyContent={"center"} alignItems={"center"}>
                    <Editable
                      fontSize={"lg"}
                      fontWeight={"bold"}
                      py={0}
                      defaultValue={tagStatData.title}
                      placeholder="Title"
                    >
                      <EditablePreview p={0} />
                      <Input
                        required
                        as={EditableInput}
                        {...register(`analysis.customTagStats.${index}.title`, {
                          required: "Name must be provided",
                        })}
                        placeholder="Insert group name"
                      />
                    </Editable>
                    <CloseButton
                      ml={"auto"}
                      onClick={() => removeTagStat(index)}
                    />
                  </Flex>

                  <Flex gap={2} wrap={"wrap"}>
                    {tagStatData.tags.map((e, i) => {
                      if (e.length === 0) return undefined;

                      const [tagData] = tags.filter((f) => f.id === e);

                      return (
                        <Tag size={"md"} key={i} bgColor={tagData.color}>
                          <TagLabel>{tagData.label}</TagLabel>
                          <TagCloseButton
                            onClick={() => {
                              updateTagStat(index, {
                                ...tagStatData,
                                tags: tagStatData.tags.filter(
                                  (g, k) => g !== tagData.id
                                ),
                              });
                            }}
                          />
                        </Tag>
                      );
                    })}
                    <Popover trigger="hover" placement="bottom-end">
                      <PopoverAnchor>
                        <PopoverTrigger>
                          <Button>
                            <TbPlus size={20} />
                          </Button>
                        </PopoverTrigger>
                      </PopoverAnchor>

                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Question Tag Palette</PopoverHeader>

                        <PopoverBody>
                          <Flex gap={1} wrap={"wrap"} mx={"auto"}>
                            {tags
                              .filter((e) => !tagStatData.tags.includes(e.id))
                              .map((e, i) => {
                                return (
                                  <Tag
                                    cursor={"pointer"}
                                    key={i}
                                    size={"lg"}
                                    bgColor={e.color}
                                    onClick={() => {
                                      updateTagStat(index, {
                                        ...tagStatData,
                                        tags: [...tagStatData.tags, e.id],
                                      });
                                    }}
                                  >
                                    <TagLabel>{e.label}</TagLabel>
                                  </Tag>
                                );
                              })}
                            {!tags.some(
                              (e) => !tagStatData.tags.includes(e.id)
                            ) && <Text mx={"auto"}>No more tags left.</Text>}
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Flex>

                  <Checkbox
                    isChecked={isExclusive}
                    onChange={() => {
                      updateTagStat(index, {
                        ...tagStatData,
                        tags: isExclusive
                          ? [...tagStatData.tags, ""]
                          : tagStatData.tags.filter((e) => e !== ""),
                      });
                    }}
                  >
                    Only include questions with these tags
                  </Checkbox>
                </CardBody>
              </Card>
            );
          })}
        </Flex>

        <Button
          size={"sm"}
          mt={2}
          variant={"ghost"}
          leftIcon={<TbPlus size={20} />}
          onClick={() => appendTagStat({ title: "Tag Stat", tags: [] })}
        >
          Add Tag Stat
        </Button>
      </FormControl>
    </div>
  );
};

export default Step4TagStats;
