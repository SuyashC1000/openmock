import { ScoreData } from "../../_functions/calculateScoreData";
import { TestPaper } from "../../_interface/testData";
import { TestResponse } from "../../_interface/testResponse";
import { UserCache } from "../../_interface/userCache";
import { UserData } from "../../_interface/userData";

export const emptyScoreData: ScoreData = {
  marks: {
    correct: 0,
    incorrect: 0,
    max: 0,
    partial: 0,
    total: 0,
  },
  questions: {
    correct: 0,
    incorrect: 0,
    partial: 0,
    total: 0,
    unattempted: 0,
  },
};

export const emptyTestPaper: TestPaper = {
  additionalTools: {
    calculator: "none",
    magnifyingGlass: false,
  },
  tags: [],
  version: "",
  analysis: {},
  maxMetrics: {
    marks: 0,
    questions: 0,
    time: 0,
  },
  authors: [],
  name: "",
  id: "",
  languages: [""],
  instructions: [""],
  maxTime: 1,
  subjects: [""],
  timeCreated: 0,
  usefulData: [""],
  body: [
    {
      groupName: "",
      optional: false,
      sections: [
        {
          consolidateSubject: "",
          optional: false,
          sectionName: "",
          questions: [
            {
              solution: [""],
              question: [""],
              qDataType: [2, 0],
              markingScheme: [
                [0, 1],
                [0, 1],
              ],
              id: "",
              answer: 0,
              options: null,
              qTypeName: "",
              tags: [],
            },
          ],
        },
      ],
    },
  ],
};
export const emptyUserCache: UserCache = {
  testId: "",
  attemptId: "",
  testStatus: "starting",
  preferences: {
    calculator: false,
    zoomLevel: 1,
    sidebarCollapsed: false,
  },
  userDetails: {
    username: "",
    imageSrc: "",
  },
  timestamps: {
    testStartTime: 0,
    testLoginTime: 0,
  },
  currentLanguageIndex: 0,
  activeGroupIndex: 0,
  body: [
    {
      activeSectionIndex: 0,
      groupName: "",
      permissions: "all",
      status: "ongoing",
      timeSpent: 0,
      sections: [
        {
          sectionName: "",
          questionDisplayList: [0],
          qIndex: 0,
          questions: [
            {
              id: "",
              permissions: "all",
              optionDisplayList: null,
              lastAnswered: 0,
              status: 0,
              submit: null,
              timeSpent: 0,
            },
          ],
        },
      ],
    },
  ],
};
export const emptyTestResponse: TestResponse = {
  testId: "",
  version: "0",
  scoreData: emptyScoreData,
  attemptId: "",
  timestamps: {
    testStartTime: 0,
    testEndTime: 0,
  },
  body: [
    {
      groupName: "",
      timeSpent: 0,
      scoreData: emptyScoreData,
      sections: [
        {
          sectionName: "",
          questionDisplayList: [],
          scoreData: emptyScoreData,
          questions: [
            {
              id: "",
              lastAnswered: 0,
              optionDisplayList: [],
              status: 0,
              evaluation: 0,
              marks: 0,
              submit: null,
              timeSpent: 0,
            },
          ],
        },
      ],
    },
  ],
};

export const emptyUserData: UserData = {
  id: "",
  timeCreated: 0,
  preferences: {
    alwaysSaveResponses: false,
    author: null,
    displayMode: null,
  },
  version: "0",
  saved: {
    testPaperFolderIds: [],
    testPaperIds: [],
    testResponseIds: [],
  },
  profile: {
    imageSrc: "",
    username: "",
  },
};
