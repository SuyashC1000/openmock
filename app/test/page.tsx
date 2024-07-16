"use client";

import React from "react";
import TestHeader from "./TestHeader";
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
import MultiProvider from "../_components/MultiProvider";
import OverlayCollection from "./OverlayCollection";
import { TestPaper } from "../_interface/testData";
import Loader from "./Loader";

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

const TestPage = () => {
  const [activeTestPaperCache, setActiveTestPaperCache] =
    React.useState<TestPaper | null>(emptyTestPaper);

  const [pageStatus, setPageStatus] = React.useState<
    "loading" | "success" | "failure" | "empty"
  >("loading");
  const [state, dispatch] = React.useReducer(userCacheReducer, emptyUserCache);

  const [responseData, setResponseData] = React.useState<string[]>([""]);

  const dialogData = React.useState({
    active: false,
    title: "",
    message: "",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./data/testData.json");
      const data: TestPaper | null = null;

      if (data !== null) {
        setActiveTestPaperCache(data);
        dispatch({
          type: INITIALIZE_STATE,
          payload: userCacheGenerator(data, "User"),
        });
        dispatch({ type: SET_LOGIN_TIME, payload: Date.now() });
        setPageStatus("success");
      } else {
        setPageStatus("empty");
      }
    };

    fetchData();
  }, []);

  // useRenderingTrace("QuestionView", state);

  const providers = [
    <TestPaperContext.Provider value={activeTestPaperCache} key={0} />,
    <StateContext.Provider value={state} key={1} />,
    <DispatchContext.Provider value={dispatch} key={2} />,
    <ResponseDataContext.Provider
      value={{
        responseData,
        setResponseData,
      }}
      key={3}
    />,
    <DialogDataContext.Provider value={dialogData} key={4} />,
  ];

  return (
    <MultiProvider providers={providers}>
      <div className="bg-slate-800 flex flex-box flex-col h-screen max-h-screen select-none">
        <Loader status={pageStatus} />
        <OverlayCollection />
        <TestHeader />
        <TestMainWindow />
        <TestBottombar />
      </div>
    </MultiProvider>
  );
};

export default TestPage;
