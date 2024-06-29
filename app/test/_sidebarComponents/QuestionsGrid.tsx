import QuestionBtn from "@/app/_components/QuestionBtn";
import { Text } from "@chakra-ui/react";
import React from "react";
import { StateContext } from "../page";
import { getIsQuestionDisabled } from "@/app/_formatters/getFunctions";
import useSubmit from "@/lib/useSubmit";
import { getActiveIndex } from "@/app/_formatters/getActiveCacheAdvanced";
import useActiveElements from "@/lib/useActiveElements";

const QuestionsGrid = () => {
  const state = React.useContext(StateContext);

  const currentIndex = getActiveIndex(state);
  const { activeSectionCache } = useActiveElements();
  const { submitQuestion } = useSubmit();

  return (
    <div className="bg-cyan-100 flex flex-1 p-1 flex-col">
      <Text className="font-semibold text-sm">Choose a Question</Text>
      <div className="grid grid-flow-row grid-cols-5">
        {activeSectionCache.questions.map((e, i) => {
          return (
            <button
              className={`h-12 w-12 ${!getIsQuestionDisabled(e) ? "cursor-pointer" : "cursor-not-allowed"}`}
              key={i}
              disabled={getIsQuestionDisabled(e)}
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
                disabled={getIsQuestionDisabled(e)}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionsGrid;
