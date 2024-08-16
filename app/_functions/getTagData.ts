import { flattenTokens } from "@chakra-ui/react";
import { TestPaper, TestPaperTag } from "../_interface/testData";
import { TestResponse } from "../_interface/testResponse";

export function getTagDataByID(
  testPaper: TestPaper,
  tagID: string
): TestPaperTag | null {
  const tag = testPaper.tags.filter((e) => e.id === tagID)[0];

  return tag ?? null;
}

export interface TagStatsData {
  title: string;
  data: {
    id: string;
    label: string;
    count: number;
    timeSpent: number;
    marks: number;
    color: string;
  }[];
}

export function getTaggedQuestionDataByID(
  testPaper: TestPaper,
  testResponse: TestResponse
): TagStatsData[] {
  const completeTagIDList = testPaper.tags.map((e) => e.id);

  const taggedQuestionDataList = testPaper.analysis.customTagStats!.map(
    (tagStatCategory) => {
      const categoryData = tagStatCategory.tags.map((tagID) => {
        const tagData = getTagDataByID(testPaper, tagID);

        let final = {
          id: tagID,
          label: tagData !== null ? tagData.label : "Unassigned",
          color: tagData !== null ? tagData.color : "#e5e5e5",
          count: 0,
          marks: 0,
          timeSpent: 0,
        };

        testPaper.body.forEach((testPaperGroup) => {
          const testResponseGroup = testResponse.body.filter(
            (e) => e.groupName === testPaperGroup.groupName
          )[0];

          if (testResponseGroup.hasOpted !== false) {
            testPaperGroup.sections.forEach((testPaperSection) => {
              const testResponseSection = testResponseGroup.sections.filter(
                (e) => e.sectionName === testPaperSection.sectionName
              )[0];

              if (testResponseSection.selected !== false) {
                testPaperSection.questions.forEach((testPaperQuestion) => {
                  const testResponseQuestion =
                    testResponseSection.questions.filter(
                      (e) => e.id === testPaperQuestion.id
                    )[0];

                  if (
                    testPaperQuestion.tags.includes(tagID) ||
                    (tagID === "" &&
                      !tagStatCategory.tags.some((e) =>
                        testPaperQuestion.tags.includes(e)
                      ))
                  ) {
                    final.count++;
                    final.timeSpent += testResponseQuestion.timeSpent;
                    final.marks += testResponseQuestion.marks;
                  }
                });
              }
            });
          }
        });

        return final;
      });

      return {
        title: tagStatCategory.title,
        data: categoryData,
      };
    }
  );

  return taggedQuestionDataList;
}
