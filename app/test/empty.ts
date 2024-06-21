import { TestPaper } from "../interface/testData";
import { UserCache } from "../interface/userCache";

export const emptyTestPaper: TestPaper = {
  additionalTools: {
    scientificCalculator: false,
  },
  authors: [],
  name: "",
  id: "",
  languages: [""],
  instructions: "",
  maxTime: 0,
  subjects: [""],
  timeCreated: 0,
  usefulData: "",
  body: [],
};
export const emptyUserCache: UserCache = {
  username: "",
  testId: "",
  testStartTime: 0,
  currentLanguageIndex: 0,
  activeGroupIndex: 0,
  body: [],
};
