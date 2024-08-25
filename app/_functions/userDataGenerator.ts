import { UserData } from "../_interface/userData";
import { uniqueId } from "./randomGenerator";

export function userDataGenerator(
  username: string,
  profileImgSrc: string,
  version: string,
  time: number
): UserData {
  const final: UserData = {
    id: `u${uniqueId(10)}`,
    preferences: {
      author: null,
      alwaysSaveResponses: false,
      displayMode: null,
    },
    profile: {
      username: username,
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
