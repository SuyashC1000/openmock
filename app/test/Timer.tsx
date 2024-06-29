import { Text } from "@chakra-ui/react";
import React from "react";
import { DispatchContext, StateContext, TestPaperContext } from "./page";
import { SET_TEST_STATUS } from "../_formatters/userCacheReducer";

const Timer = () => {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(DispatchContext);

  const MINUTES_IN_MILLISECONDS = 60 * 1000;

  const getTimeLeft = () => {
    if (state.testStatus === "finished") return [0, 0];

    const timeDiff =
      state.testLoginTime - state.testStartTime < 0
        ? 0
        : state.testLoginTime - state.testStartTime;
    const totalTimeLeft =
      testPaper.maxTime * MINUTES_IN_MILLISECONDS - timeDiff;
    const totalSeconds = Math.floor(totalTimeLeft / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    return [totalMinutes, totalSeconds % 60];
  };

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
      } else if (state.testStatus === "finished") {
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
      </Text>
    </div>
  );
};
export default Timer;
