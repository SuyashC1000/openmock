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
import userCacheReducer, { Action } from "../formatters/userCacheReducer";
import { TestProps } from "../interface/testProps";
import { emptyTestPaper, emptyUserCache } from "./empty";

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
  responseData: [],
  setResponseData: (value) => {},
});

const testCache = testData;
const TestPage = () => {
  const [state, dispatch] = React.useReducer(
    userCacheReducer,
    userCacheGenerator(testData, "Hello")
  );
  const [responseData, setResponseData] = React.useState([]);

  return (
    <TestPaperContext.Provider value={testData}>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <ResponseDataContext.Provider
            value={{
              responseData,
              setResponseData,
            }}
          >
            <div className="bg-slate-800 flex flex-box flex-col h-screen max-h-screen select-none">
              <TestHeader />
              <div className="h-auto flex flex-1 w-screen overflow-hidden">
                <TestMainWindow />
                <TestSidebar />
              </div>
              <TestBottombar />
            </div>
          </ResponseDataContext.Provider>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </TestPaperContext.Provider>
  );
};

export default TestPage;
