import { Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
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
import useSubmit from "@/lib/useSubmit";

const Timer = () => {
  const state = React.useContext(TestStateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(TestDispatchContext);

  const { activeQuestionCache, activeGroupCache, activeQuestion, activeGroup } =
    useActiveElements();

  const initialTimeLeftState = testPaper.maxMetrics.time * 60;
  const [timeLeft, setTimeLeft] = React.useState<number>(initialTimeLeftState);
  const timeLeftRef = useRef(initialTimeLeftState);

  const initlalTestStatusState = state.testStatus;
  const [testStatus, setTestStatus] = React.useState<string>(
    initlalTestStatusState
  );
  const testStatusRef = useRef(initlalTestStatusState);

  const { submitTest } = useSubmit();

  console.log(initialTimeLeftState);

  // function decrementCountdown(timeLeft: [number, number]) {
  //   let newSeconds, newMinutes;
  //   if (timeLeft[1] > 0 && timeLeft[0] >= 0) {
  //     newSeconds = timeLeft[1] - 1;
  //     newMinutes = timeLeft[0];
  //     return [newMinutes, newSeconds] as [number, number];
  //   } else if (timeLeft[1] === 0 && timeLeft[0] > 0) {
  //     newSeconds = 59;
  //     newMinutes = timeLeft[0] - 1;
  //     return [newMinutes, newSeconds] as [number, number];
  //   } else {
  //     dispatch({ type: SET_TEST_STATUS, payload: "finished" });
  //     return timeLeft;
  //   }
  // }

  React.useEffect(() => {
    timeLeftRef.current = timeLeft;
    testStatusRef.current = state.testStatus;
  });

  React.useEffect(() => {
    // setTimeLeft(testPaper.maxMetrics.time * 60);
    const timer = setInterval(() => {
      setTimeLeft(() => {
        if (
          testStatusRef.current === "ongoing" ||
          testStatusRef.current === "submitting"
        ) {
          if (timeLeftRef.current > 0) {
            return timeLeftRef.current - 1;
          } else {
            dispatch({ type: SET_TEST_STATUS, payload: "finished" });
            submitTest();
          }
        }
        return timeLeftRef.current;
      });
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
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Text className="font-semibold">
        Time Left:{" "}
        <span className="bg-neutral-300 p-1 rounded-lg font-mono">
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60 < 10 ? "0" : "") + (timeLeft % 60)}
        </span>
        {/* <span className="bg-red-300 p-1 rounded-lg font-mono ml-2">
        </span> */}
      </Text>
    </div>
  );
};
export default Timer;
