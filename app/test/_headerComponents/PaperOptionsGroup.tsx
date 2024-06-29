import React from "react";
import PaperOptions from "./PaperOptions";
import { StateContext, TestPaperContext } from "../page";
import useActiveElements from "@/lib/useActiveElements";
import { groupConstraint } from "@/app/_formatters/groupConstraint";

function PaperOptionsGroup() {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);

  const { activeGroup, activeSection } = useActiveElements();

  return (
    <div className="flex text-white gap-2">
      {groupConstraint(state, testPaper).canAccess && <PaperOptions type={1} />}
      <PaperOptions type={0} />
      {testPaper.usefulData !== undefined && <PaperOptions type={2} />}
      {activeGroup.instructions !== undefined && <PaperOptions type={3} />}
      {activeSection.instructions !== undefined && <PaperOptions type={4} />}
    </div>
  );
}

export default PaperOptionsGroup;
