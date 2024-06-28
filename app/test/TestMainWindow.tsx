import React from "react";
import QuestionBtn from "../_components/QuestionBtn";
import QuestionView from "./QuestionView";
import { UserCache } from "../_interface/userCache";
import { TestProps } from "../_interface/testProps";
import ConstraintAlert from "./ConstraintAlert";
import TestSidebar from "./TestSidebar";
import { StateContext, TestPaperContext } from "./page";
import {
  getActiveGroup,
  getActiveGroupCache,
} from "../_formatters/getActiveCache";
import OptionalGroupAlert from "./OptionalGroupAlert";

const TestMainWindow = () => {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);

  const activeGroup = getActiveGroup(testPaper, state);
  const activeGroupCache = getActiveGroupCache(state);

  return (
    <>
      {activeGroup.optional && !activeGroupCache.hasOpted ? (
        <OptionalGroupAlert />
      ) : (
        <div className="h-auto flex flex-1 w-screen overflow-hidden">
          <div className="bg-white flex-1 overflow-y-auto">
            <QuestionView />
          </div>
          <TestSidebar />
        </div>
      )}
    </>
  );
};

export default TestMainWindow;
