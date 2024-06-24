import { TestPaperQuestion } from "@/app/_interface/testData";
import { UserCacheQuestion } from "@/app/_interface/userCache";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import React from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { ResponseDataContext } from "../page";

interface UserResponseInputProps {
  question: TestPaperQuestion;
  state: UserCacheQuestion;
  languageIndex: number;
}

const MultipleCorrectChoices = (props: UserResponseInputProps) => {
  const { responseData } = React.useContext(ResponseDataContext);

  return (
    <CheckboxGroup value={responseData}>
      <div className="flex flex-col">
        {props.question.options!.map((e, i) => {
          return (
            <Checkbox
              className="flex items-center"
              key={i}
              value={`${i}`}
              name="user_answer"
            >
              <Markdown
                className="p-4 font-serif"
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {props.question.options![i][props.languageIndex]}
              </Markdown>
            </Checkbox>
          );
        })}
      </div>
    </CheckboxGroup>
  );
};

export default MultipleCorrectChoices;
