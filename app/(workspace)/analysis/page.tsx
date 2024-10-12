"use client";

import { db } from "@/db/db";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { emptyTestPaper, emptyTestResponse } from "../../(test)/test/empty";
import { TestPaper } from "../../_interface/testData";
import { TestResponse } from "../../_interface/testResponse";
import MainView from "./MainView";
import { calculateScoreData } from "../../_functions/calculateScoreData";
import { Text } from "@chakra-ui/react";
import Loading from "../loading";
import ErrorCard from "@/app/_components/ErrorCard";
import { TbLetterL, TbMoodConfuzed } from "react-icons/tb";

export const SuppliedTestPaperContext =
  React.createContext<TestPaper>(emptyTestPaper);

export const activeTestResponseContext =
  React.createContext<TestResponse>(emptyTestResponse);

const AnalysisPage = () => {
  const [activeTestResponse, suppliedTestPaper, loaded] = useLiveQuery(
    async () => {
      const testResponse = await db.activeTestResponse.toArray();
      if (testResponse.length === 0) {
        return [undefined, undefined, true];
      } else {
        const testPaper = await db.testPapers.get(testResponse[0].testId);
        return [testResponse[0], testPaper, true];
      }
    },
    [], // deps...
    [] // default result: makes 'loaded' undefined while loading
  );

  if (!loaded) {
    return <Loading />;
  } else if (!activeTestResponse || !suppliedTestPaper) {
    return (
      <ErrorCard
        title="Nothing to analyze..."
        description="You must first select an attempt for analysis from the 
      Home page after which you will be redirected here."
        icon={TbMoodConfuzed}
        iconColor="gray.400"
      />
    );
  } else
    return (
      <activeTestResponseContext.Provider value={activeTestResponse}>
        <SuppliedTestPaperContext.Provider value={suppliedTestPaper}>
          <MainView />
        </SuppliedTestPaperContext.Provider>
      </activeTestResponseContext.Provider>
    );
};

export default AnalysisPage;
