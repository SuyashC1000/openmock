import { findTotalValidQuestionsAndMarks } from "@/app/_functions/findTotal";
import { TestPaper } from "@/app/_interface/testData";
import {
  Box,
  Button,
  Checkbox,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TbPlus } from "react-icons/tb";

const Step4CustomEvaluation = () => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<TestPaper>();

  const {
    fields: evaluationTierFields,
    append: appendEvaluationTier,
    remove: removeEvaluationTier,
    update: updateEvaluationTier,
    replace: replaceEvaluationTier,
  } = useFieldArray({ name: "analysis.customEvaluation.data" });

  const customEvaluation = watch("analysis.customEvaluation");

  const data = watch(`body`);

  const tierRangeMinMax =
    customEvaluation?.basis === "marks"
      ? [
          findTotalValidQuestionsAndMarks("body", data, true).validMarks,
          findTotalValidQuestionsAndMarks("body", data).validMarks,
        ]
      : [0, 100];

  return (
    <div>
      <div>
        <Flex gap={2}>
          <Box flexGrow={1}>
            <FormControl>
              <FormLabel>Basis of Evaluation</FormLabel>
              <Select {...register(`analysis.customEvaluation.basis`)}>
                <option value={"marks"}>Marks</option>
                <option value={"percentage"}>Percentage</option>
              </Select>
            </FormControl>
          </Box>
          <Box flexGrow={1}>
            <FormControl>
              <FormLabel>Evaluation Type</FormLabel>
              <Select {...register(`analysis.customEvaluation.type`)}>
                <option value={"custom"}>Custom</option>
                <option value={"grade"}>Grade</option>
                <option value={"percentile"}>Percentile</option>
                <option value={"rank"}>Rank</option>
              </Select>
            </FormControl>
          </Box>
        </Flex>
        <br />
        <Flex flexDirection={"column"} gap={2}>
          {evaluationTierFields.map((field, index) => {
            const tierData = watch(`analysis.customEvaluation.data.${index}`);
            return (
              <Flex key={field.id} gap={2}>
                <Box flexGrow={1}>
                  <FormControl>
                    <FormLabel>Tier Label</FormLabel>
                    <Input
                      size={"sm"}
                      {...register(
                        `analysis.customEvaluation.data.${index}.label`,
                        {
                          required: "A tier name must be provided",
                          shouldUnregister: true,
                        }
                      )}
                    />
                  </FormControl>
                </Box>
                <Box flexGrow={1}>
                  <FormControl>
                    <FormLabel>Tier Lower Limit</FormLabel>
                    <Input
                      size={"sm"}
                      {...register(
                        `analysis.customEvaluation.data.${index}.range[0]`,
                        {
                          valueAsNumber: true,
                          min: {
                            value: tierRangeMinMax[0],
                            message:
                              "Number cannot be lower than minimum possible value",
                          },
                          max: {
                            value: tierRangeMinMax[1],
                            message:
                              "Number cannot be higher than maximum possible value",
                          },
                          required: "A lower limit must be specified",
                          shouldUnregister: true,
                        }
                      )}
                    />
                  </FormControl>
                </Box>
                <Box flexGrow={1}>
                  <FormControl>
                    <FormLabel>Tier Upper Limit</FormLabel>
                    <Input
                      required
                      size={"sm"}
                      {...register(
                        `analysis.customEvaluation.data.${index}.range[1]`,
                        {
                          valueAsNumber: true,
                          min: {
                            value: tierRangeMinMax[0],
                            message:
                              "Number cannot be lower than minimum possible value",
                          },
                          max: {
                            value: tierRangeMinMax[1],
                            message:
                              "Number cannot be higher than maximum possible value",
                          },
                          required: "An upper limit must be specified",
                          shouldUnregister: true,
                        }
                      )}
                    />
                  </FormControl>
                </Box>

                <CloseButton
                  mt={"auto"}
                  onClick={() => {
                    removeEvaluationTier(index);
                  }}
                />
              </Flex>
            );
          })}
        </Flex>

        <Button
          size={"sm"}
          mt={2}
          variant={"ghost"}
          leftIcon={<TbPlus size={20} />}
          onClick={() =>
            appendEvaluationTier({ label: "", range: [null, null] })
          }
        >
          Add Tier
        </Button>
      </div>
    </div>
  );
};

export default Step4CustomEvaluation;
