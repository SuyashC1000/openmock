"use client";

import { Button, ButtonGroup, Icon, Text } from "@chakra-ui/react";
import React from "react";
import TestHeader from "./TestHeader";
import TestSidebar from "./TestSidebar";
import TestMainWindow from "./TestMainWindow";
import TestBottombar from "./TestBottombar";
import testData from "../../public/data/testData.json";
import userCacheGenerator from "../_formatters/userCacheGenerator";
import userCacheReducer, {
  Action,
  INITIALIZE_STATE,
  SET_LOGIN_TIME,
} from "../_formatters/userCacheReducer";
import { emptyTestPaper, emptyUserCache } from "./empty";
import { PreTestModal } from "./_modals/PreTestModal";
import SubmitTestModal from "./_modals/SubmitTestModal";
import MultiProvider from "../_components/MultiProvider";
import useRenderingTrace from "./Diagnostic";
import ConfirmationModal from "./_modals/ConfirmationModal";
import OverlayCollection from "./OverlayCollection";

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

export const DialogDataContext = React.createContext([
  {
    active: false,
    title: "",
    message: "",
  },
  (e: any) => {
    e;
  },
]);
export const TimeLeftContext = React.createContext([
  [0, 0],
  (e: any) => {
    e;
  },
]);
export const QuestionTimeContext = React.createContext([
  null,
  (e: [number, number]) => {},
]);

const testCache = testData;
const TestPage = () => {
  const [state, dispatch] = React.useReducer(userCacheReducer, emptyUserCache);
  const [responseData, setResponseData] = React.useState<string[]>([""]);
  const timeLeft = React.useState([testCache.maxTime, 0]);
  const dialogData = React.useState({
    active: false,
    title: "",
    message: "",
  });
  const questionTime = React.useState<[number, number] | null>(null);

  React.useEffect(() => {
    dispatch({
      type: INITIALIZE_STATE,
      payload: userCacheGenerator(testData, "User"),
    });
    dispatch({ type: SET_LOGIN_TIME, payload: Date.now() });
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
    <DialogDataContext.Provider value={dialogData} key={4} />,
    <QuestionTimeContext.Provider value={questionTime} key={5} />,
  ];

  return (
    <MultiProvider providers={providers}>
      <div className="bg-slate-800 flex flex-box flex-col h-screen max-h-screen select-none">
        <OverlayCollection />
        <TestHeader />
        <TestMainWindow /> <TestBottombar />
      </div>
    </MultiProvider>
  );
};

export default TestPage;
