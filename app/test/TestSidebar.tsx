"use client";

import { Text } from "@chakra-ui/react";

import React from "react";
import QuestionLegend from "../_components/QuestionLegend";
import QuestionBtn from "../_components/QuestionBtn";
import {
  UserCache,
  UserCacheGroup,
  UserCacheQuestion,
  UserCacheSection,
} from "../_interface/userCache";
import { getSectionQuestionLegend } from "../_formatters/getFunctions";
import {
  getActiveQuestion,
  getActiveQuestionCache,
  getActiveSectionCache,
} from "../_formatters/getActiveCache";
import { DispatchContext, StateContext, TestPaperContext } from "./page";
import { TestPaperQuestion } from "../_interface/testData";
import QuestionsGrid from "./_sidebarComponents/QuestionsGrid";

const TestSidebar = () => {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const testPaper = React.useContext(TestPaperContext);

  let activeSection: UserCacheSection = getActiveSectionCache(state);
  let activeQuestion: TestPaperQuestion = getActiveQuestion(testPaper, state);

  function SectionHeading() {
    return (
      <div className="h-auto px-2 py-1  bg-sky-700">
        <Text className="text-white font-semibold">
          {activeSection.sectionName}
        </Text>
      </div>
    );
  }

  return (
    <div
      className="w-64 bg-slate-400 flex flex-box flex-col outline outline-1 outline-neutral-400
    border border-t-1 border-t-neutral-400"
    >
      <QuestionLegend
        legendCounts={getSectionQuestionLegend(activeSection)}
        viewMode={0}
      />
      <SectionHeading />
      <QuestionsGrid />
    </div>
  );
};

export default TestSidebar;
