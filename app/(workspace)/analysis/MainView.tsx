import React from "react";
import RawDataDisplay from "./RawDataDisplay";
import {
  Button,
  ButtonGroup,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { activeTestResponseContext, SuppliedTestPaperContext } from "./page";
import { calculateScoreData } from "../../_functions/calculateScoreData";
import { MyResponsivePie } from "../../_components/charts/PieChart";
import Summary from "./Summary";
import MarksStats from "./MarksStats";
import QuestionsStats from "./QuestionsStats";
import EvalStats from "./EvalStats";
import TimeStats from "./TimeStats";
import QuestionReview from "./QuestionReview";
import TagStats from "./TagStats";
import * as d3 from "d3";
import { TbDeviceFloppy, TbReload, TbTrash } from "react-icons/tb";
import { color } from "framer-motion";
import TestPaperInfoModal from "../../_components/TestPaperInfoModal";
import Footer from "../../_components/Footer";
import { db } from "@/db/db";
import { useLiveQuery } from "dexie-react-hooks";
import useDelete from "@/lib/useDelete";
import { useRouter } from "next/navigation";

const MainView = () => {
  const testResponse = React.useContext(activeTestResponseContext);
  const testPaper = React.useContext(SuppliedTestPaperContext);

  const { deleteTestResponse } = useDelete();
  const router = useRouter();

  const hasSaved = useLiveQuery(async () => {
    const count = await db.testResponses
      .where("attemptId")
      .equals(testResponse.attemptId)
      .count();
    return count > 0;
  });

  const formatTime = d3.utcFormat("%I:%M:%S %p • %d/%m/%G");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const attemptDate = new Date(testResponse.timestamps.testStartTime);
  return (
    <div className="flex flex-col gap-6">
      <TestPaperInfoModal
        isOpen={isOpen}
        onClose={onClose}
        testPaper={testPaper}
      />
      <title>Analysis - OpenMock</title>

      <div className="flex justify-between items-center">
        <div className="p-2">
          <Heading fontWeight={"semibold"}>{testPaper.name}</Heading>
          <Text>Attempted on: {formatTime(attemptDate)}</Text>
        </div>
        <ButtonGroup>
          <Button
            leftIcon={<TbReload />}
            colorScheme="cyan"
            onClick={onOpen}
            variant={"outline"}
          >
            Reattempt
          </Button>
          {hasSaved && (
            <Button
              leftIcon={<TbTrash />}
              colorScheme="red"
              variant={"outline"}
              onClick={() =>
                deleteTestResponse(testResponse.attemptId, "/home")
              }
            >
              Delete
            </Button>
          )}
        </ButtonGroup>
      </div>
      <Tabs>
        <TabList>
          <Tab>Complete Overview</Tab>
          <Tab>Question Overview</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="flex flex-col gap-6">
              {/* <RawDataDisplay /> */}
              <Summary />
              <MarksStats />
              <QuestionsStats />
              <TimeStats />
              {testPaper.analysis.customTagStats !== undefined && <TagStats />}
              <EvalStats />
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
