import { TestPaper } from "@/app/_interface/testData";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import Step1AuthorLinks from "./Step1AuthorLinks";
import { TbPlus, TbTrash } from "react-icons/tb";
import { availableMemory } from "process";

const Step1Authors = () => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<TestPaper>();

  const authors = watch(`authors`);

  const {
    fields: authorFields,
    append: appendAuthor,
    remove: removeAuthor,
    update: updateAuthor,
  } = useFieldArray({ name: "authors" });

  return (
    <div>
      <FormControl>
        <FormLabel>Test Paper Authors</FormLabel>

        <Flex flexDirection={"column"} gap={3}>
          {authorFields.map((field, index) => {
            const authorData = authors[index];
            return (
              <Card key={field.id} variant={"outline"}>
                <CardBody>
                  <Flex gap={2}>
                    <Box flexGrow={3}>
                      <FormControl>
                        <FormLabel>Author Name</FormLabel>
                        <Input
                          {...register(`authors.${index}.name`, {
                            required: true,
                          })}
                        />
                      </FormControl>
                    </Box>
                    <Box flexGrow={3}>
                      <FormControl>
                        <FormLabel>Author Avatar URL</FormLabel>
                        <Input {...register(`authors.${index}.avatarUrl`)} />
                      </FormControl>
                    </Box>
                    <Flex
                      flexGrow={1}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Avatar
                        size={"xl"}
                        src={
                          authorData.avatarUrl !== null
                            ? authorData.avatarUrl
                            : undefined
                        }
                        name={authorData.name}
                      />
                    </Flex>
                    <Button
                      colorScheme="red"
                      variant={"ghost"}
                      size={"sm"}
                      onClick={() => removeAuthor(index)}
                    >
                      <TbTrash size={20} />
                    </Button>
                  </Flex>
                  <br />
                  <FormControl>
                    <FormLabel>Author Contact Details</FormLabel>
                    <Step1AuthorLinks authorIndex={index} />
                  </FormControl>
                </CardBody>
              </Card>
            );
          })}
        </Flex>
        <Button
          mt={1}
          variant={"ghost"}
          size={"sm"}
          onClick={() => {
            appendAuthor({
              name: "",
              avatarUrl: "",
              links: [],
            });
          }}
          leftIcon={<TbPlus size={18} />}
        >
          Add Author
        </Button>
      </FormControl>
    </div>
  );
};

export default Step1Authors;
