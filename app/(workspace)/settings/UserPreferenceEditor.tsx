import { AuthorLinkType } from "@/app/_interface/testData";
import { UserData } from "@/app/_interface/userData";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Switch,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TbPlus } from "react-icons/tb";

const UserPreferenceEditor = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors, isValid },
  } = useFormContext<UserData>();

  const data = watch("preferences", {
    defaultLanguage: "English",
    author: null,
  });

  const [isAuthorEnabled, setIsAuthorEnabled] = useState(false);

  const {
    fields: authorLinkFields,
    append: appendAuthorLink,
    remove: removeAuthorLink,
    update: updateAuthorLink,
  } = useFieldArray({ name: "preferences.author.links" });

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
    <Card>
      <CardBody>
        <Heading size={"md"}>Preferences</Heading>

        <FormControl>
          <FormLabel>Default Language</FormLabel>
          <Input
            {...register(`preferences.defaultLanguage`, {
              required: "A default language must be set",
            })}
          />
          <p className="text-red-700 text-sm">
            {errors.preferences?.defaultLanguage?.message}
          </p>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Default Author</FormLabel>

          <Flex alignItems={"center"} gap={2}>
            <Switch
              defaultChecked={data.author !== null}
              onChange={() => {
                setIsAuthorEnabled((e) => !e);
                setValue(
                  "preferences.author",
                  isAuthorEnabled
                    ? null
                    : { name: "", avatarUrl: "", links: [] }
                );
              }}
            />
            <Text>
              Create a default Author profile in every test you create
            </Text>
          </Flex>

          {data.author !== null && (
            <Card variant={"outline"}>
              <CardBody>
                <Flex gap={2}>
                  <Box flexGrow={3}>
                    <FormControl>
                      <FormLabel>Author Name</FormLabel>
                      <Input
                        required
                        {...register(`preferences.author.name`, {
                          required: "Author name must be provided",
                        })}
                      />
                      <p className="text-red-700 text-sm">
                        {errors.preferences?.author?.name?.message}
                      </p>
                    </FormControl>
                  </Box>
                  <Box flexGrow={3}>
                    <FormControl>
                      <FormLabel>Author Avatar URL</FormLabel>
                      <Input {...register(`preferences.author.avatarUrl`)} />
                    </FormControl>
                  </Box>
                  <Flex
                    flexGrow={1}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Avatar
                      size={"xl"}
                      src={data.author?.avatarUrl}
                      name={data.author?.name}
                    />
                  </Flex>
                </Flex>
                <br />
                <FormControl>
                  <FormLabel>Author Contact Details</FormLabel>
                  {authorLinkFields.map((field, index) => {
                    const authorLinkData = data.author!.links[index];
                    return (
                      <Flex key={field.id} gap={2} my={3}>
                        <Box flexGrow={1}>
                          <FormControl>
                            <FormLabel>Link Type</FormLabel>
                            <Select
                              size={"sm"}
                              {...register(
                                `preferences.author.links.${index}.type`
                              )}
                            >
                              {(
                                Object.values(
                                  AuthorLinkType
                                ) as Array<AuthorLinkType>
                              ).map((e) => (
                                <option key={e} value={e}>
                                  {authorLinkTypeDataList[e][0]}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box flexGrow={1}>
                          <FormControl>
                            <FormLabel>Link URL</FormLabel>
                            <Input
                              required
                              type={
                                authorLinkTypeDataList[authorLinkData.type][1]
                              }
                              size={"sm"}
                              {...register(
                                `preferences.author.links.${index}.url`,
                                {
                                  required: "A valid URL must be given",
                                }
                              )}
                            />
                          </FormControl>
                        </Box>
                        <Box flexGrow={1}>
                          <FormControl>
                            <FormLabel>Link Label</FormLabel>
                            <Input
                              size={"sm"}
                              {...register(
                                `preferences.author.links.${index}.label`
                              )}
                            />
                          </FormControl>
                        </Box>

                        <CloseButton
                          mt={"auto"}
                          onClick={() => removeAuthorLink(index)}
                        />
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
                  </Button>{" "}
                </FormControl>
              </CardBody>
            </Card>
          )}
        </FormControl>
      </CardBody>
    </Card>
  );
};

export default UserPreferenceEditor;
