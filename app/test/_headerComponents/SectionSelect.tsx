import React from "react";
import SectionButton from "./SectionButton";
import { UserCacheGroup } from "@/app/_interface/userCache";
import { DispatchContext, StateContext, TestPaperContext } from "../page";
import {
  getSectionQuestionLegend,
  getTotalSectionsSelected,
} from "@/app/_formatters/getFunctions";
import {
  getActiveGroup,
  getActiveGroupCache,
} from "@/app/_formatters/getActiveCache";
import { TestPaperGroup } from "@/app/_interface/testData";
import { useToast } from "@chakra-ui/react";

function SectionSelect() {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const testPaper = React.useContext(TestPaperContext);

  const toast = useToast();

  let activeGroupCache: UserCacheGroup = getActiveGroupCache(state);
  let activeGroup: TestPaperGroup = getActiveGroup(testPaper, state);

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
            onClick={() => {
              dispatch({
                type: "update_question_lastanswered",
                payload: Date.now(),
              });
              dispatch({ type: "set_active_section", payload: i });
              if (e.questions[e.qIndex].status === 0 && e.qIndex === 0) {
                dispatch({
                  type: "update_question_status",
                  payload: { qIndex: 0, newStatus: 1 },
                });
              }
            }}
            onCheckboxSelect={() => {
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
                dispatch({ type: "toggle_section_isselected", payload: i });
              }
            }}
          />
        );
      })}
    </div>
  );
}

export default SectionSelect;
