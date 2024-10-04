export interface TestPaper {
  id: string;
  name: string;
  timeCreated: number;
  version: string;
  tags: TestPaperTag[];
  authors: TestPaperAuthor[];
  maxMetrics: MaxMetrics;
  languages: string[];
  instructions: string[];
  additionalTools: {
    calculator: "normal" | "scientific" | "none";
    magnifyingGlass: boolean;
    [k: string]: unknown;
  };
  usefulData?: string[];
  body: TestPaperGroup[];
  analysis: {
    preTestMessage?: string[];
    postTestMessage?: string[];
    customEvaluation?: TestPaperCustomEvaluation;
    customTagStats?: TestPaperCustomTagStats[];
  };
  [k: string]: unknown;
}

export interface TestPaperQuestion {
  id: string;
  qTypeName: string;
  qDataType: number[];
  markingScheme: {
    0: [number, number];
    1: [number, number];
    2?: [number, number][];
  };
  question: string[];
  options: string[][] | null;
  tags: string[];
  answer: number | number[];
  solution: string[];
  constraints?: TestPaperQuestionConstraints;
  [k: string]: unknown;
}

export interface TestPaperSection {
  sectionName: string;
  sectionId: string;
  optional: boolean;
  instructions?: string[];
  questions: TestPaperQuestion[];
  constraints?: TestPaperSectionConstraints;
  [k: string]: unknown;
}

export interface TestPaperGroup {
  groupName: string;
  groupId: string;
  optional: boolean;
  instructions?: string[];
  constraints?: TestPaperGroupConstraints;
  sections: TestPaperSection[];
  [k: string]: unknown;
}

export interface TestPaperTag {
  id: string;
  label: string;
  color: string;
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
  maxQuestionsAnswered?: number | null;
  maximumTimeAllowed?: number | null;
  minimumTimeAllowed?: number | null;
  maxOptionalSectionsAnswered?: number | null;
  minPreviousQuestionsAnswered?: number[];
  maxPreviousGroupsAttemptTime?: number[];
}
interface TestPaperSectionConstraints {
  maxQuestionsAnswered?: number | null;
  randomizeQuestions?: boolean | null;
}
interface TestPaperQuestionConstraints {
  optional?: boolean;
  randomizeOptions?: boolean;
  maximumTimeAllowed?: number;
  permissionOnAttempt?: "all" | "view" | "none" | undefined;
}

interface TestPaperCustomEvaluation {
  type: "grade" | "rank" | "percentile" | "passfail";
  basis: "marks" | "percentage";
  data: [{ label: string; range: [number, number] }];
}

interface TestPaperCustomTagStats {
  title: string;
  tags: string[];
}

interface MaxMetrics {
  marks: number;
  time: number;
  questions: number;
}

export interface TestPaperFolder {
  id: string;
  name: string;
  description: string;
  testPapers: TestPaper[];
}
