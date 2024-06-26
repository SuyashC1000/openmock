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
  getActiveSectionCache,
} from "@/app/_formatters/getActiveCache";
import { getIsQuestionDisabled } from "@/app/_formatters/getFunctions";

const QuestionsGrid = () => {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const testPaper = React.useContext(TestPaperContext);

  let activeSection: UserCacheSection = getActiveSectionCache(state);
  let activeQuestion: TestPaperQuestion = getActiveQuestion(testPaper, state);

  function handleQuestionGridButtonSubmit(i: number, e: UserCacheQuestion) {
    dispatch({
      type: "update_question_lastanswered",
      payload: Date.now(),
    });
    dispatch({
      type: "update_question_status",
      payload: {
        qIndex: i,
        newStatus: e.status == 0 ? 1 : e.status,
      },
    });
    dispatch({
      type: "set_active_question",
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
