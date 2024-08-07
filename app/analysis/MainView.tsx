import React from "react";
import RawDataDisplay from "./RawDataDisplay";
import { Heading, Text } from "@chakra-ui/react";
import { activeTestResponseContext, SuppliedTestPaperContext } from "./page";
import { calculateScoreData } from "../_functions/calculateScoreData";
import { MyResponsivePie } from "../_components/charts/PieChart";
import Summary from "./Summary";
import MarksStats from "./MarksStats";
import QuestionsStats from "./QuestionsStats";
import EvalStats from "./EvalStats";
import TimeStats from "./TimeStats";

const MainView = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const testPaper = React.useContext(SuppliedTestPaperContext);

  const attemptDate = new Date(testResponse.timestamps.testStartTime);
  return (
    <div className="flex-1 flex flex-col p-4 h-fit bg-neutral-100 gap-6">
      <div className="p-2">
        <Heading fontWeight={"semibold"}>{testPaper.name}</Heading>
        <Text>
          Attempted on:{" "}
          {attemptDate.toLocaleTimeString("en-UK", {
            timeZone: "Asia/Kolkata",
          })}
          ,{" "}
          {attemptDate.toLocaleDateString("en-UK", {
            timeZone: "Asia/Kolkata",
          })}
        </Text>
      </div>
      <Summary />
      <MarksStats />
      <QuestionsStats />
      {/* <TimeStats /> */}
      <EvalStats />
      {/* <RawDataDisplay /> */}
    </div>
  );
};

export default MainView;
