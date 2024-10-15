import { Divider, GridItem, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import TestPaperCard from "./TestPaperCard";

import JEEMain24_27JanS2 from "../../../public/papers/JEEMain24-27JanS2.json";
import { TestPaper } from "@/app/_interface/testData";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";

const BuiltInTests = () => {
  const builtInTests = [JEEMain24_27JanS2 as unknown as TestPaper];

  const availableTests = useLiveQuery(() => db.testPapers.toArray()) ?? [];
  const availableTestsIds = availableTests.map((e) => e.id);

  const isNotEmpty = builtInTests.some(
    (e) => !availableTestsIds.includes(e.id)
  );

  return (
    <div className="my-3">
      <Heading fontWeight={"semibold"} size={"md"} my={1}>
        Built-In Papers
      </Heading>
      {isNotEmpty ? (
        <SimpleGrid
          gap={2}
          templateColumns={"repeat(auto-fill, minmax(30rem, 1fr))"}
        >
          {builtInTests.map((e, i) => {
            if (!availableTestsIds.includes(e.id))
              return (
                <GridItem key={e.id}>
                  <TestPaperCard testPaper={e} inBuilt={true} />
                </GridItem>
              );
          })}
        </SimpleGrid>
      ) : (
        <Text fontSize={"sm"} color={"gray.500"}>
          No unattempted built-in tests available
        </Text>
      )}
      <Divider mt={2} borderColor={"gray.200"} borderWidth={2} />
    </div>
  );
};

export default BuiltInTests;
