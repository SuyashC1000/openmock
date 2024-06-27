import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";
import { StateContext, TestPaperContext } from "./page";
import { getQuestionsAttemptedTally } from "../_formatters/getFunctions";
import {
  getActiveGroup,
  getActiveGroupCache,
  getActiveQuestion,
  getActiveQuestionCache,
  getActiveSection,
  getActiveSectionCache,
} from "../_formatters/getActiveCache";
import { masterConstraint } from "../_formatters/masterConstraint";

const ConstraintAlert = () => {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);

  const allMessages = masterConstraint(state, testPaper);

  const zoomLevel = state.toolsPreferences.zoomLevel;

  return (
    <>
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
    </>
  );
};

export default ConstraintAlert;
