import QuestionBtn from "@/app/_components/QuestionBtn";
import { TestPaperQuestion } from "@/app/_interface/testData";
import {
  UserCacheQuestion,
  UserCacheSection,
} from "@/app/_interface/userCache";
import { Text } from "@chakra-ui/react";
import React from "react";
import { DispatchContext, StateContext, TestPaperContext } from "../page";
import {
  getActiveQuestion,
  getActiveQuestionCache,
  getActiveSectionCache,
} from "@/app/_formatters/getActiveCache";
import { getIsQuestionDisabled } from "@/app/_formatters/getFunctions";
import useConfirm from "@/lib/useConfirm";
import {
  SET_ACTIVE_QUESTION,
  UPDATE_QUESTION_LASTANSWERED,
  UPDATE_QUESTION_STATUS,
} from "@/app/_formatters/userCacheReducer";

const QuestionsGrid = () => {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const testPaper = React.useContext(TestPaperContext);

  const { confirm } = useConfirm();

  let activeSection: UserCacheSection = getActiveSectionCache(state);
  let activeQuestionCache: UserCacheQuestion = getActiveQuestionCache(state);

  async function handleQuestionGridButtonSubmit(
    i: number,
    e: UserCacheQuestion
  ) {
    if (
      activeQuestionCache.permissions !== "all" &&
      activeQuestionCache.lastAnswered === null
    ) {
      const sample = await confirm(
        "Leave this question?",
        `You will no longer be able to ${activeQuestionCache.permissions == "view" ? "edit" : "revisit or edit"} \n
        your response in this question in the future upon navigating further.`
      );
      console.log(sample);
      if (!sample) return;
    }

    dispatch({
      type: UPDATE_QUESTION_LASTANSWERED,
      payload: Date.now(),
    });
    dispatch({
      type: UPDATE_QUESTION_STATUS,
      payload: {
        qIndex: i,
        newStatus: e.status == 0 ? 1 : e.status,
      },
    });
    dispatch({
      type: SET_ACTIVE_QUESTION,
      payload: i,
    });
  }
  return (
    <div className="bg-cyan-100 flex flex-1 p-1 flex-col">
      <Text className="font-semibold text-sm">Choose a Question</Text>
      <div className="grid grid-flow-row grid-cols-5">
        {activeSection.questions.map((e, i) => {
          return (
            <button
              className={`h-12 w-12 ${!getIsQuestionDisabled(e) ? "cursor-pointer" : "cursor-not-allowed"}`}
              key={i}
              // disabled={getIsQuestionDisabled(e)}
              onClick={() => {
                if (activeSection.qIndex !== i) {
                  handleQuestionGridButtonSubmit(i, e);
                }
              }}
            >
              <QuestionBtn
                status={e.status}
                count={i + 1}
                active={activeSection.qIndex === i}
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
