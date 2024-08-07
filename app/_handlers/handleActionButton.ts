import { getUserResponse } from "../_functions/getFunctions";
import {
  getActiveQuestion,
  getActiveSectionCache,
} from "../_functions/getActiveCache";
import { TestPaper, TestPaperQuestion } from "../_interface/testData";
import { DispatchFunc, SetResponseDataFunc } from "../_interface/testProps";
import { UserCache, UserCacheSection } from "../_interface/userCache";
import {
  decrementQuestionIndex,
  incrementQuestionIndex,
} from "../_functions/deviateQuestionIndex";
import {
  UPDATE_QUESTION_STATUS,
  UPDATE_QUESTION_USERANSWER,
} from "../_functions/userCacheReducer";
import { SubmitQuestionFunc } from "@/lib/useSubmit";
import { QuestionStatus } from "@/lib/enums";

export async function handleSubmitQuestion(
  state: UserCache,
  testPaper: TestPaper,
  responseDataState: {
    responseData: any[];
    setResponseData: SetResponseDataFunc;
  },
  submitQuestion: SubmitQuestionFunc,
  mark: boolean
) {
  const activeQuestion: TestPaperQuestion = getActiveQuestion(testPaper, state);

  const userResponse = getUserResponse(
    activeQuestion.qDataType[0],
    responseDataState.responseData
  );
  const newIndexList = incrementQuestionIndex(state, testPaper);

  submitQuestion(newIndexList, {
    response: userResponse,
    mark: mark,
  });
}

export function handleClearResponse(
  state: UserCache,
  dispatch: DispatchFunc,
  responseDataState: {
    responseData: any[];
    setResponseData: SetResponseDataFunc;
  }
) {
  const activeSection: UserCacheSection = getActiveSectionCache(state);

  dispatch({ type: UPDATE_QUESTION_USERANSWER, payload: null });

  responseDataState.setResponseData([]);
  dispatch({
    type: UPDATE_QUESTION_STATUS,
    payload: {
      qIndex: activeSection.qIndex,
      newStatus: QuestionStatus.NotAnswered,
    },
  });
}

export async function moveToPrevQuestion(
  state: UserCache,
  testPaper: TestPaper,

  submitQuestion: SubmitQuestionFunc
) {
  const newIndexList = decrementQuestionIndex(state, testPaper);
  submitQuestion(newIndexList);
}
