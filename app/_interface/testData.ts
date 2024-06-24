export interface TestPaper {
  id: string;
  name: string;
  timeCreated: number;
  authors: string[];
  maxTime: number;
  subjects: string[];
  languages: string[];
  instructions: string;
  additionalTools: {
    scientificCalculator: boolean;
    [k: string]: unknown;
  };
  usefulData: string;
  body: TestPaperGroup[];
  [k: string]: unknown;
}

export interface TestPaperQuestion {
  id: string;
  qTypeName: string;
  qDataType: number[];
  markingScheme: number[][];
  question: string[];
  options: string[][] | null;
  tags: unknown[];
  answer: number | number[];
  [k: string]: unknown;
}

export interface TestPaperSection {
  sectionName: string;
  maxQuestions: number;
  consolidateSubject: string;
  optional: boolean;
  questions: TestPaperQuestion[];
  [k: string]: unknown;
}

export interface TestPaperGroup {
  groupName: string;
  constraints?: Object;
  sections: TestPaperSection[];
  [k: string]: unknown;
}
