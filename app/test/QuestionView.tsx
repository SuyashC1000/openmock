"use client";

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Icon,
  Text,
} from "@chakra-ui/react";
import { getActiveSectionCache } from "../_functions/getActiveCache";
import UserResponse from "./UserResponse";
import {
  TestDispatchContext,
  TestStateContext,
  TestPaperContext,
} from "./page";

import MarkingSchemeDisplay from "./_mainViewComponents/MarkingSchemeDisplay";
import useActiveElements from "@/lib/useActiveElements";
import ConstraintAlert from "./_alerts/ConstraintAlert";
import { questionConstraint } from "../_functions/questionConstraint";
import {
  TbArrowDown,
  TbArrowUp,
  TbChevronRight,
  TbChevronsLeft,
  TbChevronsRight,
} from "react-icons/tb";
import Marks from "../_components/Marks";
import { TOGGLE_SIDEBAR } from "../_functions/userCacheReducer";
import { useWindowResize } from "@/lib/useWindowResize";

const QuestionView = () => {
  const testPaper = React.useContext(TestPaperContext);
  const state = React.useContext(TestStateContext);
  const dispatch = React.useContext(TestDispatchContext);

  const [width, height] = useWindowResize();

  const { activeQuestionCache, activeSectionCache, activeQuestion } =
    useActiveElements();

  const [isQDetailsCollapsed, setIsQDetailsCollapsed] = React.useState(true);

  const qDisplayRef = React.useRef<HTMLDivElement>(null);
  let isScrollable =
    qDisplayRef.current?.scrollHeight! > qDisplayRef.current?.clientHeight!;

  const markdown =
    testPaper.body[state.activeGroupIndex].sections[
      state.body[state.activeGroupIndex].activeSectionIndex
    ].questions[activeSectionCache.qIndex].question[state.currentLanguageIndex];

  const zoomLevel = state.preferences.zoomLevel;
  return (
    <div className="flex flex-col flex-1 h-full relative">
      <div className="h-0 absolute top-1/2 right-0 " style={{ zIndex: 3 }}>
        <Button
          colorScheme="blackAlpha"
          roundedRight={0}
          size={"sm"}
          p={0}
          onClick={() => {
            dispatch({
              type: TOGGLE_SIDEBAR,
              payload: null,
            });
          }}
        >
          <Icon
            as={
              state.preferences.sidebarCollapsed
                ? TbChevronsLeft
                : TbChevronsRight
            }
            fontSize={"3xl"}
          />
        </Button>
      </div>
      {questionConstraint(state, testPaper).canView && (
        <>
          <div
            className=" outline outline-1 outline-neutral-400 p-1 px-2
          flex justify-between sticky top-0 bg-white"
          >
            <span className="flex items-center gap-1">
              <Text className="text-sm font-semibold">
                Question Type: {activeQuestion.qTypeName}
              </Text>
              <Icon
                as={TbChevronRight}
                className={`text-xl duration-300 ${
                  isQDetailsCollapsed
                    ? "stroke-neutral-900 hover:border-2 hover:border-neutral-500"
                    : "stroke-blue-600 bg-blue-10 hover:stroke-white hover:bg-blue-500 rotate-90"
                } rounded-full`}
                onClick={() => setIsQDetailsCollapsed((e) => !e)}
              ></Icon>
            </span>

            <div className="text-xs flex gap-2">
              <Text>
                Marks for correct answer:{" "}
                {Marks(activeQuestion.markingScheme[0], "element")}
              </Text>
              <Text>|</Text>
              <Text>
                Incorrect answer:{" "}
                {Marks(activeQuestion.markingScheme[1], "element")}
              </Text>
            </div>
          </div>
          <div
            className="flex flex-1 h-full flex-col px-4 py-2 gap-2  overflow-y-auto"
            ref={qDisplayRef}
          >
            <span className="w-10 self-end h-0">
              <Button
                colorScheme="blue"
                rounded={"full"}
                padding={0}
                zIndex={3}
                fontSize={"2xl"}
                display={isScrollable ? "initial" : "none"}
                onClick={() => {
                  qDisplayRef.current?.scrollTo({
                    top: qDisplayRef.current.scrollHeight,
                    behavior: "smooth",
                  });
                }}
              >
                <Icon as={TbArrowDown}></Icon>
              </Button>
            </span>
            {!isQDetailsCollapsed && (
              <MarkingSchemeDisplay
                markingScheme={activeQuestion.markingScheme}
                qDataType={activeQuestion.qDataType}
                qTypeName={activeQuestion.qTypeName}
              />
            )}
            <Text
              className="font-semibold p-1"
              fontSize={`${1 + (zoomLevel - 1) * 0.25}rem`}
            >
              Question No. {getActiveSectionCache(state).qIndex + 1}
            </Text>

            <ConstraintAlert />
            <Markdown
              className={`font-serif text-${zoomLevel === 3 ? "xl" : zoomLevel === 2 ? "lg" : "base"}`}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {markdown}
            </Markdown>
            <UserResponse />

            <span className="w-10 self-end h-0">
              <Button
                colorScheme="blue"
                rounded={"full"}
                padding={0}
                fontSize={"2xl"}
                display={isScrollable ? "initial" : "none"}
                onClick={() => {
                  qDisplayRef.current?.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                <Icon as={TbArrowUp}></Icon>
              </Button>
            </span>
          </div>
        </>
      )}
      {!questionConstraint(state, testPaper).canView && (
        <div className="p-3">
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize={"lg"}>
              Question Locked
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              You can no longer revisit or edit the response of this question.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default QuestionView;
