import { db } from "@/db/db";
import {
  Button,
  GridItem,
  Heading,
  ListItem,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import testData from "../../public/data/testData.json";

import TestCard from "./TestCard";
import Footer from "../_components/Footer";

const MainView = () => {
  const availableTests = useLiveQuery(() => db.testPapers.toArray());

  return (
    <div className="flex-1 flex flex-col p-4 h-fit min-h-full bg-neutral-100 gap-6">
      <Heading>Welcome Home!</Heading>
      <Tabs variant={"line"}>
        <TabList>
          <Tab>All</Tab>
          <Tab>Papers</Tab>
          <Tab>Attempts</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid minChildWidth={"200px"} gap={2}>
              {availableTests?.map((e, i) => (
                <GridItem key={i}>
                  <TestCard testPaper={e} />
                </GridItem>
              ))}
            </SimpleGrid>
            <br />
            <Button
              onClick={async () => {
                await db.testPapers.add(testData);
              }}
            >
              Add Test
            </Button>
          </TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default MainView;
