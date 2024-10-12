import {
  getQuestionsAttemptedTally,
  getTotalSectionsSelected,
} from "./getFunctions";
import { TestPaper } from "../_interface/testData";
import { UserCache } from "../_interface/userCache";
import { groupConstraint } from "./groupConstraint";

interface Final {
  canView: boolean;
  canSet: boolean;
  canTickTime: boolean;
  canSkip: boolean;
  // canClear: boolean;
  messages: string[];
}

export const questionConstraint = (
  state: UserCache,
  testPaper: TestPaper,
  indexList?: [number, number, number]
): Final => {
  const activeGroupCache = state.body[indexList?.[0] ?? state.activeGroupIndex];
  const activeSectionCache =
    activeGroupCache.sections[
      indexList?.[1] ?? activeGroupCache.activeSectionIndex
    ];
  const activeQuestionCache =
    activeSectionCache.questions[indexList?.[2] ?? activeSectionCache.qIndex];

  const activeGroup = testPaper.body[indexList?.[0] ?? state.activeGroupIndex];
  const activeSection =
    activeGroup.sections[indexList?.[1] ?? activeGroupCache.activeSectionIndex];
  const activeQuestion =
    activeSection.questions[indexList?.[2] ?? activeSectionCache.qIndex];

  let final: Final = {
    canView: true,
    canSet: true,
    canTickTime: true,
    canSkip: true,
    messages: [],
  };

  if (
    activeQuestionCache.permissions === "none" &&
    activeQuestionCache.lastAnswered !== null
  ) {
    final.canView = false;
  } else if (
    activeQuestionCache.permissions === "view" &&
    activeQuestionCache.lastAnswered !== null
  ) {
    final.canSet = false;
  }

  if (!groupConstraint(state, testPaper).canAccess) {
    (final.canSet = false),
      (final.canSkip = false),
      (final.canView = false),
      (final.canTickTime = false);
    return final;
  }

  if (activeGroupCache.status === "submitted") {
    if (activeGroupCache.permissions === "view") {
      final.canSet = false;
      final.canTickTime = false;
      final.messages.push(
        `You can no longer edit your responses in this group.`
      );
      return final;
    } else if (activeGroupCache.permissions === "none") {
      final.canTickTime = false;
      final.canSet = false;
      final.canView = false;
      return final;
    }
  }

  const maxTime = activeQuestion.constraints?.maximumTimeAllowed;
  if (maxTime !== undefined) {
    if (activeQuestionCache.timeSpent >= maxTime * 60) {
      final.canView = false;
      final.canTickTime = false;
      final.canSet = false;
      return final;
    } else {
      final.messages.push(
        `You are only allowed ${maxTime} minute${maxTime == 1 ? "" : "s"} to provide a response for this question, 
        after which it will be locked.`
      );
    }
  }

  const sectionQuestionsAttempted = getQuestionsAttemptedTally(
    "section",
    activeSectionCache
  );
  if (
    activeSection.constraints?.maxQuestionsAnswered ===
    sectionQuestionsAttempted
  ) {
    if (activeQuestionCache.submit === null) {
      final.canSet = false;
    }
    final.messages
      .push(`You have attempted the maximum number of ${sectionQuestionsAttempted} questions allowed in this section. \n
        Please clear one of your responses in order to attempt any other question.`);
  }

  const groupQuestionsAttempted = getQuestionsAttemptedTally(
    "group",
    activeGroupCache
  );
  if (
    activeGroup.constraints?.maxQuestionsAnswered === groupQuestionsAttempted
  ) {
    if (activeQuestionCache.submit === null) {
      final.canSet = false;
    }
    final.messages
      .push(`You have attempted the maximum number of ${groupQuestionsAttempted} questions allowed in this group. \n
        Please clear one of your responses in order to attempt any other question.`);
  }

  if (activeSection.optional && !activeSectionCache.selected) {
    if (
      activeGroup.constraints?.maxOptionalSectionsAnswered ===
      getTotalSectionsSelected(state)
    ) {
      final.messages.push(
        `Your responses in this section will not be evaluated unless you click on the checkbox of this section above.`
      );
    } else {
      final.messages.push(
        `Your responses in this section will not be evaluated unless you click on the checkbox of this section above.`
      );
    }
    final.canSet = false;
  }

  if (activeQuestion.constraints?.permissionOnAttempt !== "all") {
    if (activeQuestion.constraints?.permissionOnAttempt === "view") {
      if (activeQuestionCache.lastAnswered !== null) {
        final.canSet = false;
        final.canTickTime = false;
        final.messages.push(
          `You can no longer edit the response for this question.`
        );
      } else {
        final.messages.push(
          `You will not be able to edit the response for this question upon navigating. \n
          Please take care not to move to previous/next question without attempting this question.`
        );
      }
    } else if (activeQuestion.constraints?.permissionOnAttempt === "none") {
      if (activeQuestionCache.lastAnswered !== null) {
        (final.canSet = false),
          (final.canView = false),
          (final.canTickTime = false);
      } else {
        final.messages.push(
          `You will not be able to come back to this question upon navigating. \n
          Please take care not to move to previous/next question without attempting this question.`
        );
      }
    }
  }

  return final;
};
