"use client";

import { db } from "@/db/db";
import { useLiveQuery } from "dexie-react-hooks";

import testData from "../../../public/data/testData.json";
import {
  Button,
  GridItem,
  Heading,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import TestCard from "./TestCard";
import { TbCopyPlus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import Loading from "../loading";

const HomePage = () => {
  const [availableTests, loading] = useLiveQuery(
    () => db.testPapers.toArray().then((e) => [e, true]),
    [],
    []
  );
  const sample = useLiveQuery(() => db.activeTestResponse.toArray());

  console.log(sample);

  const router = useRouter();

  if (!loading) return <Loading />;
  return (
    <div>
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
          <TabPanel>
            <Button
              leftIcon={<TbCopyPlus />}
              colorScheme="red"
              onClick={() => {
                router.push("/creator");
              }}
            >
              Create Test
            </Button>
          </TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default HomePage;
