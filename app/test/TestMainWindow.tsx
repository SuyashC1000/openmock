import React from "react";
import QuestionView from "./QuestionView";
import TestSidebar from "./TestSidebar";
import OptionalGroupAlert from "./_alerts/OptionalGroupAlert";
import useActiveElements from "@/lib/useActiveElements";

const TestMainWindow = () => {
  const { activeGroup, activeGroupCache } = useActiveElements();

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
