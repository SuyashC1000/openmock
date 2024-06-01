"use client";

import { Button, ButtonGroup, Icon, Text } from "@chakra-ui/react";
import React from "react";
import TestHeader from "./TestHeader";
import TestSidebar from "./TestSidebar";
import QuestionBtn from "../components/QuestionBtn";
import TestMainWindow from "./TestMainWindow";
import TestBottombar from "./TestBottombar";

const TestPage = () => {
  return (
    <div className="bg-slate-800 flex flex-box flex-col h-screen max-h-screen">
      <TestHeader />
      <div className="h-auto flex flex-1 w-screen overflow-hidden">
        <TestMainWindow />
        <TestSidebar />
      </div>
      <TestBottombar />
    </div>
  );
};

export default TestPage;
