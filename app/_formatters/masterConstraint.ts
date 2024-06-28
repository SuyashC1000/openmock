import {
  getQuestionsAttemptedTally,
  getTotalSectionsSelected,
} from "../_formatters/getFunctions";
import {
  getActiveGroup,
  getActiveGroupCache,
  getActiveQuestion,
  getActiveQuestionCache,
  getActiveSection,
  getActiveSectionCache,
} from "./getActiveCache";
import { TestPaper } from "../_interface/testData";
import { UserCache } from "../_interface/userCache";

interface Final {
  canView: boolean;
  canSet: boolean;
  canSkip: boolean;
  // canClear: boolean;
  messages: string[];
}

export const masterConstraint = (
  state: UserCache,
  testPaper: TestPaper
): Final => {
  const activeGroupCache = getActiveGroupCache(state);
  const activeSectionCache = getActiveSectionCache(state);
  const activeQuestionCache = getActiveQuestionCache(state);

  const activeGroup = getActiveGroup(testPaper, state);
  const activeSection = getActiveSection(testPaper, state);
  const activeQuestion = getActiveQuestion(testPaper, state);

  let final: Final = {
    canView: true,
    canSet: true,
    // canClear: true,
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

  if (activeGroup.optional && activeGroupCache.hasOpted === false) {
    (final.canSet = false), (final.canSkip = false), (final.canView = false);
    return final;
  }

  if (activeGroupCache.status === "submitted") {
    if (activeGroupCache.permissions === "view") {
      final.canSet = false;
      final.messages.push(
        `You can no longer edit your responses in this group.`
      );
      return final;
    } else if (activeGroupCache.permissions === "none") {
      final.canSet = false;
      final.canView = false;
      return final;
    }
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

  if (activeQuestion.constraints?.permissionOnAttempt !== "all") {
    if (activeQuestion.constraints?.permissionOnAttempt === "view") {
      if (activeQuestionCache.lastAnswered !== null) {
        final.canSet = false;
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
        (final.canSet = false), (final.canView = false);
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
