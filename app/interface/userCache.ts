export interface UserCache {
  username: string;
  testId: string;
  testStartTime: number;
  currentLanguageIndex: number;
  body: UserCacheBody[];
}

export interface UserCacheBody {
  groupName: string;
  active: boolean;
  sections: UserCacheSection[];
}

export interface UserCacheSection {
  sectionName: string;
  maxQuestions: number;
  active: boolean;
  questions: UserCacheQuestion[];
}

export interface UserCacheQuestion {
  id: string;
  status: number;
  submit: any;
  timeSpent: number;
  lastAnswered: number | null;
}
