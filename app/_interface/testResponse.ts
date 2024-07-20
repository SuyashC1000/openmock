export interface TestResponse {
  testId: string;
  testStartTime: number;
  testLoginTime: number;
  currentLanguageIndex: number;
  activeGroupIndex: number;
  userDetails: UserTestDetails;
  body: TestResponseGroup[];

  [k: string]: unknown;
}

export interface UserCacheQuestion {
  id: string;
  status: number;
  submit: number | number[] | null;
  timeSpent: number;
  optionDisplayList: number[] | null;
  lastAnswered: number | null;
  permissions: "all" | "view" | "none";
  [k: string]: unknown;
}

export interface TestResponseSection {
  sectionName: string;
  qIndex: number;
  questionDisplayList: number[];
  selected?: boolean;
  questions: UserCacheQuestion[];
  [k: string]: unknown;
}

export interface TestResponseGroup {
  groupName: string;
  status: "upcoming" | "ongoing" | "submitted" | "rejected";
  activeSectionIndex: number;
  permissions: "all" | "view" | "none";
  timeSpent: number;
  hasOpted?: boolean;
  sections: TestResponseSection[];
  [k: string]: unknown;
}

export interface UserTestDetails {
  name: string;
}
