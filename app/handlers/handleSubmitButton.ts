import {
  getActiveQuestion,
  getActiveQuestionCache,
  getActiveSectionCache,
} from "../formatters/getFunctions";
import { TestPaper } from "../interface/testData";
import { DispatchFunc, SetResponseDataFunc } from "../interface/testProps";
import {
  UserCache,
  UserCacheQuestion,
  UserCacheSection,
} from "../interface/userCache";
import handleUserAnswerSubmit from "./handleUserAnswerSubmit";

export function handleSaveNext(
  state: UserCache,
  dispatch: DispatchFunc,
  testPaper: TestPaper,
  responseDataState: {
    responseData: any[];
    setResponseData: SetResponseDataFunc;
  }
) {
  handleUserAnswerSubmit(
    dispatch,
    state,
    getActiveQuestion(testPaper, state),
    responseDataState.responseData
  );
  const activeSection: UserCacheSection = getActiveSectionCache(state);

  const activeQuestionCache: UserCacheQuestion = getActiveQuestionCache(state);

  const isAnswered = activeQuestionCache.submit !== null;
  dispatch({
    type: "update_question_status",
    payload: { qIndex: activeSection.qIndex, newStatus: isAnswered ? 2 : 1 },
  });
  console.log(activeQuestionCache);
}

export function handleMarkext(state: UserCache, dispatch: DispatchFunc) {}
