import React from "react";
import {
  getActiveQuestion,
  getActiveQuestionCache,
  getDefaultOptions,
} from "../_formatters/getFunctions";
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

  let activeQuestion = getActiveQuestion(testPaper, state);
  let activeQuestionCache = getActiveQuestionCache(state);

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
    setResponseData,
  ]);

  return (
    <form
      className="m-2 p-2 flex flex-col"
      id="userResponseForm"
      onChange={(d) => {
        let e = new FormData(d.currentTarget);
        setResponseData(e.getAll("user_answer"));
      }}
      onSubmit={(d) => {
        d.preventDefault();
      }}
    >
      {userAnswerInput(activeQuestion.qDataType[0])}
      {"Saved Answer: " + getActiveQuestionCache(state).submit}
      <br />
      {"Current Answer: " + responseData}
    </form>
  );
};

export default UserResponse;
