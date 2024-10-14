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
      <MainView />
    </div>
  );
};

export default HomePage;
