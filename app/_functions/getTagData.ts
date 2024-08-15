import { TestPaper, TestPaperTag } from "../_interface/testData";
import { TestResponse } from "../_interface/testResponse";

export function getTagDataByID(
  testPaper: TestPaper,
  tagID: string
): TestPaperTag {
  const tag = testPaper.tags.filter((e) => e.id === tagID)[0];

  return tag;
}

export function getTagCountbyID(
  testPaper: TestPaper,
  tagID: string,
  tagIDList: string[]
): number {
  let count = 0;

  testPaper.body.forEach((testPaperGroup) => {
    testPaperGroup.sections.forEach((testPaperSection) => {
      testPaperSection.questions.forEach((testPaperQuestion) => {
        if (
          testPaperQuestion.tags.includes(tagID) ||
          (tagID === "" &&
            !tagIDList.some((e) => testPaperQuestion.tags.includes(e)))
        ) {
          count += 1;
        }
      });
    });
  });

  return count;
}
