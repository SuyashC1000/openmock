import Marks from "@/app/_components/Marks";
import numberToWords from "@/app/_formatters/numberToWords";
import {
  Card,
  CardBody,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface MarkingSchemeProps {
  markingScheme: {
    0: [number, number];
    1: [number, number];
    2: [number, number];
    3?: [number, number][];
  };
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
    <Card
      variant={"outline"}
      borderWidth={3}
      borderRadius={"0.75rem"}
      zIndex={2}
    >
      <CardBody fontSize={"sm"}>
        <Text className="font-semibold text-lg">Question Details</Text>
        <Text> {questionTypeMessages[props.qDataType[0]]}</Text>
        <br />

        <Text>
          <strong>Correct: </strong>
          {Marks(props.markingScheme[0], "element")}{" "}
          {markingSchemeMessages.correct[props.qDataType[0]]}
        </Text>
        {props.qDataType[0] === 1 && props.markingScheme[3] !== undefined && (
          <>
            {props.markingScheme[3].map((e, i) => {
              return (
                <Text key={i}>
                  <strong>Partial:</strong> {Marks(e, "element")} if{" "}
                  {i == 0
                    ? "all"
                    : `${numberToWords(props.qDataType[1] - i).toLowerCase()} or
                    more`}{" "}
                  options are correct but ONLY{" "}
                  {numberToWords(props.qDataType[1] - 1 - i).toLowerCase()}{" "}
                  correct{" "}
                  {props.qDataType[1] - 1 - i === 1
                    ? "option is"
                    : "options are"}{" "}
                  chosen
                </Text>
              );
            })}
          </>
        )}
        {props.qDataType[0] === 1 && props.markingScheme[3] === undefined && (
          <Text>
            <strong>Partial:</strong> There is NO partial marking
          </Text>
        )}
        <Text>
          <strong>Unanswered: </strong>
          {Marks(props.markingScheme[2], "element")}{" "}
          {markingSchemeMessages.unanswered[props.qDataType[0]]}
        </Text>
        <Text>
          <strong>Incorrect: </strong>
          {Marks(props.markingScheme[1], "element")}{" "}
          {markingSchemeMessages.incorrect[props.qDataType[0]]}
        </Text>
      </CardBody>
    </Card>
  );
}

export default MarkingSchemeDisplay;
