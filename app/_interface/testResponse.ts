import { ScoreData } from "../_functions/calculateScoreData";

export interface TestResponse {
  testId: string;
  version: string;
  attemptId: string;
  timestamps: TestResponseTimeStamps;
  body: TestResponseGroup[];
  scoreData: ScoreData;
  [k: string]: unknown;
}

export interface TestResponseQuestion {
  id: string;
  status: number;
  submit: number | number[] | null;
  timeSpent: number;
  optionDisplayList: number[] | null;
  lastAnswered: number | null;
  evaluation: number;
  marks: number;
  [k: string]: unknown;
}

export interface TestResponseSection {
  sectionName: string;
  questionDisplayList: number[];
  selected?: boolean;
  scoreData: ScoreData;
  questions: TestResponseQuestion[];
  [k: string]: unknown;
}

export interface TestResponseGroup {
  groupName: string;
  timeSpent: number;
  scoreData: ScoreData;
  hasOpted?: boolean;
  sections: TestResponseSection[];
  [k: string]: unknown;
}

interface TestResponseTimeStamps {
  testStartTime: number;
  testEndTime: number;
}
