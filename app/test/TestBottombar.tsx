import { Button, ButtonGroup } from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  DispatchContext,
  ResponseDataContext,
  StateContext,
  TestPaperContext,
} from "./page";
import { handleSaveNext } from "../handlers/handleSubmitButton";

const TestBottombar = () => {
  const state = useContext(StateContext);
  const testPaper = useContext(TestPaperContext);
  const dispatch = useContext(DispatchContext);
  const responseDataState = useContext(ResponseDataContext);

  return (
    <div
      className="h-16 w-screen bg-white flex flex-0 justify-between
       items-center px-4 gap-4 outline outline-1 outline-neutral-400 "
    >
      <ButtonGroup>
        <Button
          fontWeight={"400"}
          variant="outline"
          colorScheme="blue"
          form="userResponseForm"
          type="submit"
        >
          Mark for Review & Next
        </Button>
        <Button
          fontWeight={"400"}
          variant="outline"
          colorScheme="blue"
          form="userResponseForm"
          type="reset"
        >
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
          form="userResponseForm"
          type="submit"
          // onClick={(e) => console.log(e.currentTarget)}
          onClick={(e) => {
            handleSaveNext(state, dispatch, testPaper, responseDataState);
          }}
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
