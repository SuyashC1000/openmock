import Numpad from "@/app/_components/Numpad";
import { TestPaperQuestion } from "@/app/_interface/testData";
import { UserCacheQuestion } from "@/app/_interface/userCache";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import React from "react";
import { TestCacheResponseDataContext, TestStateContext } from "../page";
import { getActiveQuestionCache } from "@/app/_functions/getActiveCache";

interface UserResponseInputProps {
  question: TestPaperQuestion;
  state: UserCacheQuestion;
}

const NumeralValue = (userResponseInputProps: UserResponseInputProps) => {
  const state = React.useContext(TestStateContext);

  const zoomLevel = state.preferences.zoomLevel;

  const activeQuestion = getActiveQuestionCache(state);

  const { responseData, setResponseData } = React.useContext(
    TestCacheResponseDataContext
  );

  const numInput: string =
    responseData[0] ??
    (activeQuestion.submit !== null ? activeQuestion.submit!.toString() : "");
  const setNumInput = (e: string) => {
    setResponseData([e]);
  };

  // const [cursor, setCursor] = React.useState(numInput.length);
  const [cursor, setCursor] = React.useState(numInput.length);

  function numpadInput(type: number, payload: string = "") {
    switch (type) {
      case 0:
        {
          if (
            payload === "." &&
            (numInput.includes(".") || numInput.length === 0)
          )
            break;
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
          let newInput = numInput.slice(0, cursor - 1) + numInput.slice(cursor);
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
        name="user_answer"
        value={numInput}
        onChange={(e) => {
          setCursor(cursor + (e.length - numInput.length));
        }}
        size={"md"}
      >
        <NumberInputField
          maxW={200 + zoomLevel * 50}
          fontSize={zoomLevel === 3 ? "xl" : zoomLevel === 2 ? "lg" : "base"}
        />
        <Numpad numpadInput={numpadInput} zoomLevel={zoomLevel} />
      </NumberInput>
    </div>
  );
};

export default NumeralValue;
