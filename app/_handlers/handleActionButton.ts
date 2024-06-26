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

export function handleSubmitQuestion(
  state: UserCache,
  dispatch: DispatchFunc,
  testPaper: TestPaper,
  responseDataState: {
    responseData: any[];
    setResponseData: SetResponseDataFunc;
  },
  mark: boolean
) {
  const activeQuestionCache: UserCacheQuestion = getActiveQuestionCache(state);
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

    if (userResponse !== undefined) {
      dispatch({ type: "update_question_useranswer", payload: userResponse });
    }

    dispatch({
      type: "update_question_status",
      payload: { qIndex: activeSectionCache.qIndex, newStatus: newStatus },
    });

    dispatch({
      type: "update_question_lastanswered",
      payload: Date.now(),
    });
  }

  const oldIndexList = getActiveIndex(state);
  const newIndexList = incrementQuestionIndex(state);
  console.log(oldIndexList, newIndexList);

  dispatch({
    type: "set_active_elements",
    payload: newIndexList,
  });

  const newActiveQuestion: UserCacheQuestion = getActiveCacheByIndex(
    state,
    newIndexList
  ) as UserCacheQuestion;

  console.log(newActiveQuestion);

  if (oldIndexList !== newIndexList) {
    dispatch({
      type: "update_question_status",
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

  dispatch({ type: "update_question_useranswer", payload: null });

  responseDataState.setResponseData([]);
  dispatch({
    type: "update_question_status",
    payload: { qIndex: activeSection.qIndex, newStatus: 1 },
  });
}

export function moveToPrevQuestion(
  state: UserCache,
  dispatch: DispatchFunc,
  testPaper: TestPaper
) {
  const activeQuestionCache: UserCacheQuestion = getActiveQuestionCache(state);
  const activeGroupCache: UserCacheGroup = getActiveGroupCache(state);
  const activeSectionCache: UserCacheSection = getActiveSectionCache(state);
  const activeQuestion: TestPaperQuestion = getActiveQuestion(testPaper, state);

  if (masterConstraint(state, testPaper).canSet) {
    dispatch({
      type: "update_question_lastanswered",
      payload: Date.now(),
    });
  }

  if (activeQuestion.constraints?.permissionOnAttempt !== undefined) {
    dispatch({
      type: "update_question_permissions",
      payload: activeQuestion.constraints?.permissionOnAttempt,
    });
  }

  const oldIndexList = getActiveIndex(state);
  const newIndexList = decrementQuestionIndex(state);
  dispatch({
    type: "set_active_elements",
    payload: newIndexList,
  });

  const newActiveQuestion: UserCacheQuestion = getActiveCacheByIndex(
    state,
    newIndexList
  ) as UserCacheQuestion;

  console.log(newActiveQuestion);

  if (oldIndexList !== newIndexList) {
    dispatch({
      type: "update_question_status",
      payload: {
        qIndex: newIndexList[2],
        newStatus:
          newActiveQuestion.status === 0 ? 1 : newActiveQuestion.status,
      },
    });
  }
}
