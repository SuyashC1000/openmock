import React from "react";
import RawDataDisplay from "./RawDataDisplay";
import { Heading, Text } from "@chakra-ui/react";
import { activeTestResponseContext, SuppliedTestPaperContext } from "./page";
import { calculateScoreData } from "../_functions/calculateScoreData";
import { MyResponsivePie } from "../_components/charts/PieChart";
import Summary from "./Summary";

const MainView = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const testPaper = React.useContext(SuppliedTestPaperContext);

  const attemptDate = new Date(testResponse.timestamps.testStartTime);
  return (
    <div className="flex-1 max-h-full p-4 bg-neutral-50">
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
      <br />
      <Summary />
      <RawDataDisplay />
    </div>
  );
};

export default MainView;
