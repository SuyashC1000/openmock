import React from "react";
import QuestionBtn from "../components/QuestionBtn";
import QuestionView from "./QuestionView";
import { UserCache } from "../interface/userCache";
import { TestProps } from "../interface/testProps";

const TestMainWindow = (props: TestProps) => {
  return (
    <div className="bg-white flex-1 ">
      <QuestionView {...props} />
    </div>
  );
};

export default TestMainWindow;
