"use client";

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import sampleRaw from "./sample.md";
import "katex/dist/katex.min.css";
import {
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import QuestionLegend from "../components/QuestionLegend";
import marks from "../formatters/marks";

interface Props {
  markingScheme: [[number, number], [number, number], [number, number], ...[]];
  qDataType: [number, number];
}

const QuestionView = () => {
  const [markdown, setMarkdown] = React.useState(`
  # Hello
  this is a *question* with **formatting**

  $$1 + 1 = 2$$
  `);

  // React.useEffect(() => {
  //   fetch(sampleRaw)
  //     .then((e) => e.text())
  //     .then((text) => setMarkdown(text));
  // }, []);

  function MarkingSchemeDisplay(props: Props) {
    const markingSchemeMessages = {
      correct: [
        "ONLY if the correct option is chosen",
        "ONLY if all the correct option(s) is/are chosen",
        "ONLY if the correct numerical value is entered",
      ],
      unanswered: [
        "if no option is chosen",
        "if no option is chosen",
        "if no numerical value is entered",
      ],
      incorrect: [
        "in all other cases",
        "in all other cases",
        "in all other cases",
      ],
    };

    return (
      <Popover placement="bottom-end" trigger="hover" openDelay={400}>
        <PopoverContent>
          <PopoverHeader>Marking Scheme</PopoverHeader>
          <PopoverBody className="text-sm">
            <Text>
              <strong>Correct: </strong>
              <span className="text-green-600">
                {marks(props.markingScheme[0])}
              </span>{" "}
              if ONLY the correct option(s) is/are chosen
            </Text>
          </PopoverBody>
        </PopoverContent>

        <PopoverAnchor>
          <PopoverTrigger>
            <div className="text-xs flex gap-2">
              <Text>
                Marks for correct answer:{" "}
                {marks(props.markingScheme[0], "element")}
              </Text>
              <Text>|</Text>
              <Text>
                Incorrect answer: {marks(props.markingScheme[1], "element")}
              </Text>
            </div>
          </PopoverTrigger>
        </PopoverAnchor>
      </Popover>
    );
  }

  function QuestionInfoHeader() {
    return (
      <div className=" outline outline-1 outline-neutral-400 p-1 px-2 flex justify-between">
        <Text className="text-sm font-semibold">Question Type: MCQ</Text>
        <MarkingSchemeDisplay
          markingScheme={[
            [4, 1],
            [-1, 1],
            [0, 1],
          ]}
          qDataType={[0, 0]}
        />
      </div>
    );
  }

  function UserAnswer() {
    return <div>hi</div>;
  }

  return (
    <div className="flex flex-col">
      <QuestionInfoHeader />
      <Text className="font-semibold p-1">Question No. 1</Text>
      <Markdown
        className="p-4 font-serif"
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {markdown}
      </Markdown>
      <UserAnswer />
    </div>
  );
};

export default QuestionView;
