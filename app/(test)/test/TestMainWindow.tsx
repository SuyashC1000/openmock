import React from "react";
import QuestionView from "./QuestionView";
import TestSidebar from "./TestSidebar";
import OptionalGroupAlert from "./_alerts/OptionalGroupAlert";
import { groupConstraint } from "../../_functions/groupConstraint";
import { TestStateContext, TestPaperContext } from "./page";

const TestMainWindow = () => {
  const state = React.useContext(TestStateContext);
  const testPaper = React.useContext(TestPaperContext);

  return (
    <>
      {!groupConstraint(state, testPaper).canAccess ? (
        <OptionalGroupAlert />
      ) : (
        <div className="h-auto flex flex-1 w-screen overflow-hidden">
          <div className="bg-white flex-1">
            <QuestionView />
          </div>

          <TestSidebar />
        </div>
      )}
    </>
  );
};

export default TestMainWindow;
