import { Text } from "@chakra-ui/react";

import React from "react";

import { DispatchContext, StateContext, TestPaperContext } from "./page";

import HeaderDashboard from "./_headerComponents/HeaderDashboard";
import PaperOptionsGroup from "./_headerComponents/PaperOptionsGroup";

const TestHeader = () => {
  const testPaper = React.useContext(TestPaperContext);

  return (
    <div className="flex flex-col border-b-2 border-neutral-400">
      <div
        className="h-8 w-screen bg-neutral-800 flex flex-0 justify-between
      items-center px-4 gap-4 outline-1 outline-slate-600 grow-0"
      >
        <Text color={"white"}>{testPaper.name}</Text>
        <PaperOptionsGroup />
      </div>
      <HeaderDashboard />
    </div>
  );
};

export default TestHeader;
