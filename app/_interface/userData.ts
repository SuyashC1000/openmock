import { TestPaper, TestPaperAuthor } from "./testData";
import { TestResponse } from "./testResponse";

export interface UserData {
  id: string;
  profile: UserProfile;
  timeCreated: number;
  preferences: UserPreferences;
  version: string;
}

interface UserProfile {
  name: string;
  imageSrc: string;
}

interface UserPreferences {
  // displayMode: "light" | "dark" | null;
  defaultLanguage: string;
  author: TestPaperAuthor | null;
  // showAnnouncements: boolean;
}
