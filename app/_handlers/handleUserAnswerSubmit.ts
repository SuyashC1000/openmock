import { getActiveQuestionCache } from "../_formatters/getFunctions";
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
    case 0:
      {
        if (userAnswer[0] === questionCache.submit) break;
        let payload = userAnswer.length === 0 ? null : +userAnswer[0];
        dispatch({ type: "update_question_useranswer", payload: payload });
      }
      break;

    case 1:
      {
        if (userAnswer.map((e) => +e) === questionCache.submit) break;
        let payload =
          userAnswer.length === 0 ? null : userAnswer.map((e) => +e);

        dispatch({ type: "update_question_useranswer", payload: payload });
      }

      break;

    case 2:
      {
        let payload = userAnswer.length === 0 ? null : +userAnswer;
        dispatch({ type: "update_question_useranswer", payload: payload });
      }
      break;

    default:
      break;
  }
}
