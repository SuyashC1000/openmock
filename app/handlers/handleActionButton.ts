import {
  getActiveGroupCache,
  getActiveQuestion,
  getActiveQuestionCache,
  getActiveSectionCache,
  getUserResponse,
} from "../formatters/getFunctions";
import { TestPaper, TestPaperQuestion } from "../interface/testData";
import { DispatchFunc, SetResponseDataFunc } from "../interface/testProps";
import {
  UserCache,
  UserCacheGroup,
  UserCacheQuestion,
  UserCacheSection,
} from "../interface/userCache";

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
    state,
    activeQuestion.qDataType[0],
    responseDataState.responseData
  );
  if (userResponse !== undefined)
    dispatch({ type: "update_question_useranswer", payload: userResponse });

  let newStatus = activeQuestionCache.status;

  if (userResponse === null) {
    newStatus = !mark ? 1 : 3;
  } else {
    newStatus = !mark ? 2 : 4;
  }

  dispatch({
    type: "update_question_status",
    payload: { qIndex: activeSectionCache.qIndex, newStatus: newStatus },
  });

  const activeAndTotal = {
    group: [state.activeGroupIndex, state.body.length],
    section: [
      activeGroupCache.activeSectionIndex,
      activeGroupCache.sections.length,
    ],
    question: [activeSectionCache.qIndex, activeSectionCache.questions.length],
  };

  moveToNextQuestion(activeAndTotal, state, dispatch);
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

function moveToNextQuestion(
  activeAndTotal: {
    group: number[];
    section: number[];
    question: number[];
  },
  state: UserCache,
  dispatch: DispatchFunc
) {
  if (activeAndTotal.question[0] < activeAndTotal.question[1] - 1) {
    dispatch({
      type: "set_active_question",
      payload: activeAndTotal.question[0] + 1,
    });
    if (
      getActiveSectionCache(state).questions[activeAndTotal.question[0] + 1]
        .status === 0
    )
      dispatch({
        type: "update_question_status",
        payload: { qIndex: activeAndTotal.question[0] + 1, newStatus: 1 },
      });
  } else if (activeAndTotal.section[0] < activeAndTotal.section[1] - 1) {
    dispatch({
      type: "set_active_section",
      payload: activeAndTotal.section[0] + 1,
    });
    dispatch({
      type: "set_active_question",
      payload: 0,
    });
    dispatch({
      type: "update_question_status",
      payload: { qIndex: 0, newStatus: 1 },
    });
  }
}

export function moveToPrevQuestion(state: UserCache, dispatch: DispatchFunc) {
  const activeQuestionCache: UserCacheQuestion = getActiveQuestionCache(state);
  const activeGroupCache: UserCacheGroup = getActiveGroupCache(state);
  const activeSectionCache: UserCacheSection = getActiveSectionCache(state);

  const activeAndTotal = {
    group: [state.activeGroupIndex, state.body.length],
    section: [
      activeGroupCache.activeSectionIndex,
      activeGroupCache.sections.length,
    ],
    question: [activeSectionCache.qIndex, activeSectionCache.questions.length],
  };

  if (activeAndTotal.question[0] > 0) {
    dispatch({
      type: "set_active_question",
      payload: activeAndTotal.question[0] - 1,
    });
    if (
      getActiveSectionCache(state).questions[activeAndTotal.question[0] - 1]
        .status === 0
    )
      dispatch({
        type: "update_question_status",
        payload: { qIndex: activeAndTotal.question[0] - 1, newStatus: 1 },
      });
  } else if (activeAndTotal.section[0] > 0) {
    const lastIndex =
      getActiveGroupCache(state).sections[activeAndTotal.section[0] - 1]
        .questions.length - 1;
    dispatch({
      type: "set_active_section",
      payload: activeAndTotal.section[0] - 1,
    });
    dispatch({
      type: "set_active_question",
      payload: lastIndex,
    });
  }
}
