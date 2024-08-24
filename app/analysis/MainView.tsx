import React from "react";
import RawDataDisplay from "./RawDataDisplay";
import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { activeTestResponseContext, SuppliedTestPaperContext } from "./page";
import { calculateScoreData } from "../_functions/calculateScoreData";
import { MyResponsivePie } from "../_components/charts/PieChart";
import Summary from "./Summary";
import MarksStats from "./MarksStats";
import QuestionsStats from "./QuestionsStats";
import EvalStats from "./EvalStats";
import TimeStats from "./TimeStats";
import QuestionReview from "./QuestionReview";
import TagStats from "./TagStats";
import * as d3 from "d3";

const MainView = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const testPaper = React.useContext(SuppliedTestPaperContext);

  const formatTime = d3.utcFormat("%I:%M:%S %p, %d/%m/%G");

  const attemptDate = new Date(testResponse.timestamps.testStartTime);
  return (
    <div className="flex-1 flex flex-col p-4 h-fit min-h-full bg-neutral-100 gap-6">
      <div className="p-2">
        <Heading fontWeight={"semibold"}>{testPaper.name}</Heading>
        <Text>Attempted on: {formatTime(attemptDate)}</Text>
      </div>
      <Tabs variant={"enclosed-colored"}>
        <TabList>
          <Tab>Complete Overview</Tab>
          <Tab>Question Overview</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="flex flex-col gap-6">
              <Summary />
              <MarksStats />
              <QuestionsStats />
              <TimeStats />
              <TagStats />
              <EvalStats />
              {/* <RawDataDisplay /> */}
            </div>
          </TabPanel>
          <TabPanel>
            <QuestionReview />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default MainView;
