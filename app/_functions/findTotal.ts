import { Evaluation } from "@/lib/enums";
import Marks from "../_components/Marks";
import { TestPaperGroup, TestPaperSection } from "../_interface/testData";

interface validPair {
  validMarks: number;
  validQuestions: number;
}

export function findTotalValidQuestionsAndMarks(
  type: "body" | "group" | "section",
  data: TestPaperGroup | TestPaperSection | TestPaperGroup[]
): validPair {
  function findTotalValidQuestionsAndMarksinSection(
    sectionData: TestPaperSection
  ): validPair {
    let marksArray: number[] = [];
    let questionsTally: number = 0;

    sectionData.questions.map((question) => {
      marksArray.push(
        Marks(question.markingScheme[Evaluation.Correct]) as number
      );
    });

    marksArray.sort((a, b) => b - a);

    const maxQuestions = sectionData.constraints?.maxQuestionsAnswered;

    if (
      maxQuestions !== undefined &&
      maxQuestions !== null &&
      !isNaN(maxQuestions)
    ) {
      questionsTally = maxQuestions;
      if (questionsTally !== marksArray.length)
        marksArray = marksArray.slice(0, questionsTally - marksArray.length);
    } else {
      questionsTally = marksArray.length;
    }

    const final: validPair = {
      validMarks: marksArray.reduce((a, i) => a + i, 0),
      validQuestions: questionsTally,
    };

    return final;
  }

  function findTotalValidQuestionsAndMarksinGroup(
    groupData: TestPaperGroup
  ): validPair {
    let compulsoryQuestionsTally: number = 0;
    let compulsoryMarksTally: number = 0;
    let optionalValidPairArray: validPair[] = [];

    groupData.sections.map((section) => {
      const { validMarks, validQuestions } =
        findTotalValidQuestionsAndMarksinSection(section);

      if (section.optional !== true) {
        compulsoryMarksTally += validMarks;
        compulsoryQuestionsTally += validQuestions;
      } else {
        optionalValidPairArray.push({ validMarks, validQuestions });
      }
    });

    const numOfOptionalSections =
      groupData.constraints?.maxOptionalSectionsAnswered === undefined ||
      groupData.constraints?.maxOptionalSectionsAnswered === null
        ? optionalValidPairArray.length
        : groupData.constraints!.maxOptionalSectionsAnswered;

    optionalValidPairArray = optionalValidPairArray.sort(
      (a, b) => b.validMarks - a.validMarks
    );

    if (numOfOptionalSections < optionalValidPairArray.length)
      optionalValidPairArray = optionalValidPairArray.slice(
        0,
        numOfOptionalSections - optionalValidPairArray.length
      );

    compulsoryMarksTally += optionalValidPairArray.reduce(
      (a, i) => a + i.validMarks,
      0
    );
    compulsoryQuestionsTally += optionalValidPairArray.reduce(
      (a, i) => a + i.validQuestions,
      0
    );

    const final: validPair = {
      validMarks: compulsoryMarksTally,
      validQuestions: compulsoryQuestionsTally,
    };
    return final;
  }

  function findTotalValidQuestionsAndMarksinBody(
    bodyData: TestPaperGroup[]
  ): validPair {
    let tally: validPair = {
      validMarks: 0,
      validQuestions: 0,
    };

    bodyData.map((group) => {
      const { validMarks, validQuestions } =
        findTotalValidQuestionsAndMarksinGroup(group);
      tally.validMarks += validMarks;
      tally.validQuestions += validQuestions;
    });

    return tally;
  }

  if (type === "section")
    return findTotalValidQuestionsAndMarksinSection(data as TestPaperSection);
  else if (type === "group") {
    return findTotalValidQuestionsAndMarksinGroup(data as TestPaperGroup);
  } else if (type === "body") {
    return findTotalValidQuestionsAndMarksinBody(data as TestPaperGroup[]);
  } else return { validMarks: -1, validQuestions: -1 };
}

export function findTotalOptionalSections(groupData: TestPaperGroup): number {
  let tally = 0;

  groupData.sections.map((e) => {
    if (e.optional) tally++;
  });

  return tally;
}
