import { UserData } from "../_interface/userData";
import { uniqueId } from "./randomGenerator";

export function userDataGenerator(
  name: string,
  profileImgSrc: string,
  version: string,
  time: number
): UserData {
  const final: UserData = {
    id: `u${uniqueId(10)}`,
    preferences: {
      author: null,
      defaultLanguage: "English",
      // showAnnouncements: true,
    },
    profile: {
      name: name,
      imageSrc: profileImgSrc,
    },
    version: version,
    timeCreated: time,
    saved: {
      testPaperFolderIds: [],
      testPaperIds: [],
      testResponseIds: [],
    },
  };
  return final;
}
