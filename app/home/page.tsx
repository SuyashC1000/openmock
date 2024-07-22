"use client";

import { db } from "@/db/db";
import React from "react";
import { useLiveQuery } from "dexie-react-hooks";

import testData from "../../public/data/testData.json";
import { Button, Link, Text } from "@chakra-ui/react";

const HomePage = () => {
  const items = useLiveQuery(() => db.activeTestPaper.toArray());

  return (
    <div className="p-2 relative">
      <Text>Homepage</Text>
      <Button
        onClick={async () => {
          await db.activeTestPaper.add(testData);
          await db.testPapers.add(testData);
        }}
      >
        Add Test Paper
      </Button>
      <br />
      <Button onClick={async () => await db.activeTestPaper.clear()}>
        Remove Test Paper
      </Button>
      <br />
      <Link href="./test">
        <Button>Go to Test</Button>
      </Link>
    </div>
  );
};

export default HomePage;
