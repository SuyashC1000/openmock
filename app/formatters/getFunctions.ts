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
  console.log(state);

  state.questions.forEach((e, i) => {
    tally[e.status]++;
  });
  return tally;
}

export function getActiveGroup(state: UserCache): UserCacheGroup {
  return state.body[state.activeGroupIndex];
}

export function getActiveSection(state: UserCache): UserCacheSection {
  const activeGroup = getActiveGroup(state);
  return activeGroup.sections[activeGroup.activeSectionIndex];
}

export function getActiveQuestion(state: UserCache): UserCacheQuestion {
  const activeSection = getActiveSection(state);
  return activeSection.questions[activeSection.qIndex];
}
