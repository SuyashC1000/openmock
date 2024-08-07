import { QDataTypes } from "@/lib/enums";
import { getActiveQuestionCache } from "../_functions/getActiveCache";
import { UPDATE_QUESTION_USERANSWER } from "../_functions/userCacheReducer";
import { TestPaperQuestion } from "../_interface/testData";
import { DispatchFunc } from "../_interface/testProps";
import { UserCache, UserCacheQuestion } from "../_interface/userCache";
import { StateContext } from "../test/page";

export default function handleUserAnswerSubmit(
  dispatch: DispatchFunc,
  state: UserCache,
  question: TestPaperQuestion,
  responseData: any[]
) {
  const userAnswer = responseData;
  const questionCache = getActiveQuestionCache(state);

  switch (question.qDataType[0]) {
    case QDataTypes.SingleCorrectOption:
      {
        if (userAnswer[0] === questionCache.submit) break;
        let payload = userAnswer.length === 0 ? null : +userAnswer[0];
        dispatch({ type: UPDATE_QUESTION_USERANSWER, payload: payload });
      }
      break;

    case QDataTypes.MultipleCorrectOptions:
      {
        if (userAnswer.map((e) => +e) === questionCache.submit) break;
        let payload =
          userAnswer.length === 0 ? null : userAnswer.map((e) => +e);

        dispatch({ type: UPDATE_QUESTION_USERANSWER, payload: payload });
      }

      break;

    case QDataTypes.NumericalValue:
      {
        let payload = userAnswer.length === 0 ? null : +userAnswer;
        dispatch({ type: UPDATE_QUESTION_USERANSWER, payload: payload });
      }
      break;

    default:
      break;
  }
}
