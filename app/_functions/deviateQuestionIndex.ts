import { TestPaper } from "../_interface/testData";
import {
  UserCache,
  UserCacheGroup,
  UserCacheQuestion,
  UserCacheSection,
} from "../_interface/userCache";

import {
  getActiveCacheElementByIndex,
  getActiveIndex,
} from "./getActiveCacheAdvanced";
import { questionConstraint } from "./questionConstraint";

export function incrementQuestionIndex(
  state: UserCache,
  testPaper: TestPaper
): [number, number, number] {
  let currentIndexList: [number, number, number] = getActiveIndex(state);

  do {
    const numOfQuestions = (
      getActiveCacheElementByIndex(state, [
        currentIndexList[0],
        currentIndexList[1],
      ]) as UserCacheSection
    ).questions.length;

    const numOfSections = (
      getActiveCacheElementByIndex(state, [
        currentIndexList[0],
      ]) as UserCacheGroup
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
  } while (!questionConstraint(state, testPaper, currentIndexList).canView);

  return currentIndexList;
}

export function decrementQuestionIndex(
  state: UserCache,
  testPaper: TestPaper
): [number, number, number] {
  let currentIndexList: [number, number, number] = getActiveIndex(state);

  do {
    const numOfQuestions = (
      getActiveCacheElementByIndex(state, [
        currentIndexList[0],
        currentIndexList[1],
      ]) as UserCacheSection
    ).questions.length;

    const numOfSections = (
      getActiveCacheElementByIndex(state, [
        currentIndexList[0],
      ]) as UserCacheGroup
    ).sections.length;

    const lastSection = getActiveCacheElementByIndex(state, [
      currentIndexList[0],
      currentIndexList[1],
    ]) as UserCacheGroup;

    const numOfGroups = state.body.length;

    if (currentIndexList[2] > 0) {
      currentIndexList[2] -= 1;
    } else if (currentIndexList[2] === 0 && currentIndexList[1] > 0) {
      const lastSection = getActiveCacheElementByIndex(state, [
        currentIndexList[0],
        currentIndexList[1] - 1,
      ]) as UserCacheSection;

      currentIndexList[2] = lastSection.questions.length - 1;
      currentIndexList[1] -= 1;
    }
  } while (!questionConstraint(state, testPaper).canView);

  return currentIndexList;
}
