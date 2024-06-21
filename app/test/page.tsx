"use client";

import { Button, ButtonGroup, Icon, Text } from "@chakra-ui/react";
import React from "react";
import TestHeader from "./TestHeader";
import TestSidebar from "./TestSidebar";
import QuestionBtn from "../components/QuestionBtn";
import TestMainWindow from "./TestMainWindow";
import TestBottombar from "./TestBottombar";
import testData from "../../public/data/testData.json";
import userCacheGenerator from "../formatters/userCacheGenerator";
import userCacheReducer from "../formatters/userCacheReducer";
import { TestProps } from "../interface/testProps";

const testCache = testData;
const TestPage = () => {
  const [state, dispatch] = React.useReducer(
    userCacheReducer,
    userCacheGenerator(testData, "Hello")
  );

  function reducer(state: Object, action: Object) {
    console.log(state);
    console.log(action);
    return state;
  }

  const essentials: TestProps = {
    testPaper: testCache,
    dispatch: dispatch,
    state: state,
  };

  return (
    <div className="bg-slate-800 flex flex-box flex-col h-screen max-h-screen select-none">
      <TestHeader {...essentials} />
      <div className="h-auto flex flex-1 w-screen overflow-hidden">
        <TestMainWindow
          testPaper={testData}
          state={state}
          dispatch={dispatch}
        />
        <TestSidebar {...essentials} />
      </div>
      <TestBottombar {...essentials} />
    </div>
  );
};

export default TestPage;
