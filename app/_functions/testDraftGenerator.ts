import { SystemData } from "../_interface/systemData";
import { TestPaper } from "../_interface/testData";
import { UserData } from "../_interface/userData";
import { uniqueId } from "./randomGenerator";

const emptyUserData: UserData = {
  id: "",
  preferences: {
    defaultLanguage: "English",
    author: null,
  },
  profile: {
    name: "",
    imageSrc: "",
  },
  timeCreated: 0,
  version: "0",
};

export function testDraftGenerator(
  userData: UserData,
  systemData: SystemData
): Partial<TestPaper> {
  const userDataRef: UserData = userData ?? emptyUserData;

  const final: Partial<TestPaper> = {
    id: `td${uniqueId(10)}`,
    name: "",
    authors:
      userDataRef.preferences.author !== null
        ? [userDataRef.preferences.author]
        : [],
    body: [],
    languages: [userDataRef.preferences.defaultLanguage],
    timeCreated: Date.now(),
    instructions: [""],
    // maxMetrics: {
    //   marks: 0,
    //   questions: 0,
    //   time: 1,
    // },
    version: systemData.version,
    tags: [],
    usefulData: [""],
    analysis: {
      preTestMessage: [""],
      postTestMessage: [""],
    },
    additionalTools: {
      calculator: "none",
      magnifyingGlass: false,
    },
  };
  return final;
}
