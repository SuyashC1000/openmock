"use client";

import { db } from "@/db/db";
import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import Loader from "./Loader";
import { emptyTestPaper, emptyTestResponse } from "../test/empty";
import { TestPaper } from "../_interface/testData";
import { TestResponse } from "../_interface/testResponse";
import Head from "next/head";

export const SuppliedTestPaperContext =
  React.createContext<TestPaper>(emptyTestPaper);

export const activeTestResponseContext =
  React.createContext<TestResponse>(emptyTestResponse);

const AnalysisPage = () => {
  const [suppliedTestPaper, setSuppliedTestPaper] =
    React.useState(emptyTestPaper);
  const [activeTestResponse, setActiveTestResponse] =
    React.useState(emptyTestResponse);

  const [status, setStatus] = React.useState<
    "loading" | "success" | "failure" | "empty"
  >("loading");

  React.useEffect(() => {
    const fetchData = async () => {
      const attemptResponse = await db.activeTestResponse.toArray();
      console.log(attemptResponse);
      if (attemptResponse.length === 1) {
        const paperResponse = await db.testPapers
          .where("id")
          .equals(attemptResponse[0].testId)
          .toArray();
        if (paperResponse.length === 1) {
          setActiveTestResponse(attemptResponse[0]);
          setSuppliedTestPaper(paperResponse[0]);
          setStatus("success");
        } else {
          setStatus("failure");
        }
      } else {
        setStatus("empty");
      }
    };

    fetchData();
  }, []);

  return (
    <activeTestResponseContext.Provider value={activeTestResponse}>
      <SuppliedTestPaperContext.Provider value={suppliedTestPaper}>
        <div className="h-screen w-screen flex flex-col">
          <div className="bg-slate-600 h-10 flex-0"></div>
          <div className="flex flex-1 overflow-y-auto">
            {status === "success" ? (
              <div className="flex-1 max-h-full p-2 ">
                <Card>
                  <CardBody>
                    <Heading size={"md"}>Response</Heading>
                    <Text>{JSON.stringify(activeTestResponse)}</Text>
                  </CardBody>
                  <br />
                </Card>
                <Card>
                  <CardBody>
                    <Heading size={"md"}>Paper</Heading>
                    <Text>{JSON.stringify(suppliedTestPaper)}</Text>
                  </CardBody>
                  <br />
                </Card>
              </div>
            ) : (
              <Loader status={status} />
            )}
          </div>
        </div>
      </SuppliedTestPaperContext.Provider>
    </activeTestResponseContext.Provider>
  );
};

export default AnalysisPage;
