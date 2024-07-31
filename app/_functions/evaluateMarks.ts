import { Evaluation, QDataTypes } from "@/lib/enums";
import { TestPaperQuestion } from "../_interface/testData";
import { UserCacheQuestion } from "../_interface/userCache";
import { TestResponseQuestion } from "../_interface/testResponse";

export function evaluateMarks(
  question: TestPaperQuestion,
  questionResponse: UserCacheQuestion | TestResponseQuestion
) {
  let questionScore = {
    evaluation: Evaluation.Unattempted,
    marks: 0,
  };

  function markCorrect(marks: [number, number]) {
    questionScore.evaluation = Evaluation.Correct;
    questionScore.marks = marks[0] / marks[1];
  }
  function markIncorrect(marks: [number, number]) {
    questionScore.evaluation = Evaluation.Incorrect;
    questionScore.marks = marks[0] / marks[1];
  }
  function markPartial(marks: [number, number]) {
    questionScore.evaluation = Evaluation.Partial;
    questionScore.marks = marks[0] / marks[1];
  }

  if (questionResponse.submit !== null) {
    switch (question.qDataType[0]) {
      case QDataTypes.SingleCorrectOption: {
        if (
          (questionResponse.submit as number) === (question.answer as number)
        ) {
          markCorrect(question.markingScheme[Evaluation.Correct]);
        } else {
          markIncorrect(question.markingScheme[Evaluation.Incorrect]);
        }
        break;
      }

      case QDataTypes.MultipleCorrectOptions: {
        if (
          (questionResponse.submit as number[]).toString() ===
          (question.answer as number[]).toString()
        ) {
          markCorrect(question.markingScheme[Evaluation.Correct]);
        } else if (question.markingScheme[Evaluation.Partial] !== undefined) {
          let correctOptionsTally = 0;
          let foundIncorrect = false;

          (questionResponse.submit as number[]).forEach((e) => {
            if ((question.answer as number[]).includes(e)) {
              correctOptionsTally += 1;
            } else {
              foundIncorrect = true;
            }
          });
          if (!foundIncorrect) {
            markPartial(
              question.markingScheme[Evaluation.Partial][
                question.qDataType[1] - correctOptionsTally - 1
              ]
            );
          } else {
            markIncorrect(question.markingScheme[Evaluation.Incorrect]);
          }
        } else {
          markIncorrect(question.markingScheme[Evaluation.Incorrect]);
        }
        break;
      }

      case QDataTypes.NumericalValue: {
        if (
          (questionResponse.submit as number).toFixed(question.qDataType[1]) ===
          (question.answer as number).toFixed(question.qDataType[1])
        ) {
          markCorrect(question.markingScheme[Evaluation.Correct]);
        } else {
          markIncorrect(question.markingScheme[Evaluation.Incorrect]);
        }
        break;
      }

      default:
        break;
    }
  } else {
    questionScore.marks =
      question.markingScheme[2][0] / question.markingScheme[2][1];
  }

  return questionScore;
}
