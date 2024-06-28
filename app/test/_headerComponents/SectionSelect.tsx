import React from "react";
import SectionButton from "./SectionButton";
import {
  UserCacheGroup,
  UserCacheQuestion,
  UserCacheSection,
} from "@/app/_interface/userCache";
import { DispatchContext, StateContext, TestPaperContext } from "../page";
import {
  getSectionQuestionLegend,
  getTotalSectionsSelected,
} from "@/app/_formatters/getFunctions";
import {
  getActiveGroup,
  getActiveGroupCache,
  getActiveQuestionCache,
} from "@/app/_formatters/getActiveCache";
import { TestPaperGroup } from "@/app/_interface/testData";
import { useToast } from "@chakra-ui/react";
import useConfirm from "@/lib/useConfirm";
import {
  RESET_SECTION_ATTEMPTS,
  SET_ACTIVE_SECTION,
  TOGGLE_SECTION_ISSELECTED,
  UPDATE_QUESTION_LASTANSWERED,
  UPDATE_QUESTION_STATUS,
} from "@/app/_formatters/userCacheReducer";

function SectionSelect() {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const testPaper = React.useContext(TestPaperContext);

  const toast = useToast();

  const { confirm } = useConfirm();

  let activeGroupCache: UserCacheGroup = getActiveGroupCache(state);
  let activeQuestionCache: UserCacheQuestion = getActiveQuestionCache(state);
  let activeGroup: TestPaperGroup = getActiveGroup(testPaper, state);

  async function handleOnCheckboxSelect(e: UserCacheSection, i: number) {
    if (
      activeGroup.constraints?.maxOptionalSectionsAnswered ===
        getTotalSectionsSelected(state) &&
      !e.selected
    ) {
      toast({
        status: "error",
        title: "Maximum sections selected!",
        description: `You cannot select more than ${getTotalSectionsSelected(state)} sections at a time.`,
        position: "top",
        isClosable: true,
        variant: "subtle",
      });
    } else {
      if (e.selected) {
        const isConfirmed = await confirm(
          "Delete section responses?",
          "Deselecting the checkbox will reset ALL of your responses in that section."
        );
        if (isConfirmed) {
          dispatch({ type: RESET_SECTION_ATTEMPTS, payload: i });
        } else return;
      }
      dispatch({ type: TOGGLE_SECTION_ISSELECTED, payload: i });
    }
  }

  return (
    <div
      className=" bg-neutral-200 flex p-1 gap-2 items-center overflow-x-auto overflow-y-hidden"
      style={{ scrollbarWidth: "thin" }}
    >
      {activeGroupCache.sections.map((e, i) => {
        return (
          <SectionButton
            key={i}
            optional={activeGroup.sections[i].optional}
            active={i == activeGroupCache.activeSectionIndex}
            isSelected={e.selected!}
            isDisabled={
              activeGroupCache.permissions === "view" &&
              activeGroupCache.status === "submitted"
            }
            sectionName={e.sectionName}
            questionLegend={getSectionQuestionLegend(e)}
            onClick={async () => {
              if (
                activeQuestionCache.permissions !== "all" &&
                activeQuestionCache.lastAnswered === null
              ) {
                const sample = await confirm(
                  "Leave this question?",
                  `You will no longer be able to ${activeQuestionCache.permissions == "view" ? "edit" : "revisit or edit"} \n
                  your response in this question in the future upon navigating further.`
                );
                console.log(sample);
                if (!sample) return;
              }

              dispatch({
                type: UPDATE_QUESTION_LASTANSWERED,
                payload: Date.now(),
              });
              dispatch({ type: SET_ACTIVE_SECTION, payload: i });
              if (e.questions[e.qIndex].status === 0 && e.qIndex === 0) {
                dispatch({
                  type: UPDATE_QUESTION_STATUS,
                  payload: { qIndex: 0, newStatus: 1 },
                });
              }
            }}
            onCheckboxSelect={() => {
              handleOnCheckboxSelect(e, i);
            }}
          />
        );
      })}
    </div>
  );
}

export default SectionSelect;
