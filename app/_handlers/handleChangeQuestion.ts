import { masterConstraint } from "../_formatters/masterConstraint";
import { UPDATE_QUESTION_LASTANSWERED } from "../_formatters/userCacheReducer";
import { TestPaper } from "../_interface/testData";
import { DispatchFunc } from "../_interface/testProps";
import { UserCache } from "../_interface/userCache";

export function handleChangeQuestion(
  dispatch: DispatchFunc,
  state: UserCache,
  testPaper: TestPaper
) {
  if (masterConstraint(state, testPaper).canSet) {
    dispatch({
      type: UPDATE_QUESTION_LASTANSWERED,
      payload: Date.now(),
    });
  }
}
