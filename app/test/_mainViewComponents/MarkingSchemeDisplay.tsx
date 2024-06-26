import Marks from "@/app/_components/Marks";
import numberToWords from "@/app/_formatters/numberToWords";
import {
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface MarkingSchemeProps {
  markingScheme: number[][];
  qDataType: number[];
  qTypeName: string;
}

function MarkingSchemeDisplay(props: MarkingSchemeProps) {
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
            {Marks(props.markingScheme[0], "element")}{" "}
            {markingSchemeMessages.correct[props.qDataType[0]]}
          </Text>
          <Text>
            <strong>Unanswered: </strong>
            <span className="text-green-600">
              {Marks(props.markingScheme[2], "element")}{" "}
            </span>
            {markingSchemeMessages.unanswered[props.qDataType[0]]}
          </Text>
          <Text>
            <strong>Incorrect: </strong>
            <span className="text-green-600">
              {Marks(props.markingScheme[1], "element")}{" "}
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
              {Marks(props.markingScheme[0], "element")}
            </Text>
            <Text>|</Text>
            <Text>
              Incorrect answer: {Marks(props.markingScheme[1], "element")}
            </Text>
          </div>
        </PopoverTrigger>
      </PopoverAnchor>
    </Popover>
  );
}

export default MarkingSchemeDisplay;
