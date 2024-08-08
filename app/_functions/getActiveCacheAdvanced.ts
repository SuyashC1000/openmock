import {
  TestPaper,
  TestPaperGroup,
  TestPaperQuestion,
  TestPaperSection,
} from "../_interface/testData";
import {
  TestResponse,
  TestResponseGroup,
  TestResponseQuestion,
  TestResponseSection,
} from "../_interface/testResponse";
import {
  UserCache,
  UserCacheGroup,
  UserCacheQuestion,
  UserCacheSection,
} from "../_interface/userCache";
import { getActiveSectionCache } from "./getActiveCache";

export function getActiveCacheByIndex(
  state: UserCache,
  indexList: number[]
): UserCacheGroup | UserCacheSection | UserCacheQuestion | UserCache {
  switch (indexList.length) {
    case 1:
      return state.body[indexList[0]] as UserCacheGroup;
    case 2:
      return state.body[indexList[0]].sections[
        indexList[1]
      ] as UserCacheSection;
    case 3:
      return state.body[indexList[0]].sections[indexList[1]].questions[
        indexList[2]
      ] as UserCacheQuestion;
    default:
      return state;
  }
}

export function getActiveResponseByIndex(
  response: TestResponse,
  indexList: number[]
):
  | TestResponseGroup
  | TestResponseSection
  | TestResponseQuestion
  | TestResponse {
  switch (indexList.length) {
    case 1:
      return response.body[indexList[0]] as TestResponseGroup;
    case 2:
      return response.body[indexList[0]].sections[
        indexList[1]
      ] as TestResponseSection;
    case 3:
      return response.body[indexList[0]].sections[indexList[1]].questions[
        indexList[2]
      ] as TestResponseQuestion;
    default:
      return response;
  }
}
export function getActivePaperByIndex(
  paper: TestPaper,
  indexList: number[]
): TestPaperGroup | TestPaperSection | TestPaperQuestion | TestPaper {
  switch (indexList.length) {
    case 1:
      return paper.body[indexList[0]] as TestPaperGroup;
    case 2:
      return paper.body[indexList[0]].sections[
        indexList[1]
      ] as TestPaperSection;
    case 3:
      return paper.body[indexList[0]].sections[indexList[1]].questions[
        indexList[2]
      ] as TestPaperQuestion;
    default:
      return paper;
  }
}

export function getActiveIndex(state: UserCache): [number, number, number] {
  const groupIndex = state.activeGroupIndex;
  const sectionIndex = state.body[groupIndex].activeSectionIndex;
  const questionIndex = state.body[groupIndex].sections[sectionIndex].qIndex;
  return [groupIndex, sectionIndex, questionIndex];
}
