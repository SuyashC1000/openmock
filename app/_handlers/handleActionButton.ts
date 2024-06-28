import { getUserResponse } from "../_formatters/getFunctions";
import {
  getActiveGroupCache,
  getActiveQuestion,
  getActiveQuestionCache,
  getActiveSectionCache,
} from "../_formatters/getActiveCache";
import { masterConstraint } from "../_formatters/masterConstraint";
import { TestPaper, TestPaperQuestion } from "../_interface/testData";
import { DispatchFunc, SetResponseDataFunc } from "../_interface/testProps";
import {
  UserCache,
  UserCacheGroup,
  UserCacheQuestion,
  UserCacheSection,
} from "../_interface/userCache";
import {
  decrementQuestionIndex,
  incrementQuestionIndex,
} from "../_formatters/deviateQuestionIndex";
import {
  getActiveCacheByIndex,
  getActiveIndex,
} from "../_formatters/getActiveCacheAdvanced";
import useConfirm from "@/lib/useConfirm";
import {
  SET_ACTIVE_ELEMENTS,
  UPDATE_QUESTION_LASTANSWERED,
  UPDATE_QUESTION_PERMISSIONS,
  UPDATE_QUESTION_STATUS,
  UPDATE_QUESTION_USERANSWER,
} from "../_formatters/userCacheReducer";

export async function handleSubmitQuestion(
  state: UserCache,
  dispatch: DispatchFunc,
  testPaper: TestPaper,
  responseDataState: {
    responseData: any[];
    setResponseData: SetResponseDataFunc;
  },
  confirm: (title?: string, message?: string) => Promise<unknown>,
  mark: boolean
) {
  const activeQuestionCache: UserCacheQuestion = getActiveQuestionCache(state);

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

  const activeGroupCache: UserCacheGroup = getActiveGroupCache(state);
  const activeSectionCache: UserCacheSection = getActiveSectionCache(state);
  const activeQuestion: TestPaperQuestion = getActiveQuestion(testPaper, state);

  const userResponse = getUserResponse(
    activeQuestion.qDataType[0],
    responseDataState.responseData
  );
  if (masterConstraint(state, testPaper).canSet) {
    let newStatus = activeQuestionCache.status;

    if (userResponse === null) {
      newStatus = !mark ? 1 : 3;
    } else {
      newStatus = !mark ? 2 : 4;
    }
    console.log(newStatus);

    if (userResponse !== undefined) {
      dispatch({ type: UPDATE_QUESTION_USERANSWER, payload: userResponse });
    }

    dispatch({
      type: UPDATE_QUESTION_STATUS,
      payload: { qIndex: activeSectionCache.qIndex, newStatus: newStatus },
    });

    dispatch({
      type: UPDATE_QUESTION_LASTANSWERED,
      payload: Date.now(),
    });
  }

  const oldIndexList = getActiveIndex(state);
  const newIndexList = incrementQuestionIndex(state);

  dispatch({
    type: SET_ACTIVE_ELEMENTS,
    payload: newIndexList,
  });

  const newActiveQuestion: UserCacheQuestion = getActiveCacheByIndex(
    state,
    newIndexList
  ) as UserCacheQuestion;

  if (oldIndexList.toString() !== newIndexList.toLocaleString()) {
    dispatch({
      type: UPDATE_QUESTION_STATUS,
      payload: {
        qIndex: newIndexList[2],
        newStatus:
          newActiveQuestion.status === 0 ? 1 : newActiveQuestion.status,
      },
    });
  }
}

export function handleClearResponse(
  state: UserCache,
  dispatch: DispatchFunc,
  responseDataState: {
    responseData: any[];
    setResponseData: SetResponseDataFunc;
  }
) {
  const activeQuestionCache: UserCacheQuestion = getActiveQuestionCache(state);
  const activeSection: UserCacheSection = getActiveSectionCache(state);

  dispatch({ type: UPDATE_QUESTION_USERANSWER, payload: null });

  responseDataState.setResponseData([]);
  dispatch({
    type: UPDATE_QUESTION_STATUS,
    payload: { qIndex: activeSection.qIndex, newStatus: 1 },
  });
}

export async function moveToPrevQuestion(
  state: UserCache,
  dispatch: DispatchFunc,
  testPaper: TestPaper,
  confirm: (title?: string, message?: string) => Promise<unknown>
) {
  const activeQuestionCache: UserCacheQuestion = getActiveQuestionCache(state);
  const activeGroupCache: UserCacheGroup = getActiveGroupCache(state);
  const activeSectionCache: UserCacheSection = getActiveSectionCache(state);
  const activeQuestion: TestPaperQuestion = getActiveQuestion(testPaper, state);

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

  if (masterConstraint(state, testPaper).canSet) {
    dispatch({
      type: UPDATE_QUESTION_LASTANSWERED,
      payload: Date.now(),
    });
  }

  // if (activeQuestion.constraints?.permissionOnAttempt !== undefined) {
  //   dispatch({
  //     type: UPDATE_QUESTION_PERMISSIONS,
  //     payload: activeQuestion.constraints?.permissionOnAttempt,
  //   });
  // }

  const oldIndexList = getActiveIndex(state);
  const newIndexList = decrementQuestionIndex(state);
  dispatch({
    type: SET_ACTIVE_ELEMENTS,
    payload: newIndexList,
  });

  const newActiveQuestion: UserCacheQuestion = getActiveCacheByIndex(
    state,
    newIndexList
  ) as UserCacheQuestion;

  console.log(newActiveQuestion);

  if (oldIndexList.toString() !== newIndexList.toString()) {
    dispatch({
      type: UPDATE_QUESTION_STATUS,
      payload: {
        qIndex: newIndexList[2],
        newStatus:
          newActiveQuestion.status === 0 ? 1 : newActiveQuestion.status,
      },
    });
  }
}
