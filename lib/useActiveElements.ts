import {
  getActiveGroup,
  getActiveGroupCache,
  getActiveQuestion,
  getActiveQuestionCache,
  getActiveSection,
  getActiveSectionCache,
} from "@/app/_functions/getActiveCache";
import {
  TestPaperGroup,
  TestPaperQuestion,
  TestPaperSection,
} from "@/app/_interface/testData";
import {
  UserCacheGroup,
  UserCacheQuestion,
  UserCacheSection,
} from "@/app/_interface/userCache";
import {
  DispatchContext,
  StateContext,
  TestPaperContext,
} from "@/app/test/page";
import React from "react";

function useActiveElements() {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);
  // const dispatch = React.useContext(DispatchContext);

  const activeGroupCache: UserCacheGroup = getActiveGroupCache(state);
  const activeSectionCache: UserCacheSection = getActiveSectionCache(state);
  const activeQuestionCache: UserCacheQuestion = getActiveQuestionCache(state);

  const activeGroup: TestPaperGroup = getActiveGroup(testPaper, state);
  const activeSection: TestPaperSection = getActiveSection(testPaper, state);
  const activeQuestion: TestPaperQuestion = getActiveQuestion(testPaper, state);

  return {
    activeGroupCache,
    activeSectionCache,
    activeQuestionCache,
    activeGroup,
    activeSection,
    activeQuestion,
  };
}

export default useActiveElements;
