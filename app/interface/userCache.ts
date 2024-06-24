export interface UserCacheQuestion {
  id: string;
  status: number;
  submit: number | number[] | null;
  timeSpent: number;
  lastAnswered: number | null;
  [k: string]: unknown;
}

export interface UserCacheSection {
  sectionName: string;
  qIndex: number;
  maxQuestions: number;
  optional: boolean;
  questions: UserCacheQuestion[];
  [k: string]: unknown;
}

export interface UserCacheGroup {
  groupName: string;
  activeSectionIndex: number;
  sections: UserCacheSection[];
  [k: string]: unknown;
}

export interface UserCache {
  username: string;
  testId: string;
  testStatus: "starting" | "ongoing" | "submitting" | "finished";
  testStartTime: number;
  testLoginTime: number;
  currentLanguageIndex: number;
  activeGroupIndex: number;
  body: UserCacheGroup[];

  [k: string]: unknown;
}
