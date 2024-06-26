import { Text } from "@chakra-ui/react";
import React from "react";
import QuestionBtn from "./QuestionBtn";

interface Props {
  legendCounts: number[];
  viewMode: number;
}

const QuestionLegend = (props: Props) => {
  const viewModeLayout = () => {
    switch (props.viewMode) {
      case 0:
        return "flex flex-col";

      default:
        break;
    }
  };

  const legendText = [
    "Not Visited",
    "Not Answered",
    "Answered",
    "Marked for Review",
    "Answered & Marked for Review (will also be evaluated)",
  ];
  const legendOrder = [2, 1, 0, 3, 4];

  return (
    <div className="bg-white flex-0 p-1">
      <div className="flex flex-col items-start gap-1">
        {legendOrder.map((e, i) => {
          return (
            <div key={i} className="h-9 flex flex-box justify-start gap-1">
              <span className="flex-0 max-w-10">
                <QuestionBtn count={props.legendCounts[e]} status={e} />
              </span>
              <Text className="text-xs flex-1 self-center">
                {legendText[e]}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionLegend;
