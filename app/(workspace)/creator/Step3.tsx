import React from "react";
import QuestionEditor from "./QuestionEditor";
import { Card, CardBody } from "@chakra-ui/react";
import QuestionSelector from "./QuestionSelector";
import { TestPaperQuestion, TestPaperSection } from "@/app/_interface/testData";

export interface Step3DataProps {
  activeSection?: string;
  currentLanguage: number;
  questionData?: TestPaperQuestion;
  preferences: {
    questionType: [number, number];
    questionTypeName: string;
    markingScheme: {
      0: [number, number];
      1: [number, number];
      2?: [number, number][];
    };
    answer: number | number[];
  };
  sectionLocation?: [number, number];
}

const defaultStep3Data: Step3DataProps = {
  activeSection: undefined,
  questionData: undefined,
  preferences: {
    questionType: [0, 4],
    questionTypeName: "SCQ",
    markingScheme: [
      [4, 1],
      [-1, 1],
    ],
    answer: 0,
  },
  currentLanguage: 0,
};

const Step3 = () => {
  const [step3Data, setStep3Data] =
    React.useState<Step3DataProps>(defaultStep3Data);

  return (
    <div className="m-2 flex gap-3">
      <QuestionSelector step3Data={step3Data} setStep3Data={setStep3Data} />
      <br />
      <QuestionEditor step3Data={step3Data} setStep3Data={setStep3Data} />
    </div>
  );
};

export default Step3;
