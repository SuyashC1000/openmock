import { log } from "console";
import { TestPaper } from "../_interface/testData";
import { TestResponse } from "../_interface/testResponse";
import { getActiveCacheByIndex } from "./getActiveCacheAdvanced";
import { Evaluation } from "@/lib/enums";
import Marks from "../_components/Marks";

export interface ScoreData {
  marks: {
    correct: number;
    incorrect: number;
    unattempted: number;
    partial: number;
    total: number;
    max: number;
  };
  questions: {
    correct: number;
    incorrect: number;
    partial: number;
    unattempted: number;
    total: number;
  };
}

export function calculateScoreData(
  testPaper: TestPaper,
  testResponse: TestResponse,
  filters?: {
    subjects?: string[];
    groupNames?: string[];
    sectionNames?: string[];
  }
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

  function getSectionByIndex(indexList: [number, number]) {
    return testPaper.body[indexList[0]].sections[indexList[1]];
  }
  function getSectionResponseByIndex(indexList: [number, number]) {
    return testResponse.body[indexList[0]].sections[indexList[1]];
  }

  function getSectionMaxMarksList(
    groupAndSectionIndex: [number, number]
  ): number[] {
    return testPaper.body[groupAndSectionIndex[0]].sections[
      groupAndSectionIndex[1]
    ].questions
      .map((e, i) => Marks(e.markingScheme[0], "number") as number)
      .sort((a, b) => b - a);
  }

  let currentIndexList: [number, number, number] = [0, 0, 0];
  let sectionMaxMarksList: number[] = getSectionMaxMarksList([
    currentIndexList[0],
    currentIndexList[1],
  ]);

  let scoreData = {
    marks: {
      correct: 0,
      incorrect: 0,
      unattempted: 0,
      partial: 0,
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
    const section = getSectionByIndex([
      currentIndexList[0],
      currentIndexList[1],
    ]);
    const sectionResponse = getSectionResponseByIndex([
      currentIndexList[0],
      currentIndexList[1],
    ]);

    const maxNumOfSections =
      testPaper.body[currentIndexList[0]].sections.length;
    const maxNumOfQuestions =
      testPaper.body[currentIndexList[0]].sections[currentIndexList[1]]
        .questions.length;

    const groupCondition =
      filters?.groupNames !== undefined
        ? filters.groupNames.includes(
            testPaper.body[currentIndexList[0]].groupName
          )
        : testResponse.body[currentIndexList[0]].hasOpted !== false;

    if (groupCondition) {
      const sectionCondition =
        filters?.sectionNames !== undefined
          ? filters.sectionNames.includes(
              testPaper.body[currentIndexList[0]].sections[currentIndexList[1]]
                .sectionName
            )
          : testResponse.body[currentIndexList[0]].sections[currentIndexList[1]]
              .selected !== false;

      const subjectCondition =
        filters?.subjects !== undefined
          ? filters.subjects.includes(
              testPaper.body[currentIndexList[0]].sections[currentIndexList[1]]
                .consolidateSubject
            )
          : true;

      if (currentIndexList[2] == 0) {
        sectionMaxMarksList = getSectionMaxMarksList([
          currentIndexList[0],
          currentIndexList[1],
        ]);
      }

      if (sectionCondition && subjectCondition) {
        switch (questionResponse.evaluation) {
          case Evaluation.Correct:
            scoreData.questions.correct += 1;
            scoreData.marks.correct += questionResponse.marks;
            break;
          case Evaluation.Incorrect:
            scoreData.questions.incorrect += 1;
            scoreData.marks.incorrect += questionResponse.marks;
            break;
          case Evaluation.Partial:
            scoreData.questions.partial += 1;
            scoreData.marks.partial += questionResponse.marks;
            break;
          case Evaluation.Unattempted:
            scoreData.questions.unattempted += 1;
            scoreData.marks.unattempted += questionResponse.marks;
            break;
        }
        scoreData.marks.total += questionResponse.marks;
        // scoreData.marks.max += Marks(
        //   question.markingScheme[0],
        //   "number"
        // ) as number;

        if (currentIndexList[2] + 1 > maxNumOfQuestions - 1) {
          const maxQuestionAllowed =
            section.constraints?.maxQuestionsAnswered !== undefined
              ? section.constraints?.maxQuestionsAnswered
              : maxNumOfQuestions;

          const finalMaxValue = sectionMaxMarksList
            .slice(0, maxQuestionAllowed)
            .reduce((a, i) => a + i, 0);

          scoreData.marks.max += finalMaxValue;
          if (section.constraints?.maxQuestionsAnswered !== undefined) {
            const sectionAttemptedQuestionSum =
              sectionResponse.questions.reduce((a, i): number => {
                if (i.evaluation !== Evaluation.Unattempted) {
                  return a + 1;
                } else return a;
              }, 0);

            const subtractedValue =
              maxQuestionAllowed - sectionAttemptedQuestionSum;
            console.log([
              maxNumOfQuestions,
              maxQuestionAllowed,
              sectionAttemptedQuestionSum,
            ]);

            scoreData.questions.unattempted =
              maxQuestionAllowed - sectionAttemptedQuestionSum;
          }
          scoreData.questions.total =
            scoreData.questions.correct +
            scoreData.questions.incorrect +
            scoreData.questions.partial +
            scoreData.questions.unattempted;
        }
      }
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

  return scoreData;
}
