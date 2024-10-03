import { TestPaper } from "@/app/_interface/testData";
import {
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";

const Step1 = () => {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<Partial<TestPaper>>();

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
              isInvalid={errors.name ? true : false}
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
        </CardBody>
      </Card>
    </div>
  );
};

export default Step1;
