import { AuthorLinkType, TestPaper } from "@/app/_interface/testData";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TbPlus } from "react-icons/tb";

interface Props {
  authorIndex: number;
}

const Step1AuthorLinks = ({ authorIndex }: Props) => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<TestPaper>();

  const authorLinks = watch(`authors.${authorIndex}`);

  const {
    fields: authorLinkFields,
    append: appendAuthorLink,
    remove: removeAuthorLink,
    update: updateAuthorLink,
  } = useFieldArray({ name: `authors.${authorIndex}.links` });

  const authorLinkTypeDataList = {
    [AuthorLinkType.Email]: ["Email", "email"],
    [AuthorLinkType.Github]: ["GitHub", "url"],
    [AuthorLinkType.LinkedIn]: ["LinkedIn", "url"],
    [AuthorLinkType.Other]: ["Other", "url"],
    [AuthorLinkType.Phone]: ["Phone", "phone"],
    [AuthorLinkType.Twitter]: ["Twitter", "url"],
    [AuthorLinkType.Youtube]: ["Youtube", "url"],
  };

  return (
    <Box>
      {authorLinkFields.map((field, index) => {
        const authorLinkData = authorLinks.links[index];
        return (
          <Flex key={field.id} gap={2} my={3}>
            <Box flexGrow={1}>
              <FormControl>
                <FormLabel>Link Type</FormLabel>
                <Select
                  size={"sm"}
                  {...register(`authors.${authorIndex}.links.${index}.type`)}
                >
                  {(Object.values(AuthorLinkType) as Array<AuthorLinkType>).map(
                    (e) => (
                      <option key={e} value={e}>
                        {authorLinkTypeDataList[e][0]}
                      </option>
                    )
                  )}
                </Select>
              </FormControl>
            </Box>
            <Box flexGrow={1}>
              <FormControl>
                <FormLabel>Link URL</FormLabel>
                <Input
                  required
                  type={authorLinkTypeDataList[authorLinkData.type][1]}
                  size={"sm"}
                  {...register(`authors.${authorIndex}.links.${index}.url`, {
                    required: "A valid URL must be given",
                  })}
                />
              </FormControl>
            </Box>
            <Box flexGrow={1}>
              <FormControl>
                <FormLabel>Link Label</FormLabel>
                <Input
                  size={"sm"}
                  {...register(`authors.${authorIndex}.links.${index}.label`)}
                />
              </FormControl>
            </Box>

            <CloseButton mt={"auto"} onClick={() => removeAuthorLink(index)} />
          </Flex>
        );
      })}
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={() => {
          appendAuthorLink({
            type: AuthorLinkType.Email,
            label: "",
            url: "",
          });
        }}
        leftIcon={<TbPlus size={18} />}
      >
        Add Link
      </Button>
    </Box>
  );
};

export default Step1AuthorLinks;
