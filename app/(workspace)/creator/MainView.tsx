import React from "react";
import Footer from "../../_components/Footer";
import {
  Box,
  Button,
  Heading,
  Input,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  useSteps,
} from "@chakra-ui/react";
import { DraftStateContext } from "./page";
import { Controller, useFormContext } from "react-hook-form";
import { TestPaper } from "@/app/_interface/testData";
import Step1 from "./Step1";
import { active } from "d3";
import Step2 from "./Step2";
import Step3 from "./Step3";

const MainView = () => {
  const state = React.useContext(DraftStateContext);
  const {
    control,
    register,
    formState: { errors, isValid },
  } = useFormContext<TestPaper>();

  const steps = [
    { title: "First", description: "Paper Details" },
    { title: "Second", description: "Grouping" },
    { title: "Third", description: "Questions" },
    { title: "Fourth", description: "Evaluation" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <div>
      <Heading>Creator page</Heading>

      <div className="max-w-3xl mx-auto mb-5">
        <Stepper index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <StepIndicator cursor={"pointer"}>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </div>
      {activeStep === 0 && <Step1 />}
      {activeStep === 1 && <Step2 />}
      {activeStep === 2 && <Step3 />}
      <input
        type="submit"
        disabled={!isValid}
        className="bg-green-400 p-3 text-white rounded-lg cursor-pointer hover:bg-green-500 active:bg-green-600"
      />
    </div>
  );
};

export default MainView;
