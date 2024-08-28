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

const MainView = () => {
  const state = React.useContext(DraftStateContext);
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TestPaper>();

  const steps = [
    { title: "First", description: "Paper Details" },
    { title: "Second", description: "Questions" },
    { title: "Third", description: "Evaluation" },
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
      <input type="submit" />
    </div>
  );
};

export default MainView;
