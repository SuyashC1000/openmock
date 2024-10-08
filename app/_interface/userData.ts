import { TestPaper, TestPaperAuthor } from "./testData";
import { TestResponse } from "./testResponse";

export interface UserData {
  id: string;
  profile: UserProfile;
  timeCreated: number;
  saved: UserSaved;
  preferences: UserPreferences;
  version: string;
}

interface UserSaved {
  testPaperIds: string[];
  testResponseIds: string[];
  testPaperFolderIds: string[];
}

interface UserProfile {
  name: string;
  imageSrc: string;
}

interface UserPreferences {
  displayMode: "light" | "dark" | null;
  defaultLanguage: string;
  author: TestPaperAuthor | null;
  showAnnouncements: boolean;
}
