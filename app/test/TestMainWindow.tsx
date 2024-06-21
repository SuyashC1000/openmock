import React from "react";
import QuestionBtn from "../components/QuestionBtn";
import QuestionView from "./QuestionView";
import { UserCache } from "../interface/userCache";
import { TestProps } from "../interface/testProps";

const TestMainWindow = () => {
  return (
    <div className="bg-white flex-1 overflow-y-auto">
      <QuestionView />
    </div>
  );
};

export default TestMainWindow;
