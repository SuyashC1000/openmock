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
import { TestPaperContext } from "../page";

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
  ];

  function PaperOptionDisplayCases() {
    const testPaper = React.useContext(TestPaperContext);

    switch (props.type) {
      case 0: {
        const specificInstructions =
          testPaper.instructions.length === 0
            ? "There are no other specific instructions."
            : testPaper.instructions;
        return (
          <>
            <Text className="font-bold text-lg underline text-center mb-3">
              General Instructions
            </Text>
            <GeneralInstructions testDuration={testPaper.maxTime} />
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
        <ModalContent>
          <ModalHeader>{paperOptionsContent[props.type].text}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>
                Note that the timer is ticking while you read{" "}
                {paperOptionsContent[props.type].warning}. Close this page to
                return to answering the questions.
              </AlertDescription>
            </Alert>
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
