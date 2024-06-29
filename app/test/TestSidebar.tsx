"use client";

import { Text } from "@chakra-ui/react";

import QuestionLegend from "../_components/QuestionLegend";
import { getSectionQuestionLegend } from "../_formatters/getFunctions";
import QuestionsGrid from "./_sidebarComponents/QuestionsGrid";
import useActiveElements from "@/lib/useActiveElements";

const TestSidebar = () => {
  const { activeSectionCache } = useActiveElements();

  function SectionHeading() {
    return (
      <div className="h-auto px-2 py-1  bg-sky-700">
        <Text className="text-white font-semibold">
          {activeSectionCache.sectionName}
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
        legendCounts={getSectionQuestionLegend(activeSectionCache)}
        viewMode={0}
      />
      <SectionHeading />
      <QuestionsGrid />
    </div>
  );
};

export default TestSidebar;
