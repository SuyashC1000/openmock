import React from "react";
import Footer from "../../_components/Footer";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
  useToast,
} from "@chakra-ui/react";
import { DraftStateContext } from "./page";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { TestPaper } from "@/app/_interface/testData";
import Step1 from "./Step1";
import { active } from "d3";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { TbChevronDown, TbCopy, TbDeviceFloppy, TbTrash } from "react-icons/tb";
import { uniqueId } from "@/app/_functions/randomGenerator";
import { db } from "@/db/db";
import useConfirm from "@/lib/useConfirm";
import DraftErrorList from "./DraftErrorList";

const MainView = () => {
  const state = React.useContext(DraftStateContext);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useFormContext<TestPaper>();

  const steps = [
    { title: "First", description: "Paper Details" },
    { title: "Second", description: "Grouping" },
    { title: "Third", description: "Questions" },
    { title: "Fourth", description: "Evaluation" },
  ];

  const toast = useToast();
  const { confirm } = useConfirm();

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const onSubmitPaper: SubmitHandler<Partial<TestPaper>> = (data: any) => {
    alert("Done!");
  };

  const onSubmitSaveDraft: SubmitHandler<Partial<TestPaper>> = async (
    data: Partial<TestPaper>
  ) => {
    const isPresent = await db.testDrafts.where("id").equals(data.id!).count();

    db.testDrafts.put(data).then(() => {
      toast({
        title: `Draft successfully ${isPresent > 0 ? "updated" : "created"}`,
        description: "Test paper draft has been saved",
        status: "success",
        position: "top",
        variant: "subtle",
      });
    });
  };

  const onSubmitCopyDraft: SubmitHandler<Partial<TestPaper>> = (
    data: Partial<TestPaper>
  ) => {
    let newcopy = data;
    newcopy.id = `td${uniqueId(10)}`;
    newcopy.name += " (Copy)";

    db.testDrafts.add(newcopy).then(() => {
      toast({
        title: "Draft successfully copied",
        description: "Copied test paper draft has been saved",
        status: "success",
        position: "top",
        variant: "subtle",
      });
    });
  };

  const onSubmitRemoveDraft: SubmitHandler<Partial<TestPaper>> = async (
    data: Partial<TestPaper>
  ) => {
    const isPresent = await db.testDrafts.where("id").equals(data.id!).count();

    if (isPresent > 0) {
      console.log("jig jog");

      const isConfirmed = await confirm(
        "Discard draft?",
        "The last save of this test paper will be permanently deleted. \
        You will still be able to work on the draft currently opened"
      );
      if (isConfirmed) {
        await db.testDrafts.delete(data.id).then(() => {
          toast({
            title: "Draft successfully discarded",
            description: "Test paper draft has been successfully deleted",
            status: "success",
            position: "top",
            variant: "subtle",
          });
        });
      }
    } else {
      toast({
        title: "Draft doesn't exist",
        description:
          "No last save of this test paper draft was found for deletion",
        status: "error",
        position: "top",
        variant: "subtle",
      });
    }
  };

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

      {/* <DraftErrorList /> */}

      <Flex gap={3}>
        <Button
          type="submit"
          colorScheme="green"
          // isDisabled={!isValid}
          onClick={handleSubmit(onSubmitPaper)}
        >
          Submit
        </Button>

        <Menu strategy="fixed">
          <MenuButton
            as={Button}
            // isDisabled={!isValid}
            colorScheme="yellow"
            rightIcon={<TbChevronDown />}
          >
            Draft
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={<TbDeviceFloppy size={20} />}
              onClick={handleSubmit(onSubmitSaveDraft)}
            >
              Save Draft
            </MenuItem>
            <MenuItem
              icon={<TbCopy size={20} />}
              onClick={handleSubmit(onSubmitCopyDraft)}
            >
              Make Copy
            </MenuItem>
            <MenuItem
              icon={<TbTrash size={20} />}
              onClick={handleSubmit(onSubmitRemoveDraft)}
            >
              Discard Draft
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </div>
  );
};

export default MainView;
