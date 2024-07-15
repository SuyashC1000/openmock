import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";
import React from "react";

import { questionConstraint } from "@/app/_formatters/questionConstraint";
import { StateContext, TestPaperContext } from "../page";

const ConstraintAlert = () => {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);

  const allMessages = questionConstraint(state, testPaper);
  const zoomLevel = state.preferences.zoomLevel;

  return (
    <span className="min-h-fit flex flex-col gap-2">
      {allMessages.messages.map((e, i) => {
        return (
          <Alert
            status="warning"
            fontSize={zoomLevel === 3 ? "lg" : zoomLevel === 2 ? "md" : "sm"}
            key={i}
          >
            <AlertIcon />
            <AlertDescription>
              <strong>Note:</strong> {e}
            </AlertDescription>
          </Alert>
        );
      })}
    </span>
  );
};

export default ConstraintAlert;
