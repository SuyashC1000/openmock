import { Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import { DispatchContext } from "./page";

const TestBottombar = () => {
  const dispatch = React.useContext(DispatchContext);

  return (
    <div
      className="h-16 w-screen bg-white flex flex-0 justify-between
       items-center px-4 gap-4 outline outline-1 outline-neutral-400 "
    >
      <ButtonGroup>
        <Button fontWeight={"400"} variant="outline" colorScheme="blue">
          Mark for Review & Next
        </Button>
        <Button fontWeight={"400"} variant="outline" colorScheme="blue">
          Clear Response
        </Button>
      </ButtonGroup>

      <Button
        onClick={() => {
          console.log("Logged");

          dispatch({ type: "set_active_question", payload: 1 });
        }}
      >
        Tester1
      </Button>
      <Button
        onClick={() => {
          console.log("Logged");

          dispatch({ type: "update_question_status", payload: 4 });
        }}
      >
        Tester2
      </Button>

      <ButtonGroup>
        <Button fontWeight={"400"} variant="outline" colorScheme="blue">
          Previous
        </Button>
        <Button
          fontWeight={"400"}
          variant="outline"
          colorScheme="blue"
          form="userAnswer"
        >
          Save & Next
        </Button>
        <Button fontWeight={"400"} colorScheme="blue" className="justify-end">
          Submit
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default TestBottombar;
