import React from "react";
import PaperOptions from "./PaperOptions";
import { TestStateContext, TestPaperContext } from "../page";
import useActiveElements from "@/lib/useActiveElements";
import { groupConstraint } from "@/app/_functions/groupConstraint";

function PaperOptionsGroup() {
  const state = React.useContext(TestStateContext);
  const testPaper = React.useContext(TestPaperContext);

  const { activeGroup, activeSection } = useActiveElements();

  return (
    <div className="flex text-white gap-2">
      {groupConstraint(state, testPaper).canAccess && <PaperOptions type={1} />}
      <PaperOptions type={0} />
      {testPaper.usefulData?.[state.currentLanguageIndex].length > 0 && (
        <PaperOptions type={2} />
      )}
      {activeGroup.instructions?.length !== undefined &&
        activeGroup.instructions?.length > 0 && <PaperOptions type={3} />}
      {activeSection.instructions?.length !== undefined &&
        activeSection.instructions?.length > 0 && <PaperOptions type={4} />}
    </div>
  );
}

export default PaperOptionsGroup;
