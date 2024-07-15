import { TestPaper } from "../_interface/testData";
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
  maxTime: 0,
  subjects: [""],
  timeCreated: 0,
  usefulData: [""],
  body: [],
};
export const emptyUserCache: UserCache = {
  testId: "",
  testLoginTime: 0,
  testStatus: "starting",
  preferences: {
    calculator: false,
    zoomLevel: 1,
  },
  userDetails: {
    name: "",
  },
  testStartTime: 0,
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
