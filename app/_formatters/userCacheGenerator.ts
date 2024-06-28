import { TestPaper } from "../_interface/testData";
import {
  UserCache,
  UserCacheGroup,
  UserCacheQuestion,
  UserCacheSection,
} from "../_interface/userCache";

export default function userCacheGenerator(
  testPaper: TestPaper,
  username: string
): UserCache {
  //

  let newBody = testPaper.body.map((e, i) => {
    return {
      groupName: e.groupName,
      hasOpted: e.optional ? false : undefined,
      activeSectionIndex: 0,
      status: i === 0 ? "ongoing" : "upcoming",
      permissions: e.constraints?.permissionOnSubmit ?? "all",
      sections: e.sections.map((f, j) => {
        return {
          sectionName: f.sectionName,
          maxQuestions: f.maxQuestions,
          selected: f.optional ? false : undefined,
          qIndex: 0,
          questions: f.questions.map((g, k) => {
            return {
              id: g.id,
              status: i === 0 && j === 0 && k === 0 ? 1 : 0,
              submit: null,
              timeSpent: 0,
              lastAnswered: null,
              permissions: g.constraints?.permissionOnAttempt ?? "all",
            } as UserCacheQuestion;
          }),
        } as UserCacheSection;
      }),
    } as UserCacheGroup;
  });

  // console.log(newBody);

  let foundation: UserCache = {
    body: newBody,
    toolsPreferences: {
      zoomLevel: 1,
      calculator: false,
    },
    testStatus: "starting",
    activeGroupIndex: 0,
    testId: testPaper.id,
    username: username,
    currentLanguageIndex: 0,
    testStartTime: 0,
    userDetails: {
      name: "User",
    },
    testLoginTime: 0,
  };

  return foundation;
}
