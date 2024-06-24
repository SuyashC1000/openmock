import { Button } from "@chakra-ui/react";
import React from "react";

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

export default Numpad;
