import { log } from "console";
import {
  TestPaper,
  TestPaperGroup,
  TestPaperSection,
} from "../_interface/testData";
import { TestResponse, TestResponseGroup } from "../_interface/testResponse";
import { getActiveCacheByIndex } from "./getActiveCacheAdvanced";
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

// export function calculateScoreData(
//   testPaper: TestPaper,
//   testResponse: TestResponse,
//   filters?: {
//     subjects?: string[];
//     groupNames?: string[];
//     sectionNames?: string[];
//   }
// ) {
//   function getQuestionByIndex(indexList: [number, number, number]) {
//     return testPaper.body[indexList[0]].sections[indexList[1]].questions[
//       indexList[2]
//     ];
//   }

//   function getQuestionResponseByIndex(indexList: [number, number, number]) {
//     return testResponse.body[indexList[0]].sections[indexList[1]].questions[
//       indexList[2]
//     ];
//   }

//   function getSectionByIndex(indexList: [number, number]) {
//     return testPaper.body[indexList[0]].sections[indexList[1]];
//   }
//   function getSectionResponseByIndex(indexList: [number, number]) {
//     return testResponse.body[indexList[0]].sections[indexList[1]];
//   }

//   function getSectionMaxMarksList(
//     groupAndSectionIndex: [number, number]
//   ): number[] {
//     return testPaper.body[groupAndSectionIndex[0]].sections[
//       groupAndSectionIndex[1]
//     ].questions
//       .map((e, i) => Marks(e.markingScheme[0], "number") as number)
//       .sort((a, b) => b - a);
//   }

//   let currentIndexList: [number, number, number] = [0, 0, 0];
//   let sectionMaxMarksList: number[] = getSectionMaxMarksList([
//     currentIndexList[0],
//     currentIndexList[1],
//   ]);

//   let scoreData = {
//     marks: {
//       correct: 0,
//       incorrect: 0,
//       unattempted: 0,
//       partial: 0,
//       total: 0,
//       max: 0,
//     },
//     questions: {
//       correct: 0,
//       incorrect: 0,
//       partial: 0,
//       unattempted: 0,
//       total: 0,
//     },
//   };

//   do {
//     const question = getQuestionByIndex(currentIndexList);
//     const questionResponse = getQuestionResponseByIndex(currentIndexList);
//     const section = getSectionByIndex([
//       currentIndexList[0],
//       currentIndexList[1],
//     ]);
//     const sectionResponse = getSectionResponseByIndex([
//       currentIndexList[0],
//       currentIndexList[1],
//     ]);

//     const maxNumOfSections =
//       testPaper.body[currentIndexList[0]].sections.length;
//     const maxNumOfQuestions =
//       testPaper.body[currentIndexList[0]].sections[currentIndexList[1]]
//         .questions.length;

//     const groupCondition =
//       filters?.groupNames !== undefined
//         ? filters.groupNames.includes(
//             testPaper.body[currentIndexList[0]].groupName
//           )
//         : testResponse.body[currentIndexList[0]].hasOpted !== false;

//     if (groupCondition) {
//       const sectionCondition =
//         filters?.sectionNames !== undefined
//           ? filters.sectionNames.includes(
//               testPaper.body[currentIndexList[0]].sections[currentIndexList[1]]
//                 .sectionName
//             )
//           : testResponse.body[currentIndexList[0]].sections[currentIndexList[1]]
//               .selected !== false;

//       const subjectCondition =
//         filters?.subjects !== undefined
//           ? filters.subjects.includes(
//               testPaper.body[currentIndexList[0]].sections[currentIndexList[1]]
//                 .consolidateSubject
//             )
//           : true;

//       if (currentIndexList[2] == 0) {
//         sectionMaxMarksList = getSectionMaxMarksList([
//           currentIndexList[0],
//           currentIndexList[1],
//         ]);
//       }

//       if (sectionCondition && subjectCondition) {
//         switch (questionResponse.evaluation) {
//           case Evaluation.Correct:
//             scoreData.questions.correct += 1;
//             scoreData.marks.correct += questionResponse.marks;
//             break;
//           case Evaluation.Incorrect:
//             scoreData.questions.incorrect += 1;
//             scoreData.marks.incorrect += questionResponse.marks;
//             break;
//           case Evaluation.Partial:
//             scoreData.questions.partial += 1;
//             scoreData.marks.partial += questionResponse.marks;
//             break;
//           case Evaluation.Unattempted:
//             scoreData.questions.unattempted += 1;
//             scoreData.marks.unattempted += questionResponse.marks;
//             break;
//         }
//         scoreData.marks.total += questionResponse.marks;
//         // scoreData.marks.max += Marks(
//         //   question.markingScheme[0],
//         //   "number"
//         // ) as number;

//         if (currentIndexList[2] + 1 > maxNumOfQuestions - 1) {
//           const maxQuestionAllowed =
//             section.constraints?.maxQuestionsAnswered !== undefined
//               ? section.constraints?.maxQuestionsAnswered
//               : maxNumOfQuestions;

//           const finalMaxValue = sectionMaxMarksList
//             .slice(0, maxQuestionAllowed)
//             .reduce((a, i) => a + i, 0);

//           scoreData.marks.max += finalMaxValue;
//           if (section.constraints?.maxQuestionsAnswered !== undefined) {
//             const sectionAttemptedQuestionSum =
//               sectionResponse.questions.reduce((a, i): number => {
//                 if (i.evaluation !== Evaluation.Unattempted) {
//                   return a + 1;
//                 } else return a;
//               }, 0);

//             const subtractedValue =
//               maxQuestionAllowed - sectionAttemptedQuestionSum;
//             console.log([
//               maxNumOfQuestions,
//               maxQuestionAllowed,
//               sectionAttemptedQuestionSum,
//             ]);

//             scoreData.questions.unattempted =
//               maxQuestionAllowed - sectionAttemptedQuestionSum;
//           }
//           scoreData.questions.total =
//             scoreData.questions.correct +
//             scoreData.questions.incorrect +
//             scoreData.questions.partial +
//             scoreData.questions.unattempted;
//         }
//       }
//     }
//     if (currentIndexList[2] + 1 < maxNumOfQuestions) {
//       currentIndexList[2] += 1;
//     } else if (currentIndexList[1] + 1 < maxNumOfSections) {
//       currentIndexList[1] += 1;
//       currentIndexList[2] = 0;
//     } else {
//       currentIndexList[0] += 1;
//       currentIndexList[1] = 0;
//       currentIndexList[2] = 0;
//     }
//   } while (currentIndexList[0] < testPaper.body.length);

//   return scoreData;
// }

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

            sectionScoreData.marks.max += Marks(
              testPaperQuestion.markingScheme[0]
            ) as number;
            if (questionResult.evaluation !== Evaluation.Unattempted) {
              sectionScoreData.questions.total += 1;
              sectionScoreData.marks.total += questionResult.marks;
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
          sectionScoreData.marks.max =
            sectionScoreData.marks.correct + unansweredQMaxMarksSum;

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
