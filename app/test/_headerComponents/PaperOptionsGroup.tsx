import React from "react";
import PaperOptions from "./PaperOptions";
import { StateContext, TestPaperContext } from "../page";
import {
  getActiveGroup,
  getActiveGroupCache,
  getActiveSection,
} from "@/app/_formatters/getActiveCache";

function PaperOptionsGroup() {
  const state = React.useContext(StateContext);
  const testPaper = React.useContext(TestPaperContext);

  const activeGroup = getActiveGroup(testPaper, state);
  const activeSection = getActiveSection(testPaper, state);
  const activeGroupCache = getActiveGroupCache(state);

  const condition = activeGroup.optional && !activeGroupCache.hasOpted;
  return (
    <div className="flex text-white gap-2">
      {!condition && <PaperOptions type={1} />}
      <PaperOptions type={0} />
      {testPaper.usefulData !== undefined && <PaperOptions type={2} />}
      {activeGroup.instructions !== undefined && <PaperOptions type={3} />}
      {activeSection.instructions !== undefined && <PaperOptions type={4} />}
    </div>
  );
}

export default PaperOptionsGroup;
