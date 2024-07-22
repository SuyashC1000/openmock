import QuestionBtn from "@/app/_components/QuestionBtn";
import { Text } from "@chakra-ui/react";
import React from "react";
import { StateContext, TestPaperContext } from "../page";
import useSubmit from "@/lib/useSubmit";
import { getActiveIndex } from "@/app/_functions/getActiveCacheAdvanced";
import useActiveElements from "@/lib/useActiveElements";
import { questionConstraint } from "@/app/_functions/questionConstraint";

const QuestionsGrid = () => {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);

  const currentIndex = getActiveIndex(state);
  const { activeSectionCache, activeSection } = useActiveElements();
  const { submitQuestion } = useSubmit();

  return (
    <div
      className="bg-cyan-100 flex flex-1 px-1 flex-col overflow-y-auto"
      style={{ scrollbarWidth: "thin" }}
    >
      <Text
        className="font-semibold text-sm sticky top-0 py-1 bg-cyan-100"
        zIndex={2}
      >
        Choose a Question
      </Text>
      <div className="grid grid-flow-row grid-cols-5">
        {activeSectionCache.questions.map((e, i) => {
          const isDisabled = !questionConstraint(state, testPaper, [
            currentIndex[0],
            currentIndex[1],
            i,
          ]).canView;
          return (
            <button
              className={`h-12 w-12 ${!isDisabled ? "cursor-pointer" : "cursor-not-allowed"}`}
              key={i}
              disabled={isDisabled}
              onClick={() => {
                if (activeSectionCache.qIndex !== i) {
                  submitQuestion([currentIndex[0], currentIndex[1], i]);
                }
              }}
            >
              <QuestionBtn
                status={e.status}
                count={i + 1}
                active={activeSectionCache.qIndex === i}
                disabled={isDisabled}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionsGrid;
