"use client";

import { Text } from "@chakra-ui/react";

import React from "react";
import QuestionLegend from "../components/QuestionLegend";
import QuestionBtn from "../components/QuestionBtn";
import { random } from "lodash";
import { randomInt } from "crypto";

const TestSidebar = () => {
  function SectionHeading() {
    return (
      <div className="h-auto px-2 py-1  bg-sky-700">
        <Text className="text-white font-semibold">Hello There</Text>
      </div>
    );
  }

  function QuestionsGrid() {
    return (
      <div className="bg-cyan-100 flex flex-1 p-1 flex-col">
        <Text className="font-semibold text-sm">Choose a Question</Text>
        <div className="grid grid-flow-row grid-cols-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => {
            return (
              <>
                <span className="h-12 w-12">
                  <QuestionBtn status={2} count={e} />
                </span>
              </>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-slate-400 flex flex-box flex-col outline outline-2 outline-neutral-400">
      <QuestionLegend legendCounts={[1, 2, 3, 4, 5]} viewMode={0} />
      <SectionHeading />
      <QuestionsGrid />
    </div>
  );
};

export default TestSidebar;
