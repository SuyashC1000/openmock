import React from "react";
import QuestionEditor from "./QuestionEditor";
import { Card, CardBody } from "@chakra-ui/react";
import QuestionSelector from "./QuestionSelector";

const Step3 = () => {
  return (
    <div className="m-2 flex gap-3">
      <QuestionSelector />
      <br />
      <QuestionEditor />
    </div>
  );
};

export default Step3;
