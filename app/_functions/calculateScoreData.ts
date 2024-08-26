import { log } from "console";
import {
  TestPaper,
  TestPaperGroup,
  TestPaperSection,
} from "../_interface/testData";
import { TestResponse, TestResponseGroup } from "../_interface/testResponse";
import { getActiveCacheElementByIndex } from "./getActiveCacheAdvanced";
import { Evaluation } from "@/lib/enums";
import Marks from "../_components/Marks";
import { evaluateMarks } from "./evaluateMarks";

export interface ScoreData {
  marks: {
    correct: number;
    incorrect: number;
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

function addScoreData(orgScore: ScoreData, incScore: ScoreData): ScoreData {
  let newScore = orgScore;

  newScore.marks.correct += incScore.marks.correct;
  newScore.marks.incorrect += incScore.marks.incorrect;
  newScore.marks.max += incScore.marks.max;
  newScore.marks.partial += incScore.marks.partial;
  newScore.marks.total += incScore.marks.total;

  newScore.questions.correct += incScore.questions.correct;
  newScore.questions.incorrect += incScore.questions.incorrect;
  newScore.questions.partial += incScore.questions.partial;
  newScore.questions.total += incScore.questions.total;
  newScore.questions.unattempted += incScore.questions.unattempted;

  return newScore;
}

export function calculateScoreData(
  testPaper: TestPaper,
  testResponse: TestResponse
): TestResponse {
  const responseWithUpdatedSections: TestResponse = {
    ...testResponse,
    body: testResponse.body.map((testResponseGroup) => {
      const testPaperGroup: TestPaperGroup = testPaper.body.filter(
        (e) => e.groupName === testResponseGroup.groupName
      )[0];

      return {
        ...testResponseGroup,
        sections: testResponseGroup.sections.map((testResponseSection) => {
          const testPaperSection: TestPaperSection =
            testPaperGroup.sections.filter(
              (f) => f.sectionName === testResponseSection.sectionName
            )[0];

          let sectionScoreData: ScoreData = {
            marks: {
              correct: 0,
              incorrect: 0,
              max: 0,
              partial: 0,
              total: 0,
            },
            questions: {
              correct: 0,
              incorrect: 0,
              partial: 0,
              total: 0,
              unattempted: 0,
            },
          };

          let unansweredQMaxMarksList: number[] = [];

          testResponseSection.questions.map((testResponseQuestion) => {
            const testPaperQuestion = testPaperSection.questions.filter(
              (g) => g.id === testResponseQuestion.id
            )[0];

            const questionResult = evaluateMarks(
              testPaperQuestion,
              testResponseQuestion
            );

            if (questionResult.evaluation !== Evaluation.Unattempted) {
              sectionScoreData.questions.total += 1;
              sectionScoreData.marks.total += questionResult.marks;
              sectionScoreData.marks.max += Marks(
                testPaperQuestion.markingScheme[0]
              ) as number;
            }

            switch (questionResult.evaluation) {
              case Evaluation.Correct:
                sectionScoreData.questions.correct += 1;
                sectionScoreData.marks.correct += questionResult.marks;
                break;
              case Evaluation.Incorrect:
                sectionScoreData.questions.incorrect += 1;
                sectionScoreData.marks.incorrect += questionResult.marks;
                break;
              case Evaluation.Partial:
                sectionScoreData.questions.partial += 1;
                sectionScoreData.marks.partial += questionResult.marks;
                break;
              case Evaluation.Unattempted:
                unansweredQMaxMarksList.push(
                  Marks(testPaperQuestion.markingScheme[0]) as number
                );
                break;
            }
          });
          unansweredQMaxMarksList.sort((a, b) => b - a);

          const maxQLimit =
            testPaperSection.constraints?.maxQuestionsAnswered ??
            testPaperSection.questions.length;

          const unattemptedQuestionsLeft =
            maxQLimit -
            (sectionScoreData.questions.correct +
              sectionScoreData.questions.incorrect +
              sectionScoreData.questions.partial);

          const unansweredQMaxMarksSum = unansweredQMaxMarksList
            .slice(0, unattemptedQuestionsLeft)
            .reduce((a, i) => a + i, 0);

          sectionScoreData.questions.unattempted = unattemptedQuestionsLeft;

          sectionScoreData.questions.total = maxQLimit;
          sectionScoreData.marks.max += unansweredQMaxMarksSum;

          return { ...testResponseSection, scoreData: sectionScoreData };
        }),
      };
    }),
  };

  const responseWithUpdatedGroups: TestResponse = {
    ...responseWithUpdatedSections,
    body: responseWithUpdatedSections.body.map((testResponseGroup) => {
      const testPaperGroup: TestPaperGroup = testPaper.body.filter(
        (e) => e.groupName === testResponseGroup.groupName
      )[0];

      let groupScoreData: ScoreData = {
        marks: {
          correct: 0,
          incorrect: 0,
          max: 0,
          partial: 0,
          total: 0,
        },
        questions: {
          correct: 0,
          incorrect: 0,
          partial: 0,
          total: 0,
          unattempted: 0,
        },
      };

      testResponseGroup.sections.map((testResponseSection) => {
        if (testResponseSection.selected !== false) {
          groupScoreData = addScoreData(
            groupScoreData,
            testResponseSection.scoreData
          );
        }
      });

      return {
        ...testResponseGroup,
        scoreData: groupScoreData,
      };
    }),
  };

  let grandScoreData: ScoreData = {
    marks: {
      correct: 0,
      incorrect: 0,
      max: 0,
      partial: 0,
      total: 0,
    },
    questions: {
      correct: 0,
      incorrect: 0,
      partial: 0,
      total: 0,
      unattempted: 0,
    },
  };

  responseWithUpdatedGroups.body.map((testResponseGroup) => {
    if (testResponseGroup.hasOpted !== false) {
      grandScoreData = addScoreData(
        grandScoreData,
        testResponseGroup.scoreData
      );
    }
  });

  const final: TestResponse = {
    ...responseWithUpdatedGroups,
    scoreData: grandScoreData,
  };

  return final;
}
