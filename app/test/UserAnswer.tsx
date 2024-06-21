import React from "react";
import { TestProps } from "../interface/testProps";
import {
  getActiveQuestion,
  getActiveQuestionCache,
  getActiveSectionCache,
} from "../formatters/getFunctions";
import { TestPaperQuestion } from "../interface/testData";
import { UserCacheQuestion } from "../interface/userCache";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Markdown from "react-markdown";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { log } from "console";
import { StateContext, TestPaperContext } from "./page";

interface UserAnswerInputProps {
  question: TestPaperQuestion;
  state: UserCacheQuestion;
}

const UserAnswer = () => {
  const testPaper = React.useContext(TestPaperContext);
  const state = React.useContext(StateContext);

  let activeQuestion = getActiveQuestion(testPaper, state);
  let activeQuestionCache = getActiveQuestionCache(state);

  const SingleCorrectChoices = (userAnswerInputProps: UserAnswerInputProps) => {
    return (
      <RadioGroup>
        <div className="flex flex-col">
          {userAnswerInputProps.question.options!.map((e, i) => {
            return (
              <Radio className="flex items-center" key={i} value={`${i}`}>
                <Markdown
                  className="p-4 font-serif"
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {activeQuestion.options![i][state.currentLanguageIndex]}
                </Markdown>
              </Radio>
            );
          })}
        </div>
      </RadioGroup>
    );
  };
  const MultipleCorrectChoices = (
    userAnswerInputProps: UserAnswerInputProps
  ) => {
    return (
      <CheckboxGroup>
        <div className="flex flex-col">
          {userAnswerInputProps.question.options!.map((e, i) => {
            return (
              <Checkbox className="flex items-center" key={i} value={`${i}`}>
                <Markdown
                  className="p-4 font-serif"
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {activeQuestion.options![i][state.currentLanguageIndex]}
                </Markdown>
              </Checkbox>
            );
          })}
        </div>
      </CheckboxGroup>
    );
  };

  const NumeralValue = (userAnswerInputProps: UserAnswerInputProps) => {
    const [numInput, setNumInput] = React.useState("");
    const [cursor, setCursor] = React.useState(0);

    function numpadInput(type: number, payload: string = "") {
      switch (type) {
        case 0:
          {
            if (payload === "." && numInput.includes(".")) break;
            let newInput = [
              numInput.slice(0, cursor),
              payload,
              numInput.slice(cursor),
            ].join("");
            setNumInput(newInput);
            setCursor(cursor + (newInput.length - numInput.length));
          }
          break;
        case 1:
          setNumInput("");
          break;
        case 2:
          {
            if (numInput.length == 0 || cursor == 0) break;
            let newInput =
              numInput.slice(0, cursor - 1) + numInput.slice(cursor);
            setNumInput(newInput);
            setCursor(cursor - 1);
          }
          break;
        case 3:
          {
            if (numInput.includes("-")) {
              setNumInput(numInput.slice(1));
              setCursor(cursor - 1);
            } else {
              setNumInput("-" + numInput);
              setCursor(cursor + 1);
            }
          }
          break;
        case 4:
          {
            if (payload == "left") {
              if (cursor <= 0) break;
              setCursor(cursor - 1);
            }
            if (payload == "right") {
              if (cursor >= numInput.length) break;
              setCursor(cursor + 1);
            }
          }
          break;
        default:
          break;
      }
    }

    return (
      <div>
        <NumberInput
          value={numInput}
          onChange={(e) => {
            setCursor(cursor + (e.length - numInput.length));
            setNumInput(e);
          }}
        >
          <NumberInputField />
          <Numpad numpadInput={numpadInput} />
        </NumberInput>
      </div>
    );
  };

  const Numpad = (props: { numpadInput: Function }) => {
    return (
      <div className="bg-neutral-100 m-2 p-2 w-52 flex flex-col items-center gap-1">
        <Button
          className="border border-1 border-neutral-600"
          size={"sm"}
          bgColor={"lightgrey"}
          onClick={() => props.numpadInput(2)}
        >
          Backspace
        </Button>
        <div className="grid grid-cols-3 grid-rows-4 gap-1">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((e, i) => {
            return (
              <Button
                key={i}
                className="border border-1 border-neutral-600"
                size={"sm"}
                onClick={() => props.numpadInput(0, `${e}`)}
              >
                {e}
              </Button>
            );
          })}

          <Button
            className="border border-1 border-neutral-600"
            size={"sm"}
            onClick={() => props.numpadInput(0, `.`)}
          >
            .
          </Button>
          <Button
            className="border border-1 border-neutral-600"
            size={"sm"}
            onClick={() => props.numpadInput(3)}
          >
            -
          </Button>
        </div>
        <div className="flex gap-1">
          <Button
            className="border border-1 border-neutral-600"
            size={"sm"}
            bgColor={"lightgrey"}
            onClick={() => props.numpadInput(4, "left")}
          >
            ←
          </Button>
          <Button
            className="border border-1 border-neutral-600"
            size={"sm"}
            bgColor={"lightgrey"}
            onClick={() => props.numpadInput(4, "right")}
          >
            →
          </Button>
        </div>
        <Button
          className="border border-1 border-neutral-600"
          size={"sm"}
          bgColor={"lightgrey"}
          onClick={() => props.numpadInput(1)}
        >
          Clear All
        </Button>
      </div>
    );
  };

  function userAnswerInput(type: number) {
    switch (type) {
      case 0:
        return (
          <SingleCorrectChoices
            question={activeQuestion}
            state={activeQuestionCache}
          />
        );
      case 1:
        return (
          <MultipleCorrectChoices
            question={activeQuestion}
            state={activeQuestionCache}
          />
        );
      case 2:
        return (
          <NumeralValue question={activeQuestion} state={activeQuestionCache} />
        );
      default:
        break;
    }
  }

  return (
    <form className="m-2 p-2 flex flex-col" id="userAnswer">
      {userAnswerInput(activeQuestion.qDataType[0])}
    </form>
  );
};

export default UserAnswer;
