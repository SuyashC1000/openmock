import React from "react";
import ToolsButtons from "./ToolsButtons";
import GroupButton from "./GroupButton";
import { DispatchContext, StateContext } from "../page";
import { getGroupQuestionLegend } from "@/app/_formatters/getFunctions";
import { UserCacheGroup } from "@/app/_interface/userCache";
import { useToast } from "@chakra-ui/react";

function GroupSelect() {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const toast = useToast();

  function handleGroupSelect(
    e: UserCacheGroup,
    i: number,
    activeQuestionIndex: number
  ) {
    if (state.activeGroupIndex === i) return;
    if (e.status === "upcoming") {
      toast({
        status: "error",
        title: "Group not accessible yet!",
        description: `Submit the previous groups first using the 'Submit' button.`,
        position: "top",
        isClosable: true,
        variant: "subtle",
      });
    } else if (e.status === "submitted" && e.permissions === "none") {
      toast({
        status: "error",
        title: "Group is now locked!",
        description: `You can no longer revisit or edit your responses in this group.`,
        position: "top",
        isClosable: true,
        variant: "subtle",
      });
    } else {
      dispatch({ type: "set_active_group", payload: i });
      if (
        e.sections[e.activeSectionIndex].questions[activeQuestionIndex]
          .status == 0 &&
        activeQuestionIndex === 0
      ) {
        dispatch({
          type: "update_question_status",
          payload: { qIndex: 0, newStatus: 1 },
        });
      }
    }
  }

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
                handleGroupSelect(e, i, activeQuestionIndex);
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
