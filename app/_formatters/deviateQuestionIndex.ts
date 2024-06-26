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

export function incrementQuestionIndex(
  state: UserCache
): [number, number, number] {
  let currentIndexList: [number, number, number] = getActiveIndex(state);

  function checkIfCorrect() {
    const sample = getActiveCacheByIndex(
      state,
      currentIndexList
    ) as UserCacheQuestion;
    console.log(sample);

    return sample.permissions === "none";
  }

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
  } while (checkIfCorrect());

  return currentIndexList;
}

export function decrementQuestionIndex(
  state: UserCache
): [number, number, number] {
  let currentIndexList: [number, number, number] = getActiveIndex(state);

  function checkIfCorrect() {
    const sample = getActiveCacheByIndex(
      state,
      currentIndexList
    ) as UserCacheQuestion;
    console.log(sample);

    return sample.permissions === "none";
  }

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
  } while (checkIfCorrect());

  return currentIndexList;
}
