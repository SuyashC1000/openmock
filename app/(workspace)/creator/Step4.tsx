import MDEditor from "@/app/_components/MDEditor";
import { TestPaper } from "@/app/_interface/testData";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { TbEdit, TbEye } from "react-icons/tb";
import Step4TagStats from "./_step4Fields/Step4TagStats";
import Step4CustomEvaluation from "./_step4Fields/Step4CustomEvaluation";

const Step4 = () => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<TestPaper>();

  const [isPreview, setIsPreview] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(0);

  const data = watch();

  const languages = watch("languages", [""]);
  const responseDescription = watch(
    `analysis.postTestMessage.${currentLanguage}`
  );
  const usefulData = watch(`usefulData.${currentLanguage}`);

  const isCustomTagStatEnabled = data.analysis.customTagStats !== undefined;
  const isCustomEvaluationEnabled =
    data.analysis.customEvaluation !== undefined;

  return (
    <div className="m-2">
      <Card>
        <CardBody>
          <Flex gap={2}>
            <Box flexGrow={1}>
              <FormControl>
                <FormLabel>In-test Calculator</FormLabel>
                <Select size={"sm"} {...register("additionalTools.calculator")}>
                  <option value={"none"}>Disabled</option>
                  <option value={"normal"}>Normal</option>
                  <option value={"scientific"}>Scientific</option>
                </Select>
              </FormControl>
            </Box>
            <Box flexGrow={1}>
              <FormControl>
                <FormLabel>Magnifying Glass</FormLabel>
                <Checkbox {...register("additionalTools.magnifyingGlass")}>
                  Allow adjusting zoom level during test
                </Checkbox>
              </FormControl>
            </Box>
          </Flex>

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

          <FormControl>
            <Flex gap={2}>
              <FormLabel>Post-Test Review</FormLabel>
            </Flex>
            <MDEditor
              isPreview={isPreview}
              content={responseDescription}
              onChange={(f) => {
                setValue(
                  `analysis.postTestMessage.${currentLanguage}`,
                  f.target.value
                );
              }}
              placeholder="Enter insight on the test paper after attempt"
            />
          </FormControl>
          <br />
          <FormControl>
            <Flex gap={2}>
              <FormLabel>Useful Data</FormLabel>
            </Flex>
            <MDEditor
              isPreview={isPreview}
              content={usefulData}
              onChange={(f) => {
                setValue(`usefulData.${currentLanguage}`, f.target.value);
              }}
              placeholder="Enter reference data for use during test"
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Tag Stats Editor</FormLabel>

            <Checkbox
              isChecked={isCustomTagStatEnabled}
              onChange={() => {
                setValue(
                  "analysis.customTagStats",
                  isCustomTagStatEnabled ? undefined : []
                );
              }}
            >
              Enable Tag Stats
            </Checkbox>
          </FormControl>
          {isCustomTagStatEnabled && <Step4TagStats />}

          <br />

          <FormControl>
            <FormLabel>Custom Evaluation</FormLabel>

            <Checkbox
              isChecked={isCustomEvaluationEnabled}
              onChange={() => {
                setValue(
                  "analysis.customEvaluation",
                  isCustomEvaluationEnabled
                    ? undefined
                    : {
                        basis: "marks" as const,
                        type: "custom" as const,
                        data: [],
                      }
                );
              }}
            >
              Enable Custom Evaluation
            </Checkbox>
          </FormControl>
          {isCustomEvaluationEnabled && <Step4CustomEvaluation />}
          <br />
        </CardBody>
      </Card>
    </div>
  );
};

export default Step4;
