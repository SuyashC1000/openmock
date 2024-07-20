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

  function shuffle(unshuffled: any[]) {
    let shuffled = unshuffled
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffled;
  }

  let newBody = testPaper.body.map((e, i) => {
    return {
      groupName: e.groupName,
      hasOpted: e.optional ? false : undefined,
      activeSectionIndex: 0,
      timeSpent: 0,
      status: i === 0 ? "ongoing" : "upcoming",
      permissions: e.constraints?.permissionOnSubmit ?? "all",
      sections: e.sections.map((f, j) => {
        return {
          sectionName: f.sectionName,
          selected: f.optional ? false : undefined,
          qIndex: 0,
          questionDisplayList:
            f.constraints?.randomizeQuestions === true
              ? shuffle(Array.from(Array(f.questions.length).keys()))
              : Array.from(Array(f.questions.length).keys()),
          questions: f.questions.map((g, k) => {
            return {
              id: g.id,
              status: 0,
              submit: null,
              optionDisplayList:
                g.constraints?.randomizeOptions === true && g.options !== null
                  ? shuffle(Array.from(Array(g.options.length).keys()))
                  : g.options !== null
                    ? Array.from(Array(g.options.length).keys())
                    : null,
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
    preferences: {
      zoomLevel: 1,
      calculator: false,
      sidebarCollapsed: false,
    },
    testStatus: "starting",
    activeGroupIndex: 0,
    testId: testPaper.id,
    currentLanguageIndex: 0,
    timestamps: {
      testStartTime: 0,
      testLoginTime: 0,
      testEndTime: 0,
    },
    userDetails: {
      name: username,
    },
  };

  return foundation;
}
