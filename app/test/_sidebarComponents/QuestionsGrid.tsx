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
    if (activeQuestion.constraints?.permissionOnAttempt !== undefined)
      dispatch({
        type: "update_question_permissions",
        payload: activeQuestion.constraints?.permissionOnAttempt,
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
              className={`h-12 w-12 ${e.permissions !== "none" ? "cursor-pointer" : "cursor-not-allowed"}`}
              key={i}
              disabled={e.permissions === "none"}
              onClick={() => {
                handleQuestionGridButtonSubmit(i, e);
              }}
            >
              <QuestionBtn
                status={e.status}
                count={i + 1}
                active={activeSection.qIndex === i}
                disabled={e.permissions === "none"}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionsGrid;
