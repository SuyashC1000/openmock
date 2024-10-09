"use client";

import React, { useState } from "react";
import TestHeader from "./TestHeader";
import TestMainWindow from "./TestMainWindow";
import TestBottombar from "./TestBottombar";
import testData from "../../../public/data/testData.json";
import userCacheGenerator from "../../_functions/userCacheGenerator";
import userCacheReducer, {
  Action,
  INITIALIZE_STATE,
  SET_LOGIN_TIME,
} from "../../_functions/userCacheReducer";
import { emptyTestPaper, emptyUserCache, emptyUserData } from "./empty";
import MultiProvider from "../../_components/MultiProvider";
import OverlayCollection from "./OverlayCollection";
import { TestPaper } from "../../_interface/testData";
import Loader from "./Loader";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";
import { UserData } from "../../_interface/userData";

interface DispatchFunction {
  (action: Action): void;
}

export const TestStateContext = React.createContext(emptyUserCache);

export const TestDispatchContext = React.createContext(function example(
  action: Action
) {});
export const TestPaperContext = React.createContext(emptyTestPaper);
export const TestCacheResponseDataContext = React.createContext({
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
    useState<TestPaper | null>(emptyTestPaper);

  const [pageStatus, setPageStatus] = useState<
    "loading" | "success" | "failure" | "empty"
  >("loading");
  const [state, dispatch] = React.useReducer(userCacheReducer, emptyUserCache);
  const [responseData, setResponseData] = useState<string[]>([""]);

  const dialogData = useState({
    active: false,
    title: "",
    message: "",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await db.activeTestPaper.toArray();
      const data: TestPaper | null = response[0];

      const userResponse = await db.userData.toArray();

      if (data !== null && data !== undefined) {
        setActiveTestPaperCache(data);
        dispatch({
          type: INITIALIZE_STATE,
          payload: userCacheGenerator(data, userResponse[0] ?? emptyUserData),
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
    <TestPaperContext.Provider value={activeTestPaperCache!} key={0} />,
    <TestStateContext.Provider value={state} key={1} />,
    <TestDispatchContext.Provider value={dispatch} key={2} />,
    <TestCacheResponseDataContext.Provider
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
        {pageStatus !== "success" ? (
          <Loader status={pageStatus} />
        ) : (
          <>
            <OverlayCollection />
            <TestHeader />
            <TestMainWindow />
            <TestBottombar />
          </>
        )}
      </div>
    </MultiProvider>
  );
};

export default TestPage;
