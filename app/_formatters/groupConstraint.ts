import { TestPaper } from "../_interface/testData";
import { UserCache } from "../_interface/userCache";
import { getActiveGroup, getActiveGroupCache } from "./getActiveCache";
import { getQuestionsAttemptedTally } from "./getFunctions";

interface Final {
  optional: boolean;
  canAccess: boolean;
  canOpt: boolean;
  canSubmit: boolean;
  hasOpted: boolean;
  messages: string[];
}

const MIN_IN_SEC = 60;

export const groupConstraint = (
  state: UserCache,
  testPaper: TestPaper
): Final => {
  let final: Final = {
    optional: true,
    canAccess: true,
    canOpt: true,
    hasOpted: false,
    canSubmit: true,
    messages: [],
  };

  const activeGroupCache = getActiveGroupCache(state);
  const activeGroup = getActiveGroup(testPaper, state);

  final.hasOpted = activeGroupCache.hasOpted ?? false;

  if (activeGroupCache.status === "submitted") {
    final.canSubmit = false;
  }

  if (
    activeGroup.constraints?.minimumTimeAllowed !== undefined &&
    activeGroupCache.timeSpent <
      activeGroup.constraints?.minimumTimeAllowed * MIN_IN_SEC
  ) {
    final.canSubmit = false;
  }

  if (!activeGroup.optional) {
    final.optional = false;
    final.canOpt = false;
    // return final;
  } else {
    final.canAccess = activeGroupCache.hasOpted!;
  }

  const maxTime = activeGroup.constraints?.maximumTimeAllowed;
  if (
    maxTime !== undefined &&
    activeGroupCache.timeSpent >= maxTime * MIN_IN_SEC
  ) {
    final.canAccess = false;
    final.messages.push(
      `Maximum time reached to attempt current group (${maxTime} minute${maxTime == 1 ? "" : "s"})`
    );
  }

  if (
    activeGroup.constraints?.minPreviousQuestionsAnswered ||
    activeGroup.constraints?.maxPreviousGroupsAttemptTime
  ) {
    const minQuestionCounts =
      activeGroup.constraints.minPreviousQuestionsAnswered!;
    for (let i = 0; i < state.body.length - 1; i++) {
      const group = state.body[i];

      if (activeGroup.constraints?.minPreviousQuestionsAnswered) {
        const groupQuestionCount = getQuestionsAttemptedTally("group", group);
        if (
          groupQuestionCount <
          activeGroup.constraints.minPreviousQuestionsAnswered[i]
        ) {
          final.canAccess = false;
          final.canOpt = false;
          final.messages.push(
            `Minimum ${minQuestionCounts[i]} question attempts required in '${group.groupName}' (${groupQuestionCount} attempted)`
          );
        }
      }

      if (activeGroup.constraints?.maxPreviousGroupsAttemptTime) {
        const groupMaxTime =
          activeGroup.constraints.maxPreviousGroupsAttemptTime[i];
        if (groupMaxTime == 0) continue;
        if (group.timeSpent >= groupMaxTime * MIN_IN_SEC) {
          final.canAccess = false;
          final.canOpt = false;
          final.messages.push(
            `Maximum attempt time of ${groupMaxTime} minute${groupMaxTime == 1 ? "" : "s"} \n
            in '${group.groupName}' (${Math.floor(group.timeSpent / 60)} \n
            minute${Math.floor(group.timeSpent / 60) == 1 ? "" : "s"} taken)`
          );
        }
      }
    }
  }

  return final;
};
