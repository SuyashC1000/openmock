import { TestPaper, TestPaperQuestion } from "../interface/testData";
import {
  UserCache,
  UserCacheGroup,
  UserCacheQuestion,
  UserCacheSection,
} from "../interface/userCache";

export function getGroupQuestionLegend(state: UserCacheGroup): number[] {
  let tally = [0, 0, 0, 0, 0];
  state.sections.forEach((e, i) => {
    e.questions.forEach((f, j) => {
      tally[f.status]++;
    });
  });
  return tally;
}
export function getSectionQuestionLegend(state: UserCacheSection): number[] {
  let tally = [0, 0, 0, 0, 0];

  state.questions.forEach((e, i) => {
    tally[e.status]++;
  });
  return tally;
}

export function getActiveGroupCache(state: UserCache): UserCacheGroup {
  return state.body[state.activeGroupIndex];
}

export function getActiveSectionCache(state: UserCache): UserCacheSection {
  const activeGroupCache = getActiveGroupCache(state);
  return activeGroupCache.sections[activeGroupCache.activeSectionIndex];
}

export function getActiveQuestionCache(state: UserCache): UserCacheQuestion {
  const activeSectionCache = getActiveSectionCache(state);
  return activeSectionCache.questions[activeSectionCache.qIndex];
}

export function getActiveQuestion(
  testPaper: TestPaper,
  state: UserCache
): TestPaperQuestion {
  let activeGroup = testPaper.body[state.activeGroupIndex];
  let activeSection =
    activeGroup.sections[getActiveGroupCache(state).activeSectionIndex];
  return activeSection.questions[getActiveSectionCache(state).qIndex];
}
