import React from "react";
import QuestionView from "./QuestionView";
import TestSidebar from "./TestSidebar";
import OptionalGroupAlert from "./_alerts/OptionalGroupAlert";
import useActiveElements from "@/lib/useActiveElements";
import { groupConstraint } from "../_formatters/groupConstraint";
import { StateContext, TestPaperContext } from "./page";

const TestMainWindow = () => {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);

  return (
    <>
      {!groupConstraint(state, testPaper).canAccess ? (
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
