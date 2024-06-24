import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Button,
  ButtonGroup,
  Checkbox,
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
import { TestPaper } from "../interface/testData";
import { TestProps } from "../interface/testProps";
import {
  getActiveGroupCache,
  getGroupQuestionLegend,
  getSectionQuestionLegend,
} from "../formatters/getFunctions";
import { UserCacheGroup } from "../interface/userCache";
import { DispatchContext, StateContext, TestPaperContext } from "./page";
import GeneralInstructions from "./GeneralInstructions";
import Timer from "./Timer";
import test from "node:test";

interface PaperOptionsProps {
  type: number;
}

interface SectionButtonProps {
  optional: boolean;
  sectionName: string;
  active: boolean;
  questionLegend: number[];
  onClick: Function;
}
interface GroupButtonProps {
  optional: boolean;
  groupName: string;
  active: boolean;
  questionLegend: number[];
  onClick: Function;
}

const TestHeader = () => {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(DispatchContext);

  function PaperOptionsGroup() {
    return (
      <div className="flex text-white gap-2">
        <PaperOptions type={0} />
        <PaperOptions type={1} />
        <PaperOptions type={2} />
      </div>
    );
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
          <Text className="text-sm">
            {paperOptionsContent[props.type].text}
          </Text>
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

  function SectionSelect() {
    let activeGroup: UserCacheGroup = getActiveGroupCache(state);

    return (
      <div
        className=" bg-neutral-200 flex p-1 gap-2 items-center overflow-x-auto overflow-y-hidden"
        style={{ scrollbarWidth: "thin" }}
      >
        {activeGroup.sections.map((e, i) => {
          return (
            <SectionButton
              key={i}
              optional={e.optional}
              active={i == activeGroup.activeSectionIndex}
              sectionName={e.sectionName}
              questionLegend={getSectionQuestionLegend(e)}
              onClick={() => {
                dispatch({ type: "set_active_section", payload: i });
                if (e.questions[e.qIndex].status === 0 && e.qIndex === 0) {
                  dispatch({
                    type: "update_question_status",
                    payload: { qIndex: 0, newStatus: 1 },
                  });
                }
              }}
            ></SectionButton>
          );
        })}
      </div>
    );

    function SectionButton(props: SectionButtonProps) {
      return (
        <Popover placement="bottom" trigger="hover" openDelay={400}>
          <PopoverContent>
            <PopoverBody>
              <strong>{props.sectionName}</strong>
              <QuestionLegend
                legendCounts={props.questionLegend}
                viewMode={0}
              />
            </PopoverBody>
          </PopoverContent>

          <PopoverAnchor>
            <div
              className={
                (props.active ? "bg-blue-900 text-white" : "bg-white") +
                ` flex items-center gap-0.5 p-1 rounded-md my-1 text-sm h-7 min-w-fit`
              }
              onClick={() => {
                props.onClick();
              }}
            >
              {props.optional && <Checkbox size={"sm"} />}
              <Text>{props.sectionName}</Text>
              <PopoverTrigger>
                <TbInfoCircleFilled className="text-sky-600 text-base" />
              </PopoverTrigger>
            </div>
          </PopoverAnchor>
        </Popover>
      );
    }
  }

  function HeaderDashboard() {
    return (
      <div className="h-auto flex">
        <div className=" flex-1 flex flex-box flex-col">
          <GroupSelect />
          <TimerBar />
          <SectionSelect />
        </div>
        <div
          className="w-64 bg-white flex-0 flex flex-box flex-col items-center justify-start
        gap-3 p-2 outline outline-1 outline-neutral-400"
        >
          <Avatar size={"lg"} className="flex-0 self-center" />
          <Text className="font-semibold flex-1 text-center">User</Text>
        </div>
      </div>
    );
  }

  function TimerBar() {
    return (
      <div className="bg-white h-8 flex justify-between items-center p-1 text-sm">
        <Text>Sections</Text>
        {state.testStatus === "finished" && (
          <Text textColor={"red"}>Test Finished</Text>
        )}
        <Timer />
      </div>
    );
  }

  function GroupSelect() {
    return (
      <div className="h-10 bg-neutral-300 flex justify-between px-2">
        <div className=" flex gap-2 items-center overflow-x-auto overflow-y-hidden">
          {state.body.map((e, i) => {
            const activeQuestionIndex = e.sections[e.activeSectionIndex].qIndex;
            return (
              <GroupButton
                key={i}
                active={i == state.activeGroupIndex}
                optional={false}
                groupName={e.groupName}
                questionLegend={getGroupQuestionLegend(e)}
                onClick={() => {
                  dispatch({ type: "set_active_group", payload: i });
                  if (
                    e.sections[e.activeSectionIndex].questions[
                      activeQuestionIndex
                    ].status == 0 &&
                    activeQuestionIndex === 0
                  ) {
                    dispatch({
                      type: "update_question_status",
                      payload: { qIndex: 0, newStatus: 1 },
                    });
                  }
                }}
              />
            );
          })}
        </div>
        <ToolsButtons />
      </div>
    );

    function GroupButton(props: GroupButtonProps) {
      return (
        <Popover placement="bottom" trigger="hover" openDelay={400}>
          <PopoverContent>
            <PopoverBody>
              <strong>{props.groupName}</strong>
              <QuestionLegend
                legendCounts={props.questionLegend}
                viewMode={0}
              />
            </PopoverBody>
          </PopoverContent>

          <PopoverAnchor>
            <div
              className={
                (props.active ? "bg-blue-400 text-white" : "bg-white") +
                ` flex items-center gap-0.5 p-1 rounded-md my-1 text-sm h-7 min-w-fit`
              }
              onClick={() => props.onClick()}
            >
              {props.groupName}
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
        <Text color={"white"}>{testPaper.name}</Text>
        <PaperOptionsGroup />
      </div>
      <HeaderDashboard />
    </div>
  );
};

export default TestHeader;
