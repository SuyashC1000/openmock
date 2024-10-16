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

export interface UserCacheSection {
  sectionName: string;
  sectionId: string;
  qIndex: number;
  questionDisplayList: number[];
  selected?: boolean;
  questions: UserCacheQuestion[];
  [k: string]: unknown;
}

export interface UserCacheGroup {
  groupName: string;
  groupId: string;
  status: "upcoming" | "ongoing" | "submitted" | "rejected";
  activeSectionIndex: number;
  permissions: "all" | "view" | "none";
  timeSpent: number;
  hasOpted?: boolean;
  sections: UserCacheSection[];
  [k: string]: unknown;
}

export interface UserCache {
  testId: string;
  attemptId: string;
  testStatus: "starting" | "ongoing" | "submitting" | "finished";
  timestamps: UserCacheTimestamps;
  currentLanguageIndex: number;
  activeGroupIndex: number;
  preferences: UserCachePreferences;
  userDetails: UserTestDetails;
  body: UserCacheGroup[];

  [k: string]: unknown;
}

interface UserCachePreferences {
  zoomLevel: number;
  calculator: boolean;
  sidebarCollapsed: boolean;
}

interface UserCacheTimestamps {
  testStartTime: number;
  testLoginTime: number;
}

export interface UserTestDetails {
  username: string;
  imageSrc: string;
}
