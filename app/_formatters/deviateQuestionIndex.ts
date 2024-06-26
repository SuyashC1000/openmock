import {
  UserCache,
  UserCacheGroup,
  UserCacheQuestion,
  UserCacheSection,
} from "../_interface/userCache";

import {
  getActiveCacheByIndex,
  getActiveIndex,
} from "./getActiveCacheAdvanced";
import { getIsQuestionDisabled } from "./getFunctions";

export function incrementQuestionIndex(
  state: UserCache
): [number, number, number] {
  let currentIndexList: [number, number, number] = getActiveIndex(state);

  do {
    const numOfQuestions = (
      getActiveCacheByIndex(state, [
        currentIndexList[0],
        currentIndexList[1],
      ]) as UserCacheSection
    ).questions.length;

    const numOfSections = (
      getActiveCacheByIndex(state, [currentIndexList[0]]) as UserCacheGroup
    ).sections.length;

    const numOfGroups = state.body.length;

    if (currentIndexList[2] < numOfQuestions - 1) {
      currentIndexList[2] += 1;
    } else if (
      currentIndexList[2] === numOfQuestions - 1 &&
      currentIndexList[1] < numOfSections - 1
    ) {
      currentIndexList[2] = 0;
      currentIndexList[1] += 1;
    }
  } while (
    getIsQuestionDisabled(
      getActiveCacheByIndex(state, currentIndexList) as UserCacheQuestion
    )
  );

  return currentIndexList;
}

export function decrementQuestionIndex(
  state: UserCache
): [number, number, number] {
  let currentIndexList: [number, number, number] = getActiveIndex(state);

  do {
    const numOfQuestions = (
      getActiveCacheByIndex(state, [
        currentIndexList[0],
        currentIndexList[1],
      ]) as UserCacheSection
    ).questions.length;

    const numOfSections = (
      getActiveCacheByIndex(state, [currentIndexList[0]]) as UserCacheGroup
    ).sections.length;

    const lastSection = getActiveCacheByIndex(state, [
      currentIndexList[0],
      currentIndexList[1],
    ]) as UserCacheGroup;

    const numOfGroups = state.body.length;

    if (currentIndexList[2] > 0) {
      currentIndexList[2] -= 1;
    } else if (currentIndexList[2] === 0 && currentIndexList[1] > 0) {
      const lastSection = getActiveCacheByIndex(state, [
        currentIndexList[0],
        currentIndexList[1] - 1,
      ]) as UserCacheSection;

      currentIndexList[2] = lastSection.questions.length - 1;
      currentIndexList[1] -= 1;
    }
  } while (
    getIsQuestionDisabled(
      getActiveCacheByIndex(state, currentIndexList) as UserCacheQuestion
    )
  );

  return currentIndexList;
}
