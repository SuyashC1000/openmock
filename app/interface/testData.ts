export interface TestPaper {
  id: string;
  name: string;
  timeCreated: number;
  authors: string[];
  maxTime: number;
  subjects: string[];
  languages: string[];
  additionalTools: {
    scientificCalculator: boolean;
  };
  instructions: string;
  usefulData: string | null;
  body: Group[];
}

export interface Group {
  groupName: string;
  sections: Section[];
}

export interface Section {
  sectionName: string;
  consolidateSubject: string;
  maxQuestions: number;
  questions: Question[];
}

export interface Question {
  id: string;
  qTypeName: string;
  qDataType: number[];
  markingScheme: Array<number[]>;
  question: string[];
  options: Array<string[]>;
  answer: number;
}
