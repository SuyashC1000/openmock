import Numpad from "@/app/_components/Numpad";
import { TestPaperQuestion } from "@/app/_interface/testData";
import { UserCacheQuestion } from "@/app/_interface/userCache";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import React from "react";
import { ResponseDataContext } from "../page";
import { getDefaultOptions } from "@/app/_formatters/getFunctions";

interface UserResponseInputProps {
  question: TestPaperQuestion;
  state: UserCacheQuestion;
}

const NumeralValue = (userResponseInputProps: UserResponseInputProps) => {
  const { responseData, setResponseData } =
    React.useContext(ResponseDataContext);

  console.log(responseData);

  const numInput: string = responseData[0];
  const setNumInput = (e: string) => {
    setResponseData([e]);
  };

  // const [cursor, setCursor] = React.useState(numInput.length);
  const [cursor, setCursor] = React.useState(0);

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
      >
        <NumberInputField />
        <Numpad numpadInput={numpadInput} />
      </NumberInput>
    </div>
  );
};

export default NumeralValue;
