import { Text } from "@chakra-ui/react";
import React from "react";
import {
  DispatchContext,
  QuestionTimeContext,
  StateContext,
  TestPaperContext,
} from "./page";
import {
  SET_TEST_STATUS,
  UPDATE_GROUP_TIMESPENT,
  UPDATE_QUESTION_TIMESPENT,
} from "../_formatters/userCacheReducer";
import useActiveElements from "@/lib/useActiveElements";
import { groupConstraint } from "../_formatters/groupConstraint";
import { questionConstraint } from "../_formatters/questionConstraint";

const MIN_IN_SEC = 60;

const Timer = () => {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(DispatchContext);
  const questionTimeState = React.useContext(QuestionTimeContext);
  const questionTime = questionTimeState[0] as [number, number] | null;
  const setQuestionTime = questionTimeState[1] as (e: [number, number]) => void;

  const { activeQuestionCache, activeGroupCache, activeQuestion, activeGroup } =
    useActiveElements();

  const MINUTES_IN_MILLISECONDS = 60 * 1000;

  // const timeLeftState = React.useContext(TimeLeftContext);
  const timeLeftState = React.useState([testPaper.maxTime, 0]);
  const timeLeft = timeLeftState[0] as number[];
  const setTimeLeft = timeLeftState[1] as (e: any) => {};

  function decrementCountdown(timeLeft: number[]) {
    let newSeconds, newMinutes;
    if (timeLeft[1] > 0 && timeLeft[0] >= 0) {
      newSeconds = timeLeft[1] - 1;
      newMinutes = timeLeft[0];
      return [newMinutes, newSeconds] as number[];
    } else if (timeLeft[1] === 0 && timeLeft[0] > 0) {
      newSeconds = 59;
      newMinutes = timeLeft[0] - 1;
      return [newMinutes, newSeconds] as number[];
    } else {
      dispatch({ type: SET_TEST_STATUS, payload: "finished" });
      return timeLeft;
    }
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (state.testStatus === "ongoing" || state.testStatus === "submitting") {
        setTimeLeft(decrementCountdown(timeLeft));
        if (
          groupConstraint(state, testPaper).canAccess &&
          questionConstraint(state, testPaper).canSet
        ) {
          setQuestionTime([questionTime![0] + 1, questionTime![1] + 1]);
        }

        if (
          activeQuestion.constraints?.maximumTimeAllowed !== undefined &&
          questionTime![0] >=
            activeQuestion.constraints?.maximumTimeAllowed * MIN_IN_SEC &&
          activeQuestionCache.timeSpent <
            activeQuestion.constraints?.maximumTimeAllowed * MIN_IN_SEC
        ) {
          dispatch({
            type: UPDATE_QUESTION_TIMESPENT,
            payload: questionTime![0],
          });
        }
        if (
          activeGroup.constraints?.maximumTimeAllowed !== undefined &&
          questionTime![1] >=
            activeGroup.constraints?.maximumTimeAllowed * MIN_IN_SEC &&
          activeGroupCache.timeSpent <
            activeGroup.constraints?.maximumTimeAllowed * MIN_IN_SEC
        ) {
          dispatch({
            type: UPDATE_GROUP_TIMESPENT,
            payload: questionTime![1],
          });
        }
        if (
          activeGroup.constraints?.minimumTimeAllowed !== undefined &&
          questionTime![1] >=
            activeGroup.constraints?.minimumTimeAllowed * MIN_IN_SEC &&
          activeGroupCache.timeSpent <
            activeGroup.constraints?.minimumTimeAllowed * MIN_IN_SEC
        ) {
          dispatch({
            type: UPDATE_GROUP_TIMESPENT,
            payload: questionTime![1],
          });
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      <Text className="font-semibold">
        Time Left:{" "}
        <span className="bg-neutral-300 p-1 rounded-lg font-mono">
          {timeLeft[0]}:{(timeLeft[1] < 10 ? "0" : "") + timeLeft[1]}
        </span>
        <span className="bg-red-300 p-1 rounded-lg font-mono ml-2">
          {questionTime?.join(":")}
        </span>
      </Text>
    </div>
  );
};
export default Timer;
