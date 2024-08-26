import { Text } from "@chakra-ui/react";
import React from "react";
import {
  TestDispatchContext,
  TestStateContext,
  TestPaperContext,
} from "./page";
import {
  SET_TEST_STATUS,
  UPDATE_GROUP_TIMESPENT,
  UPDATE_QUESTION_TIMESPENT,
} from "../../_functions/userCacheReducer";
import useActiveElements from "@/lib/useActiveElements";
import { groupConstraint } from "../../_functions/groupConstraint";
import { questionConstraint } from "../../_functions/questionConstraint";

const Timer = () => {
  const state = React.useContext(TestStateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(TestDispatchContext);

  const { activeQuestionCache, activeGroupCache, activeQuestion, activeGroup } =
    useActiveElements();

  const timeLeftState = React.useState<[number, number]>([
    testPaper.maxMetrics.time,
    0,
  ]);
  const timeLeft = timeLeftState[0] as [number, number];
  const setTimeLeft = timeLeftState[1] as (e: any) => {};

  function decrementCountdown(timeLeft: [number, number]) {
    let newSeconds, newMinutes;
    if (timeLeft[1] > 0 && timeLeft[0] >= 0) {
      newSeconds = timeLeft[1] - 1;
      newMinutes = timeLeft[0];
      return [newMinutes, newSeconds] as [number, number];
    } else if (timeLeft[1] === 0 && timeLeft[0] > 0) {
      newSeconds = 59;
      newMinutes = timeLeft[0] - 1;
      return [newMinutes, newSeconds] as [number, number];
    } else {
      dispatch({ type: SET_TEST_STATUS, payload: "finished" });
      return timeLeft;
    }
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (state.testStatus === "starting") {
        if (timeLeft[0] !== testPaper.maxMetrics.time) {
          setTimeLeft([testPaper.maxMetrics.time, 0]);
        }
      } else if (
        state.testStatus === "ongoing" ||
        state.testStatus === "submitting"
      ) {
        setTimeLeft(decrementCountdown(timeLeft));
        if (groupConstraint(state, testPaper).canTickTime) {
          dispatch({
            type: UPDATE_GROUP_TIMESPENT,
            payload: activeGroupCache.timeSpent + 1,
          });

          if (questionConstraint(state, testPaper).canTickTime) {
            dispatch({
              type: UPDATE_QUESTION_TIMESPENT,
              payload: activeQuestionCache.timeSpent + 1,
            });
          }
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
        {/* <span className="bg-red-300 p-1 rounded-lg font-mono ml-2">
          {activeQuestionCache.timeSpent + ":" + activeGroupCache.timeSpent}
        </span> */}
      </Text>
    </div>
  );
};
export default Timer;
