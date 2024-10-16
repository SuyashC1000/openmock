import React from "react";
import SectionButton from "./SectionButton";
import { UserCacheSection } from "@/app/_interface/userCache";
import {
  TestDispatchContext,
  TestStateContext,
  TestPaperContext,
} from "../page";
import {
  getSectionQuestionLegend,
  getTotalSectionsSelected,
} from "@/app/_functions/getFunctions";
import { useToast } from "@chakra-ui/react";
import useConfirm from "@/lib/useConfirm";
import {
  RESET_SECTION_ATTEMPTS,
  TOGGLE_SECTION_ISSELECTED,
} from "@/app/_functions/userCacheReducer";
import useSubmit from "@/lib/useSubmit";
import { getActiveIndex } from "@/app/_functions/getActiveCacheAdvanced";
import useActiveElements from "@/lib/useActiveElements";
import { groupConstraint } from "@/app/_functions/groupConstraint";

function SectionSelect() {
  const state = React.useContext(TestStateContext);
  const testPaper = React.useContext(TestPaperContext);
  const dispatch = React.useContext(TestDispatchContext);

  const toast = useToast();
  const { submitQuestion } = useSubmit();
  const { confirm } = useConfirm();
  const currentIndex = getActiveIndex(state);

  const { activeGroupCache, activeGroup } = useActiveElements();

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

  const groupConstraintData = groupConstraint(state, testPaper);

  return (
    <div
      className=" bg-neutral-200 flex p-1 gap-2 items-center overflow-x-auto overflow-y-hidden"
      style={{ scrollbarWidth: "thin" }}
    >
      {activeGroupCache.sections.map((e, i) => {
        return (
          <SectionButton
            key={e.sectionId}
            optional={activeGroup.sections[i].optional}
            active={i == activeGroupCache.activeSectionIndex}
            isCheckboxSelected={e.selected!}
            isCheckboxDisabled={!groupConstraintData.canEdit}
            sectionName={e.sectionName}
            questionLegend={getSectionQuestionLegend(e)}
            onClick={async () => {
              if (groupConstraintData.canAccess)
                submitQuestion([currentIndex[0], i]);
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
