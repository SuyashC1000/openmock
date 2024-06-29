import { getUserResponse } from "../_formatters/getFunctions";
import {
  getActiveQuestion,
  getActiveSectionCache,
} from "../_formatters/getActiveCache";
import { TestPaper, TestPaperQuestion } from "../_interface/testData";
import { DispatchFunc, SetResponseDataFunc } from "../_interface/testProps";
import { UserCache, UserCacheSection } from "../_interface/userCache";
import {
  decrementQuestionIndex,
  incrementQuestionIndex,
} from "../_formatters/deviateQuestionIndex";
import {
  UPDATE_QUESTION_STATUS,
  UPDATE_QUESTION_USERANSWER,
} from "../_formatters/userCacheReducer";
import { SubmitQuestionFunc } from "@/lib/useSubmit";

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
  const newIndexList = incrementQuestionIndex(state);

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
    payload: { qIndex: activeSection.qIndex, newStatus: 1 },
  });
}

export async function moveToPrevQuestion(
  state: UserCache,
  submitQuestion: SubmitQuestionFunc
) {
  const newIndexList = decrementQuestionIndex(state);
  submitQuestion(newIndexList);
}
