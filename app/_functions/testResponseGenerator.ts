import { TestPaper } from "../_interface/testData";
import {
  TestResponse,
  TestResponseGroup,
  TestResponseQuestion,
  TestResponseSection,
} from "../_interface/testResponse";
import { UserCache } from "../_interface/userCache";
import { evaluateMarks } from "./evaluateMarks";

export function testResponseGenerator(
  userCache: UserCache,
  testPaper: TestPaper,
  endTime: number
): TestResponse {
  let foundation: TestResponse = {
    testId: userCache.testId,
    attemptId: userCache.attemptId,
    timestamps: {
      testStartTime: userCache.timestamps.testStartTime,
      testEndTime: endTime,
    },
    body: userCache.body.map((e, i) => {
      return {
        groupName: e.groupName,
        hasOpted: e.hasOpted,
        timeSpent: e.timeSpent,
        sections: e.sections.map((f, j) => {
          return {
            sectionName: f.sectionName,
            questionDisplayList: f.questionDisplayList,
            selected: f.selected,
            questions: f.questions.map((g, k) => {
              const question = testPaper.body[i].sections[j].questions[k];
              const questionScore = evaluateMarks(question, g);

              return {
                id: g.id,
                status: g.status,
                submit: g.submit,
                timeSpent: g.timeSpent,
                lastAnswered: g.lastAnswered,
                optionDisplayList: g.optionDisplayList,
                evaluation: questionScore.evaluation,
                marks: questionScore.marks,
              } as TestResponseQuestion;
            }),
          } as TestResponseSection;
        }),
      } as TestResponseGroup;
    }),
  };

  return foundation;
}
