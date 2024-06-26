import React from "react";
import SectionButton from "./SectionButton";
import { UserCacheGroup } from "@/app/_interface/userCache";
import { DispatchContext, StateContext } from "../page";
import { getSectionQuestionLegend } from "@/app/_formatters/getFunctions";
import { getActiveGroupCache } from "@/app/_formatters/getActiveCache";

function SectionSelect() {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  let activeGroup: UserCacheGroup = getActiveGroupCache(state);

  return (
    <div
      className=" bg-neutral-200 flex p-1 gap-2 items-center overflow-x-auto overflow-y-hidden"
      style={{ scrollbarWidth: "thin" }}
    >
      {activeGroup.sections.map((e, i) => {
        return (
          <SectionButton
            key={i}
            optional={e.optional}
            active={i == activeGroup.activeSectionIndex}
            sectionName={e.sectionName}
            questionLegend={getSectionQuestionLegend(e)}
            onClick={() => {
              dispatch({ type: "set_active_section", payload: i });
              if (e.questions[e.qIndex].status === 0 && e.qIndex === 0) {
                dispatch({
                  type: "update_question_status",
                  payload: { qIndex: 0, newStatus: 1 },
                });
              }
            }}
          />
        );
      })}
    </div>
  );
}

export default SectionSelect;
