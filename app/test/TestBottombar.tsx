import { Button, ButtonGroup } from "@chakra-ui/react";
import { useContext } from "react";
import {
  DispatchContext,
  ResponseDataContext,
  StateContext,
  TestPaperContext,
} from "./page";
import {
  handleClearResponse,
  handleSubmitQuestion,
  moveToPrevQuestion,
} from "../_handlers/handleActionButton";
import {
  getActiveGroupCache,
  getActiveSectionCache,
} from "../_functions/getActiveCache";
import { questionConstraint } from "../_functions/questionConstraint";
import { SET_TEST_STATUS } from "../_functions/userCacheReducer";
import useSubmit from "@/lib/useSubmit";
import useActiveElements from "@/lib/useActiveElements";
import { groupConstraint } from "../_functions/groupConstraint";

const TestBottombar = () => {
  const state = useContext(StateContext);
  const testPaper = useContext(TestPaperContext);
  const dispatch = useContext(DispatchContext);
  const responseDataState = useContext(ResponseDataContext);

  const { submitQuestion } = useSubmit();
  const { activeGroupCache } = useActiveElements();

  return (
    <div
      className="h-16 min-h-16 w-screen bg-white flex flex-0 justify-between
       items-center px-4 gap-4 outline outline-1 outline-neutral-400 "
    >
      <ButtonGroup>
        <Button
          fontWeight={"400"}
          variant="outline"
          colorScheme="blue"
          form="userResponseForm"
          type="submit"
          isDisabled={!questionConstraint(state, testPaper).canSkip}
          onClick={(e) => {
            handleSubmitQuestion(
              state,
              testPaper,
              responseDataState,
              submitQuestion,
              true
            );
          }}
        >
          Mark for Review & Next
        </Button>
        <Button
          fontWeight={"400"}
          variant="outline"
          colorScheme="blue"
          form="userResponseForm"
          type="reset"
          isDisabled={!questionConstraint(state, testPaper).canSet}
          onClick={() => {
            handleClearResponse(state, dispatch, responseDataState);
          }}
        >
          Clear Response
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button
          fontWeight={"400"}
          variant="outline"
          colorScheme="blue"
          visibility={
            getActiveGroupCache(state).activeSectionIndex === 0 &&
            getActiveSectionCache(state).qIndex == 0
              ? "hidden"
              : "visible"
          }
          isDisabled={!questionConstraint(state, testPaper).canSkip}
          onClick={() => {
            moveToPrevQuestion(state, testPaper, submitQuestion);
          }}
        >
          Previous
        </Button>
        <Button
          fontWeight={"400"}
          colorScheme="blue"
          form="userResponseForm"
          type="submit"
          isDisabled={!questionConstraint(state, testPaper).canSkip}
          // onClick={(e) => console.log(e.currentTarget)}
          onClick={async (e) => {
            handleSubmitQuestion(
              state,
              testPaper,
              responseDataState,
              submitQuestion,
              false
            );
          }}
        >
          Save & Next
        </Button>

        <Button
          fontWeight={"400"}
          colorScheme="cyan"
          textColor={"white"}
          className="justify-end"
          onClick={() => {
            dispatch({ type: SET_TEST_STATUS, payload: "submitting" });
          }}
          isDisabled={!groupConstraint(state, testPaper).canSubmit}
        >
          Submit
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default TestBottombar;
