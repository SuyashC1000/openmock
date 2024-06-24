import React from "react";
import ToolsButtons from "./ToolsButtons";
import GroupButton from "./GroupButton";
import { DispatchContext, StateContext } from "../page";
import { getGroupQuestionLegend } from "@/app/_formatters/getFunctions";

function GroupSelect() {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  return (
    <div className="h-10 bg-neutral-300 flex justify-between px-2">
      <div className=" flex gap-2 items-center overflow-x-auto overflow-y-hidden">
        {state.body.map((e, i) => {
          const activeQuestionIndex = e.sections[e.activeSectionIndex].qIndex;
          return (
            <GroupButton
              key={i}
              active={i == state.activeGroupIndex}
              optional={false}
              groupName={e.groupName}
              questionLegend={getGroupQuestionLegend(e)}
              onClick={() => {
                dispatch({ type: "set_active_group", payload: i });
                if (
                  e.sections[e.activeSectionIndex].questions[
                    activeQuestionIndex
                  ].status == 0 &&
                  activeQuestionIndex === 0
                ) {
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
      <ToolsButtons />
    </div>
  );
}
export default GroupSelect;
