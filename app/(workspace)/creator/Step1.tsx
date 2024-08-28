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
import React from "react";
import { useForm, useFormContext } from "react-hook-form";

const Step1 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TestPaper>();

  return (
    <div className="m-2">
      <Card>
        <CardBody>
          <FormControl>
            <FormLabel>Name of Test Paper</FormLabel>
            <Input
              size={"sm"}
              placeholder="Enter a name between 3 and 40 characters"
              {...register("name", {
                minLength: 2,
                maxLength: 40,
                required: true,
              })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-700 text-sm">Required</p>
            )}
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Test Duration (in minutes)</FormLabel>
            <NumberInput size={"sm"} inputMode="numeric">
              <NumberInputField
                {...register("maxMetrics.time", {
                  valueAsNumber: true,
                  required: true,
                  min: 1,
                  max: 999,
                })}
                placeholder="Enter duration of test paper (in minutes)"
                min={1}
                max={999}
              />
              {errors.maxMetrics?.time?.type === "required" && (
                <p className="text-red-700 text-sm">Required</p>
              )}
              {errors.maxMetrics?.time?.type === "max" && (
                <p className="text-red-700 text-sm">
                  Duration cannot be more than 999 minutes!
                </p>
              )}
            </NumberInput>
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
