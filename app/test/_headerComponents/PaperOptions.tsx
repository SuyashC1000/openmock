import {
  Alert,
  AlertDescription,
  AlertIcon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { TbInfoCircleFilled, TbNotes, TbQuestionMark } from "react-icons/tb";
import GeneralInstructions from "../GeneralInstructions";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { StateContext, TestPaperContext } from "../page";
import GroupQuestionPaper from "./GroupQuestionPaper";
import {
  getActiveGroup,
  getActiveSection,
} from "@/app/_functions/getActiveCache";

interface PaperOptionsProps {
  type: number;
}

function PaperOptions(props: PaperOptionsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const paperOptionsContent = [
    {
      text: "View Instructions",
      icon: <TbInfoCircleFilled className="text-sky-700 text-base" />,
      warning: "the instructions",
    },
    {
      text: "Question Paper",
      icon: <TbNotes className="text-emerald-500 text-base" />,
      warning: "this question paper",
    },
    {
      text: "Useful Data",
      icon: <TbQuestionMark className="text-orange-500 text-base" />,
      warning: "this data",
    },
    {
      text: "Group Instructions",
      icon: <TbInfoCircleFilled className="text-sky-700 text-base" />,
      warning: "the instructions",
    },
    {
      text: "Section Instructions",
      icon: <TbInfoCircleFilled className="text-sky-700 text-base" />,
      warning: "the instructions",
    },
  ];

  function PaperOptionDisplayCases() {
    const testPaper = React.useContext(TestPaperContext);
    const state = React.useContext(StateContext);

    const activeGroup = getActiveGroup(testPaper, state);
    const activeSection = getActiveSection(testPaper, state);

    switch (props.type) {
      case 0: {
        const specificInstructions =
          testPaper.instructions[state.currentLanguageIndex].length === 0
            ? "There are no other specific instructions."
            : testPaper.instructions[state.currentLanguageIndex];
        return (
          <>
            <Text className="font-bold text-lg underline text-center mb-3">
              General Instructions
            </Text>
            <GeneralInstructions
              testDuration={testPaper.maxTime}
              calculator={testPaper.additionalTools.calculator}
            />
            <br />
            <Text className="font-bold text-lg underline text-center mb-3">
              Other Specific Instructions
            </Text>
            <Markdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {specificInstructions}
            </Markdown>
          </>
        );
      }
      case 1: {
        return (
          <GroupQuestionPaper
            group={activeGroup}
            languageIndex={state.currentLanguageIndex}
          />
        );
      }
      case 2: {
        return (
          <>
            <Markdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {testPaper.usefulData![state.currentLanguageIndex]}
            </Markdown>
          </>
        );
      }
      case 3: {
        const specificInstructions =
          activeGroup.instructions![state.currentLanguageIndex].length === 0
            ? "There are no other specific instructions."
            : activeGroup.instructions![state.currentLanguageIndex];
        return (
          <>
            <Markdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {specificInstructions}
            </Markdown>
          </>
        );
      }
      case 4: {
        const specificInstructions =
          activeSection.instructions![state.currentLanguageIndex].length === 0
            ? "There are no other specific instructions."
            : activeSection.instructions![state.currentLanguageIndex];
        return (
          <>
            <Markdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {specificInstructions}
            </Markdown>
          </>
        );
      }
    }
  }

  return (
    <>
      <div
        className="flex items-center gap-1 cursor-pointer hover:underline p-1 rounded select-none font-medium"
        onClick={onOpen}
      >
        {paperOptionsContent[props.type].icon}
        <Text className="text-sm">{paperOptionsContent[props.type].text}</Text>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent className="select-none">
          <ModalHeader>{paperOptionsContent[props.type].text}</ModalHeader>
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>
              Note that the timer is ticking while you read{" "}
              {paperOptionsContent[props.type].warning}. Close this page to
              return to answering the questions.
            </AlertDescription>
          </Alert>
          <ModalCloseButton />
          <ModalBody>
            <div className="m-2 mt-5">
              <PaperOptionDisplayCases />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PaperOptions;
