import { Text } from "@chakra-ui/react";
import React from "react";
import QuestionLegend from "../components/QuestionLegend";

const TestSidebar = () => {
  function SectionHeading() {
    return (
      <div className="h-auto px-2 py-1  bg-sky-700">
        <Text className="text-white font-semibold">Hello There</Text>
      </div>
    );
  }

  return (
    <div className="w-64 bg-slate-400 flex-0 flex-box flex-col">
      <QuestionLegend legendCounts={[1, 2, 3, 4, 5]} viewMode={0} />
      <SectionHeading />
    </div>
  );
};

export default TestSidebar;
