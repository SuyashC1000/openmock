export interface TestResponse {
  testId: string;
  attemptId: string;
  timestamps: TestResponseTimeStamps;
  body: TestResponseGroup[];

  [k: string]: unknown;
}

export interface TestResponseQuestion {
  id: string;
  status: number;
  submit: number | number[] | null;
  timeSpent: number;
  optionDisplayList: number[] | null;
  lastAnswered: number | null;
  [k: string]: unknown;
}

export interface TestResponseSection {
  sectionName: string;
  questionDisplayList: number[];
  selected?: boolean;
  questions: TestResponseQuestion[];
  [k: string]: unknown;
}

export interface TestResponseGroup {
  groupName: string;
  timeSpent: number;
  hasOpted?: boolean;
  sections: TestResponseSection[];
  [k: string]: unknown;
}

interface TestResponseTimeStamps {
  testStartTime: number;
  testEndTime: number;
}
