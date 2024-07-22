import { questionConstraint } from "@/app/_formatters/questionConstraint";
import {
  SET_ACTIVE_ELEMENTS,
  SET_ACTIVE_GROUP,
  SET_TEST_STATUS,
  UPDATE_GROUP_STATUS,
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
import { UserCacheGroup, UserCacheQuestion } from "@/app/_interface/userCache";
import { groupConstraint } from "@/app/_formatters/groupConstraint";
import { testResponseGenerator } from "@/app/_formatters/testResponseGenerator";
import { db } from "@/db/db";
import { setActiveTestResponse } from "@/db/dbFunctions";

export interface SubmitQuestionFunc {
  (
    nextIndex?: number[],
    submitData?: {
      response: number | number[] | null;
      mark: boolean;
    },
    confirmFromUser?: boolean
  ): void;
}

function useSubmit() {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(DispatchContext);

  const { activeQuestionCache, activeSectionCache } = useActiveElements();
  const { confirm } = useConfirm();

  let newIndex = getActiveIndex(state);

  const submitQuestion: SubmitQuestionFunc = async (
    nextIndex?,
    submitData?,
    confirmFromUser = true
  ) => {
    if (
      activeQuestionCache.permissions !== "all" &&
      questionConstraint(state, testPaper).canSet &&
      groupConstraint(state, testPaper).canAccess &&
      confirmFromUser
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

    if (questionConstraint(state, testPaper).canSet) {
      dispatch({
        type: UPDATE_QUESTION_LASTANSWERED,
        payload: Date.now(),
      });
    }

    if (nextIndex !== undefined) {
      switch (nextIndex.length) {
        case 1:
          dispatch({ type: SET_ACTIVE_GROUP, payload: nextIndex[0] });
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
          newIndex = nextIndex as [number, number, number];
        default:
          break;
      }

      if (newIndex.toString() === currentIndex.toString()) return;

      const newActiveQuestion = getActiveCacheByIndex(
        state,
        newIndex
      ) as UserCacheQuestion;
      const newQuestionStatus =
        newActiveQuestion.status === 0 ? 1 : newActiveQuestion.status;

      dispatch({ type: SET_ACTIVE_ELEMENTS, payload: newIndex });
      dispatch({
        type: UPDATE_QUESTION_STATUS,
        payload: { qIndex: newIndex[2], newStatus: newQuestionStatus },
      });
    }
  };

  function submitGroup(groupIndex: number, official: boolean = false) {
    if (official) {
      dispatch({ type: UPDATE_GROUP_STATUS, payload: "submitted" });
      submitQuestion([groupIndex], undefined, false);
      dispatch({ type: UPDATE_GROUP_STATUS, payload: "ongoing" });
      dispatch({ type: SET_TEST_STATUS, payload: "ongoing" });
    } else {
      submitQuestion([groupIndex]);
    }

    const newActiveQuestion = getActiveCacheByIndex(
      state,
      newIndex
    ) as UserCacheQuestion;
    const newActiveGroup = getActiveCacheByIndex(state, [
      newIndex[0],
    ]) as UserCacheGroup;
  }

  async function submitTest() {
    dispatch({
      type: SET_TEST_STATUS,
      payload: "finished",
    });

    const testResponse = testResponseGenerator(state, Date.now());

    console.log(testResponse);

    await db.activeTestPaper.clear();
    await db.testResponses.add(testResponse);

    setActiveTestResponse(testResponse);
  }

  return { submitQuestion, submitGroup, submitTest };
}

export default useSubmit;
