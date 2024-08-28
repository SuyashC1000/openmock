import { TestPaper } from "../_interface/testData";
import { uniqueId } from "./randomGenerator";

export function testDraftGenerator(date: number, version: string): TestPaper {
  const final: TestPaper = {
    id: `t${uniqueId(10)}`,
    name: "",
    authors: [],
    body: [],
    languages: ["English"],
    timeCreated: date,
    instructions: [],
    maxMetrics: {
      marks: 0,
      questions: 0,
      time: 1,
    },
    version: version,
    tags: [],
    usefulData: [],
    analysis: {},
    additionalTools: {
      calculator: "none",
      magnifyingGlass: false,
    },
  };
  return final;
}
