import Marks from "@/app/_components/Marks";
import { TestPaperGroup } from "@/app/_interface/testData";
import {
  Divider,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const GroupQuestionPaper = (props: {
  group: TestPaperGroup;
  languageIndex: number;
}) => {
  return (
    <div>
      {props.group.sections.map((e, i) => {
        return (
          <div key={i} className="my-10">
            <Heading size={"md"}>{e.sectionName}</Heading>
            {e.questions.map((f, j) => {
              return (
                <>
                  <div key={j} className="my-8">
                    <div className="flex">
                      <Text className="flex-0 w-16">Q{j + 1})</Text>
                      <div>
                        <Markdown
                          className={`font-serif text-lg`}
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                        >
                          {f.question[props.languageIndex]}
                        </Markdown>
                        <Text fontSize={"sm"} m={2}>
                          Question Type: <strong>{f.qTypeName}</strong> | Marks
                          for correct answer:{" "}
                          {Marks(f.markingScheme[0], "element")} | Incorrect
                          answer: {Marks(f.markingScheme[1], "element")}
                        </Text>
                      </div>
                    </div>
                    {[0, 1].includes(f.qDataType[0]) && (
                      <OrderedList
                        listStyleType={"upper-alpha"}
                        spacing={4}
                        ml={20}
                        mt={3}
                      >
                        {f.options?.map((g, k) => {
                          return (
                            <ListItem key={k}>
                              <Markdown
                                className={`font-serif text-lg`}
                                remarkPlugins={[remarkGfm, remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                              >
                                {g[props.languageIndex]}
                              </Markdown>
                            </ListItem>
                          );
                        })}
                      </OrderedList>
                    )}
                  </div>
                  <hr className="border-none h-1 bg-neutral-100 my-2" />
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GroupQuestionPaper;
