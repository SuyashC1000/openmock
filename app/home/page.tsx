"use client";

import { db } from "@/db/db";
import React from "react";
import { useLiveQuery } from "dexie-react-hooks";

import testData from "../../public/data/testData.json";
import { Button, Link, Text } from "@chakra-ui/react";
import MainView from "./MainView";

const HomePage = () => {
  const items = useLiveQuery(() => db.activeTestPaper.toArray());

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="bg-slate-600 h-10 flex-0"></div>
      <div className="flex flex-1 overflow-y-auto">
        <MainView />
      </div>
    </div>
  );
};

export default HomePage;
