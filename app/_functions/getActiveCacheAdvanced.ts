import {
  UserCache,
  UserCacheGroup,
  UserCacheQuestion,
  UserCacheSection,
} from "../_interface/userCache";
import { getActiveSectionCache } from "./getActiveCache";

export function getActiveCacheByIndex(
  state: UserCache,
  indexList: number[]
): UserCacheGroup | UserCacheSection | UserCacheQuestion | UserCache {
  switch (indexList.length) {
    case 1:
      return state.body[indexList[0]] as UserCacheGroup;
    case 2:
      return state.body[indexList[0]].sections[
        indexList[1]
      ] as UserCacheSection;
    case 3:
      return state.body[indexList[0]].sections[indexList[1]].questions[
        indexList[2]
      ] as UserCacheQuestion;
    default:
      return state;
  }
}

export function getActiveIndex(state: UserCache): [number, number, number] {
  const groupIndex = state.activeGroupIndex;
  const sectionIndex = state.body[groupIndex].activeSectionIndex;
  const questionIndex = state.body[groupIndex].sections[sectionIndex].qIndex;
  return [groupIndex, sectionIndex, questionIndex];
}
