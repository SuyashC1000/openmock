import React from "react";
import PaperOptions from "./PaperOptions";

function PaperOptionsGroup() {
  return (
    <div className="flex text-white gap-2">
      <PaperOptions type={0} />
      <PaperOptions type={1} />
      <PaperOptions type={2} />
    </div>
  );
}

export default PaperOptionsGroup;
