import {
  getActiveQuestion,
  getActiveQuestionCache,
  getActiveSectionCache,
  getUserResponse,
} from "../formatters/getFunctions";
import { TestPaper, TestPaperQuestion } from "../interface/testData";
import { DispatchFunc, SetResponseDataFunc } from "../interface/testProps";
import {
  UserCache,
  UserCacheQuestion,
  UserCacheSection,
} from "../interface/userCache";

export function handleSubmitButton(
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
  const activeSection: UserCacheSection = getActiveSectionCache(state);
  const activeQuestion: TestPaperQuestion = getActiveQuestion(testPaper, state);

  const userResponse = getUserResponse(
    state,
    activeQuestion.qDataType[0],
    responseDataState.responseData
  );
  if (userResponse !== undefined)
    dispatch({ type: "update_question_useranswer", payload: userResponse });

  let newStatus = activeQuestionCache.status;
  if (userResponse !== activeQuestionCache.submit) {
    if (userResponse === null) {
      newStatus = !mark ? 1 : 3;
    } else {
      newStatus = !mark ? 2 : 4;
    }
  }

  dispatch({
    type: "update_question_status",
    payload: { qIndex: activeSection.qIndex, newStatus: newStatus },
  });
}
