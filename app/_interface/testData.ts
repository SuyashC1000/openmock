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
    calculator: "normal" | "scientific" | "none";
    magnifyingGlass: boolean;
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
  constraints?: TestPaperQuestionConstraints;
  [k: string]: unknown;
}

export interface TestPaperSection {
  sectionName: string;
  consolidateSubject: string;
  optional: boolean;
  questions: TestPaperQuestion[];
  constraints?: TestPaperSectionConstraints;
  [k: string]: unknown;
}

export interface TestPaperGroup {
  groupName: string;
  optional: boolean;
  constraints?: TestPaperGroupConstraints;
  sections: TestPaperSection[];
  [k: string]: unknown;
}

interface TestPaperGroupConstraints {
  permissionOnSubmit?: "all" | "view" | "none" | undefined;
  maxQuestionsAnswered?: number;
  maxOptionalSectionsAnswered?: number;
}
interface TestPaperSectionConstraints {
  maxQuestionsAnswered?: number;
}
interface TestPaperQuestionConstraints {
  optional?: boolean;
  permissionOnAttempt?: "all" | "view" | "none" | undefined;
}
