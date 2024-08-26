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

  // const [suppliedTestPaper, setSuppliedTestPaper] =
  //   React.useState(emptyTestPaper);
  // const [activeTestResponse, setActiveTestResponse] =
  //   React.useState(emptyTestResponse);

  // console.log("Here it is:", fetchedData);

  // const activeTestResponse: TestResponse = fetchedData![0];
  // const suppliedTestPaper: TestPaper = useLiveQuery(() =>
  //   db.testPapers.where("id").equals(activeTestResponse.testId).toArray()
  // )![0];

  const [status, setStatus] = React.useState<
    "loading" | "success" | "failure" | "empty"
  >("loading");

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const attemptResponse = await db.activeTestResponse.toArray();
  //     console.log(attemptResponse);
  //     if (attemptResponse.length === 1) {
  //       const paperResponse = await db.testPapers
  //         .where("id")
  //         .equals(attemptResponse[0].testId)
  //         .toArray();
  //       if (paperResponse.length === 1) {
  //         setActiveTestResponse(
  //           calculateScoreData(paperResponse[0], attemptResponse[0])
  //         );
  //         setSuppliedTestPaper(paperResponse[0]);
  //         setStatus("success");
  //       } else {
  //         setStatus("failure");
  //       }
  //     } else {
  //       setStatus("empty");
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (!loaded) return <Loading />;
  if (!activeTestResponse || !suppliedTestPaper)
    return (
      <ErrorCard
        title="Nothing to analyze..."
        description="You must first select an attempt for analysis from the 
        Home page after which you will be redirected here."
        icon={TbMoodConfuzed}
        iconColor="gray.400"
      />
    );

  return (
    <activeTestResponseContext.Provider value={activeTestResponse}>
      <SuppliedTestPaperContext.Provider value={suppliedTestPaper}>
        <MainView />
      </SuppliedTestPaperContext.Provider>
    </activeTestResponseContext.Provider>
  );
};

export default AnalysisPage;
