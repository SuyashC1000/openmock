import { TestPaperQuestion } from "@/app/_interface/testData";
import { UserCacheQuestion } from "@/app/_interface/userCache";
import { Radio, RadioGroup } from "@chakra-ui/react";
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

const SingleCorrectChoices = (props: UserResponseInputProps) => {
  const { responseData } = React.useContext(ResponseDataContext);

  return (
    <RadioGroup name="input" value={responseData[0]}>
      <div className="flex flex-col">
        {props.question.options!.map((e, i) => {
          return (
            <Radio
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
            </Radio>
          );
        })}
      </div>
    </RadioGroup>
  );
};

export default SingleCorrectChoices;
