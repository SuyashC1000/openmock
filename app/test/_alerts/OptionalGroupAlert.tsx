import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";

import { DispatchContext, StateContext, TestPaperContext } from "../page";
import { SET_GROUP_HASOPTED } from "@/app/_formatters/userCacheReducer";
import { getQuestionsAttemptedTally } from "@/app/_formatters/getFunctions";
import useActiveElements from "@/lib/useActiveElements";
import { groupConstraint } from "@/app/_formatters/groupConstraint";

const OptionalGroupAlert = () => {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(DispatchContext);

  const errorData = groupConstraint(state, testPaper);

  const zoomLevel = state.preferences.zoomLevel;

  return (
    <div className="w-screen h-full bg-white p-5">
      <Alert
        status={errorData.canOpt ? "info" : "error"}
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        padding={10}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle
          m={2}
          fontSize={
            zoomLevel === 3 ? "xx-large" : zoomLevel === 2 ? "x-large" : "lg"
          }
        >
          {errorData.canOpt
            ? "This is an optional group."
            : "You cannot attempt this group!"}
        </AlertTitle>
        <AlertDescription
          fontSize={
            zoomLevel === 3 ? "x-large" : zoomLevel === 2 ? "lg" : "base"
          }
        >
          {errorData.canOpt ? (
            <>
              <Text>
                You can decide to attempt this group by clicking on the button
                below or skip this group by clicking the &apos;Submit&apos;
                button.
              </Text>
              <UnorderedList className="text-left p-2">
                <ListItem>
                  <Text>
                    If you skip this group, it will be excluded in the
                    evaluation and your overall score will not be affected.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    Once you decide to attempt this group, there will no way to
                    revert it. You will need to attempt all the required
                    questions.
                  </Text>
                </ListItem>
              </UnorderedList>
              <Button
                onClick={() => {
                  dispatch({ type: SET_GROUP_HASOPTED, payload: true });
                }}
              >
                Attempt Group
              </Button>
            </>
          ) : (
            <>
              <Text>
                You are not eligible to attempt this group due to the following
                reasons:
              </Text>
              <UnorderedList className="text-left p-2">
                {errorData.messages.map((e, i) => {
                  return (
                    <ListItem key={i}>
                      <Text>{e}</Text>
                    </ListItem>
                  );
                })}
              </UnorderedList>
              <Text>
                Please click the &apos;Submit&apos; button to move forward.
              </Text>
            </>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default OptionalGroupAlert;
