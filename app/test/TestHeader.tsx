import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import React from "react";
import {
  TbCalculator,
  TbInfoCircleFilled,
  TbNotes,
  TbQuestionMark,
  TbZoomIn,
  TbZoomOut,
} from "react-icons/tb";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import QuestionLegend from "../components/QuestionLegend";

interface Props {
  type: number;
}

const TestHeader = () => {
  function PaperOptionsGroup() {
    return (
      <div className="flex text-white gap-2">
        <PaperOptions type={0} />
        <PaperOptions type={1} />
        <PaperOptions type={2} />
      </div>
    );
  }

  function PaperOptions(props: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const paperOptionsContent = [
      {
        text: "View Instructions",
        icon: <TbInfoCircleFilled className="text-sky-700 text-base" />,
      },
      {
        text: "Question Paper",
        icon: <TbNotes className="text-emerald-500 text-base" />,
      },
      {
        text: "Useful Data",
        icon: <TbQuestionMark className="text-orange-500 text-base" />,
      },
    ];

    return (
      <>
        <div
          className="flex items-center gap-1 cursor-pointer hover:underline p-1 rounded select-none font-medium"
          onClick={onOpen}
        >
          {paperOptionsContent[props.type].icon}
          <Text className="text-sm">
            {paperOptionsContent[props.type].text}
          </Text>
        </div>

        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{paperOptionsContent[props.type].text}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>
                  Note that the timer is ticking while you read the page. Close
                  this page to return to answering the questions.
                </AlertDescription>
              </Alert>
              <Markdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {"Hello this is **Patrick**"}
              </Markdown>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  function HeaderDashboard() {
    return (
      <div className="bg-red-200 h-auto flex">
        <div className=" flex-1 flex flex-box flex-col">
          <GroupSelect />
        </div>
        <div
          className="w-64 bg-white flex-0 flex flex-box items-start justify-start
        gap-3 p-2 outline outline-1 outline-neutral-400"
        >
          <Avatar size={"lg"} className="flex-0 self-center" />
          <Text className="font-semibold flex-1 text-center">User</Text>
        </div>
      </div>
    );
  }

  function GroupSelect() {
    return (
      <div className="h-10 bg-neutral-200 flex justify-between px-2">
        <GroupButtonGroup />
        <ToolsButtons />
      </div>
    );

    function GroupButtonGroup() {
      return (
        <div className="flex">
          <GroupButton />
        </div>
      );
    }

    function GroupButton() {
      return (
        <Popover placement="bottom" trigger="hover" openDelay={400}>
          <PopoverContent>
            <PopoverHeader>Group</PopoverHeader>
            <PopoverBody>
              <QuestionLegend legendCounts={[1, 2, 3, 4, 5]} viewMode={0} />
            </PopoverBody>
          </PopoverContent>

          <PopoverAnchor>
            <div className="bg-white flex items-center gap-1 p-1 rounded-lg my-1 text-sm">
              Hello
              <PopoverTrigger>
                <TbInfoCircleFilled className="text-sky-700 text-base" />
              </PopoverTrigger>
            </div>
          </PopoverAnchor>
        </Popover>
      );
    }
  }

  function ToolsButtons() {
    return (
      <ButtonGroup className="text-orange-500">
        <IconButton
          icon={<TbZoomIn />}
          aria-label="Zoom in"
          fontSize={"xl"}
          className="text-lg"
        />
        <IconButton
          icon={<TbZoomOut />}
          aria-label="Zoom out"
          fontSize={"xl"}
          className="text-lg"
        />
        <IconButton
          icon={<TbCalculator />}
          aria-label="Scientific calculator"
          fontSize={"xl"}
          className="text-lg"
        />
      </ButtonGroup>
    );
  }

  return (
    <div className="flex flex-col">
      <div
        className="h-8 w-screen bg-neutral-800 flex flex-0 justify-between
      items-center px-4 gap-4 outline-1 outline-slate-600 grow-0"
      >
        <Text color={"white"}>Test Paper Name</Text>
        <PaperOptionsGroup />
      </div>
      <HeaderDashboard />
    </div>
  );
};

export default TestHeader;
