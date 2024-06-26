"use client";

import { Button, ButtonGroup, Icon, Text } from "@chakra-ui/react";
import React from "react";
import TestHeader from "./TestHeader";
import TestSidebar from "./TestSidebar";
import QuestionBtn from "../_components/QuestionBtn";
import TestMainWindow from "./TestMainWindow";
import TestBottombar from "./TestBottombar";
import testData from "../../public/data/testData.json";
import userCacheGenerator from "../_formatters/userCacheGenerator";
import userCacheReducer, { Action } from "../_formatters/userCacheReducer";
import { TestProps } from "../_interface/testProps";
import { emptyTestPaper, emptyUserCache } from "./empty";
import { PreTestModal } from "./_modals/PreTestModal";
import SubmitTestModal from "./_modals/SubmitTestModal";
import MultiProvider from "../_components/MultiProvider";
import useRenderingTrace from "./Diagnostic";

interface DispatchFunction {
  (action: Action): void;
}

function example(action: Action) {}

export const StateContext = React.createContext(emptyUserCache);
export const DispatchContext = React.createContext(function example(
  action: Action
) {});
export const TestPaperContext = React.createContext(emptyTestPaper);
export const ResponseDataContext = React.createContext({
  responseData: [""],
  setResponseData: (value: string[]) => {
    value;
  },
});
export const TimeLeftContext = React.createContext([
  [0, 0],
  (e: any) => {
    e;
  },
]);

const testCache = testData;
const TestPage = () => {
  const [state, dispatch] = React.useReducer(
    userCacheReducer,
    userCacheGenerator(testData, "Hello")
  );
  const [responseData, setResponseData] = React.useState<string[]>([""]);
  const timeLeft = React.useState([testCache.maxTime, 0]);

  React.useEffect(() => {
    dispatch({ type: "set_login_time", payload: Date.now() });
  }, []);

  // useRenderingTrace("QuestionView", state);

  const providers = [
    <TestPaperContext.Provider value={testData} key={0} />,
    <StateContext.Provider value={state} key={1} />,
    <DispatchContext.Provider value={dispatch} key={2} />,
    <ResponseDataContext.Provider
      value={{
        responseData,
        setResponseData,
      }}
      key={3}
    />,
    <TimeLeftContext.Provider value={timeLeft} key={3} />,
  ];

  return (
    <MultiProvider providers={providers}>
      <div className="bg-slate-800 flex flex-box flex-col h-screen max-h-screen select-none">
        <PreTestModal />
        <SubmitTestModal />

        <TestHeader />
        <div className="h-auto flex flex-1 w-screen overflow-hidden">
          <TestMainWindow />
          <TestSidebar />
        </div>
        <TestBottombar />
      </div>
    </MultiProvider>
  );
};

export default TestPage;
