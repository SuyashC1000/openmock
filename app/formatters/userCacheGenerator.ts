import { TestPaper } from "../interface/testData";
import { UserCache } from "../interface/userCache";

export default function userCacheGenerator(
  testPaper: TestPaper,
  username: string
): UserCache {
  let newBody = testPaper.body.map((e, i) => {
    return {
      groupName: e.groupName,
      active: false,
      sections: e.sections.map((f, j) => {
        return {
          sectionName: f.sectionName,
          maxQuestions: f.maxQuestions,
          active: false,
          questions: f.questions.map((g, k) => {
            return {
              id: g.id,
              status: 0,
              submit: null,
              timeSpent: 0,
              lastAnswered: null,
            };
          }),
        };
      }),
    };
  });
  let foundation: UserCache = {
    body: newBody,
    testId: testPaper.id,
    username: username,
    currentLanguageIndex: 0,
    testStartTime: Date.now(),
  };

  return foundation;
}
