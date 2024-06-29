import { masterConstraint } from "@/app/_formatters/masterConstraint";
import {
  SET_ACTIVE_ELEMENTS,
  SET_ACTIVE_GROUP,
  UPDATE_QUESTION_LASTANSWERED,
  UPDATE_QUESTION_STATUS,
  UPDATE_QUESTION_USERANSWER,
} from "@/app/_formatters/userCacheReducer";
import {
  DispatchContext,
  StateContext,
  TestPaperContext,
} from "@/app/test/page";
import React from "react";
import useActiveElements from "./useActiveElements";
import useConfirm from "./useConfirm";
import {
  getActiveCacheByIndex,
  getActiveIndex,
} from "@/app/_formatters/getActiveCacheAdvanced";

export interface SubmitQuestionFunc {
  (
    nextIndex?: number[],
    submitData?: {
      response: number | number[] | null;
      mark: boolean;
    }
  ): void;
}

function useSubmit() {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(DispatchContext);

  const { activeQuestionCache, activeSectionCache } = useActiveElements();
  const { confirm } = useConfirm();

  const submitQuestion: SubmitQuestionFunc = async (
    nextIndex?,
    submitData?
  ) => {
    console.log("I'm running!");

    if (
      activeQuestionCache.permissions !== "all" &&
      activeQuestionCache.lastAnswered === null
    ) {
      const sample = await confirm(
        "Leave this question?",
        `You will no longer be able to ${activeQuestionCache.permissions == "view" ? "edit" : "revisit or edit"} \n
        your response in this question in the future upon navigating further.`
      );
      if (!sample) return;
    }

    const currentIndex = getActiveIndex(state);

    if (submitData !== undefined) {
      let newStatus = activeQuestionCache.status;
      if (submitData.response === null) {
        newStatus = !submitData.mark ? 1 : 3;
      } else {
        newStatus = !submitData.mark ? 2 : 4;
      }

      dispatch({
        type: UPDATE_QUESTION_USERANSWER,
        payload: submitData.response,
      });
      dispatch({
        type: UPDATE_QUESTION_STATUS,
        payload: { qIndex: activeSectionCache.qIndex, newStatus: newStatus },
      });
    }

    if (masterConstraint(state, testPaper).canSet) {
      dispatch({
        type: UPDATE_QUESTION_LASTANSWERED,
        payload: Date.now(),
      });
    }

    if (nextIndex !== undefined) {
      let newIndex = [0, 0, 0];

      switch (nextIndex.length) {
        case 1:
          // dispatch({ type: SET_ACTIVE_GROUP, payload: nextIndex[0] });
          const sectionIndex = state.body[nextIndex[0]].activeSectionIndex;
          const questionIndex1 =
            state.body[nextIndex[0]].sections[sectionIndex].qIndex;
          newIndex = [nextIndex[0], sectionIndex, questionIndex1];
          break;

        case 2:
          const questionIndex2 =
            state.body[nextIndex[0]].sections[nextIndex[1]].qIndex;
          newIndex = [nextIndex[0], nextIndex[1], questionIndex2];
          break;

        case 3:
          newIndex = nextIndex;
        default:
          break;
      }

      if (newIndex.toString() === currentIndex.toString()) return;

      const newActiveQuestion = getActiveCacheByIndex(state, newIndex);
      const newQuestionStatus =
        newActiveQuestion.status === 0 ? 1 : newActiveQuestion.status;

      dispatch({ type: SET_ACTIVE_ELEMENTS, payload: newIndex });
      dispatch({
        type: UPDATE_QUESTION_STATUS,
        payload: { qIndex: newIndex[2], newStatus: newQuestionStatus },
      });
    }
  };

  return { submitQuestion };
}

export default useSubmit;
