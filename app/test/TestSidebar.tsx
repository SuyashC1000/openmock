"use client";

import { Text } from "@chakra-ui/react";

import React from "react";
import QuestionLegend from "../components/QuestionLegend";
import QuestionBtn from "../components/QuestionBtn";
import {
  UserCache,
  UserCacheGroup,
  UserCacheQuestion,
  UserCacheSection,
} from "../interface/userCache";
import { TestProps } from "../interface/testProps";
import {
  getActiveSectionCache,
  getSectionQuestionLegend,
} from "../formatters/getFunctions";

const TestSidebar = (props: TestProps) => {
  let activeSection: UserCacheSection = getActiveSectionCache(props.state);

  function SectionHeading() {
    return (
      <div className="h-auto px-2 py-1  bg-sky-700">
        <Text className="text-white font-semibold">
          {activeSection.sectionName}
        </Text>
      </div>
    );
  }

  function QuestionsGrid() {
    return (
      <div className="bg-cyan-100 flex flex-1 p-1 flex-col">
        <Text className="font-semibold text-sm">Choose a Question</Text>
        <div className="grid grid-flow-row grid-cols-5">
          {activeSection.questions.map((e, i) => {
            return (
              <span className="h-12 w-12" key={i}>
                <QuestionBtn status={e.status} count={i + 1} />
              </span>
            );
          })}
        </div>
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
