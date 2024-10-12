"use client";

import { db } from "@/db/db";
import { useLiveQuery } from "dexie-react-hooks";

import {
  Button,
  Card,
  CardBody,
  GridItem,
  Heading,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import TestPaperCard from "./TestPaperCard";
import { TbCopyPlus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { confirm } from "@/app/_components/Confirmation";
import MainView from "./MainView";

const HomePage = () => {
  const [availableTests, availableDrafts, loading] = useLiveQuery(
    async () => {
      const testPapers = await db.testPapers.toArray();
      const testDrafts = await db.testDrafts.toArray();

      return [testPapers, testDrafts, true];
    },
    [],
    []
  );
  const router = useRouter();

  if (!loading) return <Loading />;
  return (
    <div>
      {/* <Tabs variant={"line"}>
        <TabList>
          <Tab>All</Tab>
          <Tab>Papers</Tab>
          <Tab>Attempts</Tab>
          <Tab>Drafts</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid gap={2}>
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
              onClick={async () => {
                await db.activeTestDraft.clear();
                router.push("/creator");
              }}
            >
              Create Test
            </Button>
          </TabPanel>
          <TabPanel></TabPanel>
          <TabPanel>
            <Button
              leftIcon={<TbCopyPlus />}
              colorScheme="red"
              onClick={async () => {
                await db.activeTestDraft.clear();
                router.push("/creator");
              }}
            >
              Create Test
            </Button>
            <br />
            {availableDrafts?.map((e, i) => (
              <Card
                size={"sm"}
                key={i}
                my={1}
                onClick={async () => {
                  await db.activeTestDraft.clear();
                  await db.activeTestDraft.add(e);
                  router.push("/creator");
                }}
              >
                <CardBody cursor={"pointer"}>
                  <Text>{e.name}</Text>
                </CardBody>
              </Card>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs> */}

      <MainView />
    </div>
  );
};

export default HomePage;
