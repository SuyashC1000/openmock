export interface TestPaper {
  id: string;
  name: string;
  timeCreated: number;
  authors: TestPaperAuthor[];
  maxTime: number;
  subjects: string[];
  languages: string[];
  instructions: string[];
  additionalTools: {
    calculator: "normal" | "scientific" | "none";
    magnifyingGlass: boolean;
    [k: string]: unknown;
  };
  usefulData?: string[];
  body: TestPaperGroup[];
  [k: string]: unknown;
}

export interface TestPaperQuestion {
  id: string;
  qTypeName: string;
  qDataType: number[];
  markingScheme: {
    0: [number, number];
    1: [number, number];
    2: [number, number];
    3?: [number, number][];
  };
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
  instructions?: string[];
  questions: TestPaperQuestion[];
  constraints?: TestPaperSectionConstraints;
  [k: string]: unknown;
}

export interface TestPaperGroup {
  groupName: string;
  optional: boolean;
  instructions?: string[];
  constraints?: TestPaperGroupConstraints;
  sections: TestPaperSection[];
  [k: string]: unknown;
}

export interface TestPaperAuthor {
  name: string;
  avatarUrl: string | null;
  links: [
    {
      type: AuthorLinkType;
      label: string | null;
      url: string;
    },
  ];
}

export enum AuthorLinkType {
  Email = "EMAIL",
  Phone = "PHONE",

  Youtube = "YOUTUBE",
  Twitter = "TWITTER",
  Github = "GITHUB",
  LinkedIn = "LINKEDIN",

  Other = "OTHER",
}

interface TestPaperGroupConstraints {
  permissionOnSubmit?: "all" | "view" | "none" | undefined;
  maxQuestionsAnswered?: number;
  maximumTimeAllowed?: number;
  minimumTimeAllowed?: number;
  maxOptionalSectionsAnswered?: number;
  minPreviousQuestionsAnswered?: number[];
  maxPreviousGroupsAttemptTime?: number[];
}
interface TestPaperSectionConstraints {
  maxQuestionsAnswered?: number;
  randomizeQuestions?: boolean;
}
interface TestPaperQuestionConstraints {
  optional?: boolean;
  randomizeOptions?: boolean;
  maximumTimeAllowed?: number;
  permissionOnAttempt?: "all" | "view" | "none" | undefined;
}
