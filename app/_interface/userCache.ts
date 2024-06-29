export interface UserCacheQuestion {
  id: string;
  status: number;
  submit: number | number[] | null;
  timeSpent: number;
  lastAnswered: number | null;
  permissions: "all" | "view" | "none";
  [k: string]: unknown;
}

export interface UserCacheSection {
  sectionName: string;
  qIndex: number;
  selected?: boolean;
  questions: UserCacheQuestion[];
  [k: string]: unknown;
}

export interface UserCacheGroup {
  groupName: string;
  status: "upcoming" | "ongoing" | "submitted" | "rejected";
  activeSectionIndex: number;
  permissions: "all" | "view" | "none";
  timeSpent: number;
  hasOpted?: boolean;
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
  toolsPreferences: ToolsPreferences;
  userDetails: UserTestDetails;
  body: UserCacheGroup[];

  [k: string]: unknown;
}

interface ToolsPreferences {
  zoomLevel: number;
  calculator: boolean;
}

export interface UserTestDetails {
  name: "User";
}
