import {
  UserCache,
  UserCacheGroup,
  UserCacheQuestion,
  UserCacheSection,
} from "../_interface/userCache";
import { getActiveGroupCache, getActiveSectionCache } from "./getActiveCache";

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

export function getDefaultOptions(
  type: number,
  payload: number | number[] | null
): string[] {
  switch (type) {
    case 0: {
      if (payload === null) {
        return [];
      } else {
        return [payload.toString()];
      }
    }
    case 1: {
      if (payload === null) {
        return [];
      } else {
        return (payload as number[]).map((e) => e.toString());
      }
    }
    case 2: {
      if (payload === null) {
        return [""];
      } else {
        return [payload.toString()];
      }
    }

    default:
      return [];
  }
}

export function getUserResponse(
  qDataType: number,
  responseData: string[]
): number | number[] | null {
  const userAnswer = responseData;
  let payload;
  switch (qDataType) {
    case 0:
      {
        payload = userAnswer.length === 0 ? null : +userAnswer[0];
      }
      break;

    case 1:
      {
        payload = userAnswer.length === 0 ? null : userAnswer.map((e) => +e);
      }
      break;

    case 2:
      {
        payload = userAnswer[0].length === 0 ? null : +userAnswer;
      }
      break;
  }

  return payload!;
}

export function getQuestionsAttemptedTally(
  type: "group" | "section" | "paper",
  state: UserCache | UserCacheGroup | UserCacheSection
): number {
  let tally: number = 0;

  function totalSectionQuestionsAttempted(section: UserCacheSection): void {
    section.questions.forEach((e, i) => {
      if (e.submit !== null) tally++;
    });
  }
  if (type === "section") {
    totalSectionQuestionsAttempted(state as UserCacheSection);
    return tally;
  }

  function totalGroupQuestionsAttempted(group: UserCacheGroup): void {
    group.sections.forEach((e) => totalSectionQuestionsAttempted(e));
  }
  if (type === "group") {
    totalGroupQuestionsAttempted(state as UserCacheGroup);
    return tally;
  }

  if (type === "paper") {
    (state as UserCache).body.forEach((e) => totalGroupQuestionsAttempted(e));
  }

  return tally;
}

export function getNumOfQuestionStatuses(
  type: "group" | "section" | "paper",
  statuses: number[],
  state: UserCache | UserCacheGroup | UserCacheSection
): number {
  let tally = 0;

  function sectionQuestionStatuses(section: UserCacheSection) {
    section.questions.forEach((e, i) => {
      if (statuses.includes(e.status)) tally++;
    });
  }
  if (type === "section") {
    sectionQuestionStatuses(state as UserCacheSection);
    return tally;
  }

  function groupQuestionStatuses(group: UserCacheGroup) {
    group.sections.forEach((e, i) => {
      sectionQuestionStatuses(e);
    });
  }
  if (type === "group") {
    groupQuestionStatuses(state as UserCacheGroup);
    return tally;
  }

  if (type === "paper") {
    (state as UserCache).body.forEach((e) => groupQuestionStatuses(e));
    return tally;
  }

  return tally;
}

export function getTotalSectionsSelected(state: UserCache): number {
  let tally = 0;

  const activeGroup = getActiveGroupCache(state);
  activeGroup.sections.forEach((e) => {
    if (e.selected) {
      tally++;
    }
  });

  return tally;
}

export function getIsQuestionDisabled(
  question: UserCacheQuestion,
  permission: string = "none"
) {
  return question.permissions === permission && question.lastAnswered != null;
}
