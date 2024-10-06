import { TestPaper } from "../_interface/testData";
import { uniqueId } from "./randomGenerator";

export function testDraftGenerator(
  date: number,
  version: string
): Partial<TestPaper> {
  const final: Partial<TestPaper> = {
    id: `td${uniqueId(10)}`,
    name: "",
    authors: [],
    body: [],
    languages: ["English"],
    timeCreated: date,
    instructions: [],
    // maxMetrics: {
    //   marks: 0,
    //   questions: 0,
    //   time: 1,
    // },
    version: version,
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
