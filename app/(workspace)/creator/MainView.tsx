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
import {
  TbCaretLeft,
  TbCaretRight,
  TbChevronDown,
  TbCopy,
  TbDeviceFloppy,
  TbTrash,
} from "react-icons/tb";
import { uniqueId } from "@/app/_functions/randomGenerator";
import { db } from "@/db/db";
import useConfirm from "@/lib/useConfirm";
import DraftErrorList from "./DraftErrorList";
import Step4 from "./Step4";
import { findTotalValidQuestionsAndMarks } from "@/app/_functions/findTotal";
import { useLiveQuery } from "dexie-react-hooks";

const MainView = () => {
  const state = React.useContext(DraftStateContext);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors, isValid },
  } = useFormContext<TestPaper>();

  const steps = [
    { title: "First", description: "Paper Details" },
    { title: "Second", description: "Grouping" },
    { title: "Third", description: "Questions" },
    { title: "Fourth", description: "Miscellaneous" },
  ];

  const name = watch(`name`, "");

  const toast = useToast();
  const { confirm } = useConfirm();

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const isCurrentDraftSaved =
    useLiveQuery(() => db.testDrafts.where("id").equals(name).count()) ?? 0;
  const isCurrentDraftValidPaper =
    useLiveQuery(() => db.testPapers.where("id").equals(name).count()) ?? 0;

  function updateMaxMetrics(data: TestPaper) {
    const { validMarks, validQuestions } = findTotalValidQuestionsAndMarks(
      "body",
      data.body
    );
    data.maxMetrics.marks = validMarks;
    data.maxMetrics.questions = validQuestions;
    return data;
  }

  const onSubmitPaper: SubmitHandler<TestPaper> = (data: TestPaper) => {
    data.timeCreated = Date.now();
    data.id = `t${uniqueId(10)}`;
    data = updateMaxMetrics(data);

    db.testPapers.add(data).then(() => {
      toast({
        title: "Paper successfully published",
        description: "Draft is saved as a copy ready to be attempted",
        status: "success",
        position: "top",
        variant: "subtle",
      });
    });
  };

  const onSubmitSaveDraft: SubmitHandler<TestPaper> = async (
    data: TestPaper
  ) => {
    const isPresent = await db.testDrafts.where("id").equals(data.id!).count();
    data = updateMaxMetrics(data);

    db.testDrafts.put(data).then(() => {
      toast({
        title: `Draft successfully ${isPresent > 0 ? "updated" : "created"}`,
        description: `${isPresent > 0 ? "Updated draft is" : "Draft is now"} accessible from the Home page`,
        status: "success",
        position: "top",
        variant: "subtle",
      });
    });
  };

  const onSubmitCopyDraft: SubmitHandler<TestPaper> = (data: TestPaper) => {
    let newcopy = data;
    newcopy.id = `td${uniqueId(10)}`;
    newcopy.name += " (Copy)";
    newcopy = updateMaxMetrics(newcopy);

    db.testDrafts.add(newcopy).then(() => {
      toast({
        title: "Draft successfully copied",
        description: "Copy is accessible from the Home page",
        status: "success",
        position: "top",
        variant: "subtle",
      });
    });
  };

  const onSubmitRemoveDraft: SubmitHandler<TestPaper> = async (
    data: TestPaper
  ) => {
    const isPresent = await db.testDrafts.where("id").equals(data.id!).count();

    if (isPresent > 0) {
      const isConfirmed = await confirm(
        "Discard draft?",
        "The last save of this test paper will be permanently deleted. \
        You will still be able to work on the draft currently opened"
      );
      if (isConfirmed) {
        await db.testDrafts.delete(data.id).then(() => {
          toast({
            title: "Draft successfully discarded",
            description:
              "Curent draft will remain as is until you exit the page",
            status: "success",
            position: "top",
            variant: "subtle",
          });
        });
      }
    } else {
      toast({
        title: "No last save of draft found",
        description: "Ensure your draft exists in the Home page",
        status: "error",
        position: "top",
        variant: "subtle",
      });
    }
  };

  return (
    <div>
      <title>Creator - OpenMock</title>
      <Heading>Creator page</Heading>
      <div className="mx-auto flex gap-2">
        <Button
          variant={"ghost"}
          colorScheme="blue"
          isDisabled={activeStep <= 0}
          onClick={() => setActiveStep((e) => e - 1)}
        >
          <TbCaretLeft size={30} />
        </Button>
        <Stepper flexGrow={1} index={activeStep} mx={3}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
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
        <Button
          variant={"ghost"}
          colorScheme="blue"
          isDisabled={activeStep >= 3}
          onClick={() => setActiveStep((e) => e + 1)}
        >
          <TbCaretRight size={30} />
        </Button>
      </div>
      {activeStep === 0 && <Step1 />}
      {activeStep === 1 && <Step2 />}
      {activeStep === 2 && <Step3 />}
      {activeStep === 3 && <Step4 />}

      {/* <DraftErrorList /> */}
      {/* {JSON.stringify(data)} */}

      {(true || activeStep === 3) && (
        <Flex gap={3}>
          <Button
            type="submit"
            colorScheme="green"
            // isDisabled={!isValid}
            onClick={handleSubmit(onSubmitPaper)}
          >
            Publish
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
      )}
    </div>
  );
};

export default MainView;
