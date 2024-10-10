import { UserData } from "@/app/_interface/userData";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { Form, useFormContext } from "react-hook-form";

const UserProfileEditor = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors, isValid },
  } = useFormContext<UserData>();

  const data = watch("profile", { name: "", imageSrc: "" });

  return (
    <Card>
      <CardBody>
        <Heading size={"md"}>User Profile</Heading>
        <br />
        <Flex>
          <Box flexGrow={3}>
            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Input
                {...register("profile.name", {
                  required: "A name must be given",
                  pattern: {
                    // value: /^[a-zA-z]+$/i,
                    value:
                      /^[A-Z][a-z]+(?:\s[A-Z][a-z]+?)?(?:\s[A-Z][a-z]+?)?$/g,
                    message:
                      "Entered name must be either your first name or full name (w/ optional \
               middle name) and be properly capitalized",
                  },
                })}
              />
              <p className="text-red-700 text-sm">
                {errors.profile?.name?.message}
              </p>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Profile Image</FormLabel>
              <Input type="url" {...register("profile.imageSrc")} />
              <p className="text-red-700 text-sm">
                {errors.profile?.imageSrc?.message}
              </p>
            </FormControl>
          </Box>

          <Flex flexGrow={1} justifyContent={"center"}>
            <Avatar size={"2xl"} src={data.imageSrc} name={data.name} />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default UserProfileEditor;
