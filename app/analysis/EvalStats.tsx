import React from "react";
import { activeTestResponseContext, SuppliedTestPaperContext } from "./page";
import { Card, CardBody, Heading, Icon, Text } from "@chakra-ui/react";
import { TestResponseQuestion } from "../_interface/testResponse";
import {
  TbCircleCheck,
  TbCircleDashed,
  TbCircleDot,
  TbCircleMinus,
  TbCircleX,
  TbClock,
  TbDiamonds,
  TbSquareX,
  TbSquareXFilled,
  TbTallymarks,
} from "react-icons/tb";
import { Evaluation, QuestionStatus } from "@/lib/enums";
import { IconType } from "react-icons/lib";

const QuestionEvalStatus = ({
  index,
  question,
  disabled,
}: {
  index: number;
  question: TestResponseQuestion;
  disabled: boolean;
}) => {
  let background: string = "blue";
  let evalIcon: IconType = TbCircleDashed;
  switch (question.evaluation) {
    case Evaluation.Correct:
      background = "#86efac";
      evalIcon = TbCircleCheck;
      break;
    case Evaluation.Incorrect:
      background = "#fca5a5";
      evalIcon = TbCircleX;
      break;
    case Evaluation.Partial:
      background = "#fde047";
      evalIcon = TbCircleDot;
      break;
    case Evaluation.Unattempted:
      background = "#d4d4d4";
      evalIcon = TbCircleMinus;
      break;
  }

  return (
    <div
      className={`h-16 min-w-28 max-w-fit flex flex-col
    justify-center items-center rounded-lg p-2 relative`}
      style={{
        backgroundColor: !disabled ? background : undefined,
        border: disabled ? `3px dashed ${background} ` : undefined,
      }}
    >
      <Heading color={disabled ? "grey" : undefined} size={"md"}>
        {index}
      </Heading>
      <Text color={disabled ? "grey" : undefined}>
        <Icon as={TbDiamonds} />
        {question.marks} &bull; <Icon as={TbClock} />
        {question.timeSpent}s
      </Text>
      <div
        className={`absolute top-1 left-1`}
        style={{
          color: background,
          filter: "brightness(0.5)",
        }}
      >
        <Icon as={evalIcon} fontSize={25} strokeWidth={1.5} />
      </div>
      {[QuestionStatus.Marked, QuestionStatus.AnsweredMarked].includes(
        question.status
      ) && (
        <div className="h-4 w-4 rounded-full bg-purple-400 absolute top-1 right-1"></div>
      )}
    </div>
  );
};

const EvalStats = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const testPaper = React.useContext(SuppliedTestPaperContext);

  return (
    <div>
      <Heading size={"lg"}>Evaluation Stats</Heading>
      <Card>
        <CardBody>
          {testResponse.body.map((e, i) => {
            return (
              <div key={e.groupName} className="m-2">
                <Heading
                  size={"md"}
                  textDecoration={"underline"}
                  color={e.hasOpted === false ? "grey" : undefined}
                >
                  {e.hasOpted === false && <Icon as={TbSquareXFilled} />}{" "}
                  {e.groupName}
                </Heading>
                {e.sections.map((f, j) => {
                  return (
                    <div key={f.sectionName} className="mx-3 my-5">
                      <Heading
                        size={"md"}
                        fontWeight={"medium"}
                        color={
                          e.hasOpted === false || f.selected == false
                            ? "grey"
                            : undefined
                        }
                      >
                        {f.selected === false && <Icon as={TbSquareXFilled} />}{" "}
                        {f.sectionName}
                      </Heading>
                      <div className="flex gap-2 overflow-hidden max-w-full flex-wrap m-2">
                        {f.questions.map((g, k) => {
                          return (
                            <QuestionEvalStatus
                              index={k + 1}
                              question={g}
                              key={k}
                              disabled={
                                e.hasOpted === false || f.selected === false
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </CardBody>
      </Card>
    </div>
  );
};

export default EvalStats;
