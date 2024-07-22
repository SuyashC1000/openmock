import { TestPaper } from "../_interface/testData";
import { TestResponse } from "../_interface/testResponse";
import { UserCache } from "../_interface/userCache";

export const emptyTestPaper: TestPaper = {
  additionalTools: {
    calculator: "none",
    magnifyingGlass: false,
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
              question: [""],
              qDataType: [2, 0],
              markingScheme: [
                [0, 1],
                [0, 1],
                [0, 1],
              ],
              id: "0",
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
    name: "",
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
  attemptId: "",
  timestamps: {
    testStartTime: 0,
    testEndTime: 0,
  },
  body: [
    {
      groupName: "",
      timeSpent: 0,
      sections: [
        {
          sectionName: "",
          questionDisplayList: [],
          questions: [
            {
              id: "",
              lastAnswered: 0,
              optionDisplayList: [],
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
