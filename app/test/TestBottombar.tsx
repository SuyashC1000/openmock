import { Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";

const TestBottombar = () => {
  return (
    <div
      className="h-16 w-screen bg-white flex flex-0 justify-between
       items-center px-4 gap-4 outline outline-2 outline-neutral-400 "
    >
      <ButtonGroup>
        <Button fontWeight={"400"} variant="outline" colorScheme="blue">
          Mark for Review & Next
        </Button>
        <Button fontWeight={"400"} variant="outline" colorScheme="blue">
          Clear Response
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button fontWeight={"400"} variant="outline" colorScheme="blue">
          Previous
        </Button>
        <Button fontWeight={"400"} variant="outline" colorScheme="blue">
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
