import { log } from "console";
import { TestPaper } from "../_interface/testData";
import { TestResponse } from "../_interface/testResponse";
import { getActiveCacheByIndex } from "./getActiveCacheAdvanced";

export function calculateScoreData(
  testPaper: TestPaper,
  testResponse: TestResponse
) {
  function getQuestionByIndex(indexList: [number, number, number]) {
    return testPaper.body[indexList[0]].sections[indexList[1]].questions[
      indexList[2]
    ];
  }

  function getQuestionResponseByIndex(indexList: [number, number, number]) {
    return testResponse.body[indexList[0]].sections[indexList[1]].questions[
      indexList[2]
    ];
  }

  let currentIndexList: [number, number, number] = [0, 0, 0];

  let scoreData = {
    marks: {
      correct: 0,
      incorrect: 0,
      unattempted: 0,
      total: 0,
      max: 0,
    },
    questions: {
      correct: 0,
      incorrect: 0,
      partial: 0,
      unattempted: 0,
      total: 0,
    },
  };

  do {
    const question = getQuestionByIndex(currentIndexList);
    const questionResponse = getQuestionResponseByIndex(currentIndexList);

    const maxNumOfSections =
      testPaper.body[currentIndexList[0]].sections.length;
    const maxNumOfQuestions =
      testPaper.body[currentIndexList[0]].sections[currentIndexList[1]]
        .questions.length;

    if (testResponse.body[currentIndexList[0]].hasOpted !== false) {
    }
    if (currentIndexList[2] + 1 < maxNumOfQuestions) {
      currentIndexList[2] += 1;
    } else if (currentIndexList[1] + 1 < maxNumOfSections) {
      currentIndexList[1] += 1;
      currentIndexList[2] = 0;
    } else {
      currentIndexList[0] += 1;
      currentIndexList[1] = 0;
      currentIndexList[2] = 0;
    }
  } while (currentIndexList[0] < testPaper.body.length);
}
