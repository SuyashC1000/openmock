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
  Text,
} from "@chakra-ui/react";
import { getActiveSectionCache } from "../_formatters/getActiveCache";
import UserResponse from "./UserResponse";
import { StateContext, TestPaperContext } from "./page";

import MarkingSchemeDisplay from "./_mainViewComponents/MarkingSchemeDisplay";
import useActiveElements from "@/lib/useActiveElements";
import ConstraintAlert from "./_alerts/ConstraintAlert";
import { questionConstraint } from "../_formatters/questionConstraint";

const QuestionView = () => {
  const testPaper = React.useContext(TestPaperContext);
  const state = React.useContext(StateContext);

  const { activeQuestionCache, activeSectionCache, activeQuestion } =
    useActiveElements();

  const markdown =
    testPaper.body[state.activeGroupIndex].sections[
      state.body[state.activeGroupIndex].activeSectionIndex
    ].questions[activeSectionCache.qIndex].question[state.currentLanguageIndex];

  const zoomLevel = state.toolsPreferences.zoomLevel;

  return (
    <div className="flex flex-col">
      {questionConstraint(state, testPaper).canView && (
        <>
          <div className=" outline outline-1 outline-neutral-400 p-1 px-2 flex justify-between">
            <Text className="text-sm font-semibold">
              Question Type: {activeQuestion.qTypeName}
            </Text>

            <MarkingSchemeDisplay
              markingScheme={activeQuestion.markingScheme}
              qDataType={activeQuestion.qDataType}
              qTypeName={activeQuestion.qTypeName}
            />
          </div>
          <div className="flex flex-col px-4 py-2 gap-2">
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
            <AlertTitle mt={4} mb={1} fontSize="lg">
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
