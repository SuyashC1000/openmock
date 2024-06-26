"use client";

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import {
  Button,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
// import Marks from "../_components/Marks";
import numberToWords from "../_formatters/numberToWords";
import {
  UserCache,
  UserCacheQuestion,
  UserCacheSection,
} from "../_interface/userCache";
import {
  getActiveQuestion,
  getActiveQuestionCache,
  getActiveSectionCache,
} from "../_formatters/getActiveCache";
import UserResponse from "./UserResponse";
import { TestPaperQuestion } from "../_interface/testData";
import { StateContext, TestPaperContext } from "./page";
import ConstraintAlert from "./ConstraintAlert";
import MarkingSchemeDisplay from "./_mainViewComponents/MarkingSchemeDisplay";

const QuestionView = () => {
  const testPaper = React.useContext(TestPaperContext);
  const state = React.useContext(StateContext);

  let activeSection: UserCacheSection = getActiveSectionCache(state);
  let activeQuestion: TestPaperQuestion = getActiveQuestion(testPaper, state);

  const markdown =
    testPaper.body[state.activeGroupIndex].sections[
      state.body[state.activeGroupIndex].activeSectionIndex
    ].questions[activeSection.qIndex].question[state.currentLanguageIndex];

  return (
    <div className="flex flex-col">
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
        <Text className="font-semibold p-1">
          Question No. {getActiveSectionCache(state).qIndex + 1}
        </Text>
        <ConstraintAlert />
        {"Last answered: " + getActiveQuestionCache(state).lastAnswered}
        <Markdown
          className="font-serif"
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {markdown}
        </Markdown>
        <UserResponse />
      </div>
    </div>
  );
};

export default QuestionView;
