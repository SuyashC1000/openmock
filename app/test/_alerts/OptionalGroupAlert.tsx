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

const OptionalGroupAlert = () => {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(DispatchContext);

  const { activeGroup } = useActiveElements();

  interface FinalProps {
    isEligible: boolean;
    reasonMessages: string[];
  }

  function checkForGroupEligibility() {
    let final: FinalProps = {
      isEligible: true,
      reasonMessages: [],
    };

    if (activeGroup.constraints?.minPreviousQuestionsAnswered) {
      const minQuestionCounts =
        activeGroup.constraints.minPreviousQuestionsAnswered!;
      for (let i = 0; i < state.body.length - 1; i++) {
        const group = state.body[i];
        const groupQuestionCount = getQuestionsAttemptedTally("group", group);
        if (
          groupQuestionCount <
          activeGroup.constraints.minPreviousQuestionsAnswered[i]
        ) {
          final.isEligible = false;
          final.reasonMessages.push(
            `Minimum ${minQuestionCounts[i]} question attempts required in '${group.groupName}' (${groupQuestionCount} attempted)`
          );
        }
      }
    }

    return final;
  }

  const errorData: FinalProps = checkForGroupEligibility();

  return (
    <div className="w-screen h-full bg-white p-5">
      <Alert
        status={errorData.isEligible ? "info" : "error"}
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        padding={10}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle m={2} fontSize="lg">
          {errorData.isEligible
            ? "This is an optional group."
            : "You cannot attempt this group!"}
        </AlertTitle>
        <AlertDescription>
          {errorData.isEligible ? (
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
                You are not eligible to attempt this group due to failure to
                meet the following criteria:
              </Text>
              <UnorderedList className="text-left p-2">
                {errorData.reasonMessages.map((e, i) => {
                  return (
                    <ListItem key={i}>
                      <Text>{e}</Text>
                    </ListItem>
                  );
                })}
              </UnorderedList>
              <Text>
                You can decide to try to satisfy the above criteria to attempt
                this group or move on by clicking the &apos;Submit&apos; button.{" "}
              </Text>
            </>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default OptionalGroupAlert;
