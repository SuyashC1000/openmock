import React from "react";
import QuestionBtn from "../components/QuestionBtn";

const TestMainWindow = () => {
  return (
    <div className="bg-white flex-1 ">
      <div className="flex ">
        <QuestionBtn count={10} status={0} />
        <QuestionBtn count={10} status={1} />
        <QuestionBtn count={10} status={2} />
        <QuestionBtn count={10} status={3} />
        <QuestionBtn count={10} status={4} />
      </div>
    </div>
  );
};

export default TestMainWindow;
