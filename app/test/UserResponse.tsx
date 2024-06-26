import React from "react";
import { getDefaultOptions } from "../_formatters/getFunctions";
import {
  getActiveGroupCache,
  getActiveQuestion,
  getActiveQuestionCache,
} from "../_formatters/getActiveCache";
import { TestPaperQuestion } from "../_interface/testData";
import { UserCacheQuestion } from "../_interface/userCache";

import {
  DispatchContext,
  ResponseDataContext,
  StateContext,
  TestPaperContext,
} from "./page";

import NumeralValue from "./_userResponseTypes/NumeralValue";
import SingleCorrectChoices from "./_userResponseTypes/SingleCorrectChoices";
import MultipleCorrectChoices from "./_userResponseTypes/MultipleCorrectChoices";
import { masterConstraint } from "../_formatters/masterConstraint";
import useRenderingTrace from "./Diagnostic";

interface UserResponseInputProps {
  question: TestPaperQuestion;
  state: UserCacheQuestion;
}

const UserResponse = () => {
  const testPaper = React.useContext(TestPaperContext);
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const { responseData, setResponseData } =
    React.useContext(ResponseDataContext);

  let activeGroupCache = getActiveGroupCache(state);

  let activeQuestion = getActiveQuestion(testPaper, state);
  let activeQuestionCache = getActiveQuestionCache(state);

  useRenderingTrace("BottomBar", responseData);

  function userAnswerInput(type: number) {
    switch (type) {
      case 0:
        return (
          <SingleCorrectChoices
            question={activeQuestion}
            state={activeQuestionCache}
            languageIndex={state.currentLanguageIndex}
          />
        );
      case 1:
        return (
          <MultipleCorrectChoices
            question={activeQuestion}
            state={activeQuestionCache}
            languageIndex={state.currentLanguageIndex}
          />
        );
      case 2:
        return (
          <NumeralValue question={activeQuestion} state={activeQuestionCache} />
        );
      default:
        break;
    }
  }

  React.useEffect(() => {
    setResponseData(
      getDefaultOptions(activeQuestion.qDataType[0], activeQuestionCache.submit)
    );
  }, [
    activeQuestion.qDataType,
    activeQuestionCache.id,
    activeQuestionCache.submit,
    activeQuestionCache.lastAnswered,
    setResponseData,
  ]);

  return (
    <form
      className=" flex flex-col"
      id="userResponseForm"
      onChange={(d) => {
        let e = new FormData(d.currentTarget);
        setResponseData(
          e.getAll("user_answer").map((e) => {
            return e.toString();
          })
        );
      }}
      onSubmit={(d) => {
        d.preventDefault();
      }}
    >
      <fieldset disabled={!masterConstraint(state, testPaper).canSet}>
        {userAnswerInput(activeQuestion.qDataType[0])}
      </fieldset>
      {"Saved Answer: " + getActiveQuestionCache(state).submit}
      <br />
      {"Current Answer: " + responseData}
    </form>
  );
};

export default UserResponse;
