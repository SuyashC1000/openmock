import React from "react";
import PaperOptions from "./PaperOptions";
import { TestPaperContext } from "../page";
import useActiveElements from "@/lib/useActiveElements";

function PaperOptionsGroup() {
  const testPaper = React.useContext(TestPaperContext);

  const { activeGroup, activeSection, activeGroupCache } = useActiveElements();

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
