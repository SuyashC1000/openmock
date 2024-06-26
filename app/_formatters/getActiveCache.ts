import {
  TestPaper,
  TestPaperGroup,
  TestPaperQuestion,
  TestPaperSection,
} from "../_interface/testData";
import {
  UserCache,
  UserCacheGroup,
  UserCacheQuestion,
  UserCacheSection,
} from "../_interface/userCache";

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
  let activeQuestion =
    activeSection.questions[getActiveSectionCache(state).qIndex];
  return activeQuestion;
}
export function getActiveSection(
  testPaper: TestPaper,
  state: UserCache
): TestPaperSection {
  let activeGroup = testPaper.body[state.activeGroupIndex];
  let activeSection =
    activeGroup.sections[getActiveGroupCache(state).activeSectionIndex];
  return activeSection;
}
export function getActiveGroup(
  testPaper: TestPaper,
  state: UserCache
): TestPaperGroup {
  let activeGroup = testPaper.body[state.activeGroupIndex];
  return activeGroup;
}
