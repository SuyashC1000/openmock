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
import numberToWords from "../formatters/numberToWords";

interface Props {
  markingScheme: [[number, number], [number, number], [number, number], ...[]];
  qDataType: [number, number];
  qTypeName: string;
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

    const questionTypeMessages = [
      `This question has ${numberToWords(
        props.qDataType[1]
      ).toUpperCase()} options. ONLY ONE of these ${numberToWords(
        props.qDataType[1]
      ).toLowerCase()} options is the correct answer.`,
      `This question has ${numberToWords(
        props.qDataType[1]
      ).toUpperCase()} options. ONE OR MORE THAN ONE of these ${numberToWords(
        props.qDataType[1]
      ).toLowerCase()} option(s) is/are the correct answer(s).`,
      `The answer to the question is a${
        props.qDataType[1] == 0 ? "n integer" : " numerical value"
      }. If the numerical value has ${
        props.qDataType[1] == 0
          ? ""
          : "more than " + numberToWords(props.qDataType[1]).toLowerCase()
      } decimal place${
        props.qDataType[1] != 1 ? "s" : ""
      }, round off the value to ${
        props.qDataType[1] == 0
          ? "the nearest integer"
          : numberToWords(props.qDataType[1]).toUpperCase() +
            " decimal place" +
            (props.qDataType[1] != 1 ? "s" : "")
      }.`,
    ];

    return (
      <Popover placement="bottom-end" trigger="hover" openDelay={400}>
        <PopoverContent>
          <PopoverBody className="text-sm">
            <Text className="font-semibold text-base">Question Details</Text>
            <Text> {questionTypeMessages[props.qDataType[0]]}</Text>
            <br />

            <Text>
              <strong>Correct: </strong>
              {marks(props.markingScheme[0], "element")}{" "}
              {markingSchemeMessages.correct[props.qDataType[0]]}
            </Text>
            <Text>
              <strong>Unanswered: </strong>
              <span className="text-green-600">
                {marks(props.markingScheme[2], "element")}{" "}
              </span>
              {markingSchemeMessages.unanswered[props.qDataType[0]]}
            </Text>
            <Text>
              <strong>Incorrect: </strong>
              <span className="text-green-600">
                {marks(props.markingScheme[1], "element")}{" "}
              </span>
              {markingSchemeMessages.incorrect[props.qDataType[0]]}
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
          qDataType={[2, 1]}
          qTypeName="MSQ"
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
