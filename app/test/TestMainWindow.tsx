import React from "react";
import QuestionBtn from "../_components/QuestionBtn";
import QuestionView from "./QuestionView";
import { UserCache } from "../_interface/userCache";
import { TestProps } from "../_interface/testProps";
import ConstraintAlert from "./ConstraintAlert";

const TestMainWindow = () => {
  return (
    <div className="bg-white flex-1 overflow-y-auto">
      <QuestionView />
    </div>
  );
};

export default TestMainWindow;
