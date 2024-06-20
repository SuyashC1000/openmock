import { TestPaper } from "../interface/testData";
import { UserCache } from "../interface/userCache";

export default function userCacheGenerator(
  testPaper: TestPaper,
  username: string
): UserCache {
  //
  let newBody = testPaper.body.map((e, i) => {
    return {
      groupName: e.groupName,
      activeSectionIndex: 0,
      sections: e.sections.map((f, j) => {
        return {
          sectionName: f.sectionName,
          maxQuestions: f.maxQuestions,
          optional: f.optional,
          qIndex: 0,
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

  console.log(newBody);

  let foundation: UserCache = {
    body: newBody,
    activeGroupIndex: 0,
    testId: testPaper.id,
    username: username,
    currentLanguageIndex: 0,
    testStartTime: Date.now(),
  };

  return foundation;
}
