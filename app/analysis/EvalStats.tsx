import React from "react";
import { activeTestResponseContext, SuppliedTestPaperContext } from "./page";
import { Card, CardBody, Heading, Icon, Text } from "@chakra-ui/react";
import { TestResponseQuestion } from "../_interface/testResponse";
import { TbClock, TbDiamonds, TbTallymarks } from "react-icons/tb";
import { Evaluation, QuestionStatus } from "@/lib/enums";

const QuestionEvalStatus = ({
  index,
  question,
}: {
  index: number;
  question: TestResponseQuestion;
}) => {
  let background: string = "";
  switch (question.evaluation) {
    case Evaluation.Correct:
      background = "bg-green-200";
      break;
    case Evaluation.Incorrect:
      background = "bg-red-200";
      break;
    case Evaluation.Partial:
      background = "bg-yellow-200";
      break;
    case Evaluation.Unattempted:
      background = "bg-neutral-200";
      break;
  }

  return (
    <div
      className={`h-16 min-w-28 max-w-fit ${background} flex flex-col
    justify-center items-center rounded-lg p-2 relative`}
    >
      <Heading size={"md"}>{index}</Heading>
      <Text fontSize={""}>
        <Icon as={TbDiamonds} />
        {question.marks} | <Icon as={TbClock} />
        {question.timeSpent}s
      </Text>
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
          {/* <QuestionEvalStatus
            index={1}
            question={testResponse.body[0].sections[0].questions[0]}
          /> */}
          {testResponse.body.map((e, i) => {
            return (
              <>
                {e.hasOpted !== false && (
                  <div key={i} className="m-2">
                    <Heading size={"md"} textDecoration={"underline"}>
                      {e.groupName}
                    </Heading>
                    {e.sections.map((f, j) => {
                      return (
                        <>
                          {f.selected !== false && (
                            <div key={j} className="mx-3 my-5">
                              <Heading size={"md"} fontWeight={"medium"}>
                                {f.sectionName}
                              </Heading>
                              <div className="flex gap-2 overflow-hidden max-w-full flex-wrap m-2">
                                {f.questions.map((g, k) => {
                                  return (
                                    <QuestionEvalStatus
                                      index={k + 1}
                                      question={g}
                                      key={k}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                )}
              </>
            );
          })}
        </CardBody>
      </Card>
    </div>
  );
};

export default EvalStats;
